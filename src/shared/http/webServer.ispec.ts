
import { Server } from "http";
import { RESTfulAPIDriver } from "./restfulAPIDriver";
import { CompositionRoot } from "../composition/compositionRoot";

describe('webServer', () => {

  let root = new CompositionRoot();
  let webServer = root.getWebServer();

  describe('starting & stopping', () => {

    beforeEach(async () => {
      await webServer.stop()
    })
  
    afterEach(async () => {
      await webServer.stop()
    })

    it('can start', async () => {
      await webServer.start();
      expect(webServer.isRunning()).toBeTruthy();
    })
  
    test('once started, it can be stopped', async () => {
      await webServer.start();
      await webServer.stop();
      expect(webServer.isRunning()).toBeFalsy();
    })
  
  })
  
  describe('health', () => {

    beforeEach(async () => {
      await webServer.start()
    })
  
    afterEach(async () => {
      await webServer.stop()
    })

    it('can successfully reach the server via the outside world using the health check API', async () => {
      let driver = new RESTfulAPIDriver(webServer.getHttp() as Server);
      let response = await driver.get('/health');

      expect(response.status).toBe(200);
      expect(response.body.ok).toBeTruthy();
    })
  })
})