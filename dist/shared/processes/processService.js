"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessService = void 0;
var child_process_1 = require("child_process");
var ProcessService = /** @class */ (function () {
    function ProcessService() {
    }
    ProcessService.killProcessOnPort = function (port, cb) {
        var killCommand = process.platform === 'win32' ? "netstat -ano | findstr :".concat(port, " | findstr LISTENING") : "lsof -i:".concat(port, " -t");
        (0, child_process_1.exec)(killCommand, function (error, stdout, stderr) {
            if (error) {
                // console.error(`Failed to execute the command: ${error.message}`);
                return cb ? cb() : '';
            }
            if (stderr) {
                // console.error(`Command execution returned an error: ${stderr}`);
                return cb ? cb() : '';
            }
            var processId = stdout.trim();
            if (processId) {
                var killProcessCommand = process.platform === 'win32' ? "taskkill /F /PID ".concat(processId) : "kill ".concat(processId);
                (0, child_process_1.exec)(killProcessCommand, function (error, _stdout, _stderr) {
                    if (error) {
                        // console.error(`Failed to kill the process: ${error.message}`);
                        return cb ? cb() : '';
                    }
                    // console.log(`Process running on port ${port} has been killed.`);
                    return cb ? cb() : '';
                });
            }
            else {
                // console.log(`No process found running on port ${port}.`);
                return cb ? cb() : '';
            }
        });
    };
    return ProcessService;
}());
exports.ProcessService = ProcessService;
