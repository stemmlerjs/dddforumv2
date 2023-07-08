import express from "express";
import { Server } from "http";
import { ProcessService } from "../processes/processService";
import { UserController } from "../../modules/users/userController";
const cors = require("cors");

type WebServerConfig = {
  port: number;
};

export class WebServer {
  private express: express.Express;
  private server: Server | undefined;
  private started: boolean = false;

  constructor(private config: WebServerConfig, controller: UserController) {
    this.express = this.createExpress();
    this.configureExpress();
    this.setupRoutes(controller);
  }

  private createExpress() {
    return express();
  }

  private configureExpress() {
    this.express.use(cors());
    this.express.use(express.json());
  }

  private setupRoutes(controller: UserController) {
    // Get a user by email
    this.express.get("/users", (req, res) =>
      controller.getUserByEmailController(req, res)
    );

    // Edit a user
    this.express.post("/users/edit/:userId", (req, res) =>
      controller.editUserByIdController(req, res)
    );

    // Create a new user
    this.express.post("/users/new", (req, res) =>
      controller.createUser(req, res)
    );
  }

  getHttp() {
    if (!this.server) throw new Error("Server not yet started");
    return this.server;
  }

  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      ProcessService.killProcessOnPort(this.config.port, () => {
        this.server = this.express.listen(this.config.port, () => {
          console.log(`Server is running on port ${this.config.port}`);
          this.started = true;
          resolve();
        });
      });
    })
  }

  isStarted () {
    return this.started;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.server) {
        this.server.close(() => {
          this.started = false;
          resolve();
        });
      }
    });
  }
}
