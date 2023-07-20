
import express from "express";
import { Server } from "http";
import { ProcessService } from "../processes/processService";
import { UserController } from "../../modules/users/controllers/userController";

export class WebServer {

  private express: express.Express;
  private http: Server | undefined;
  private state: 'Started' | 'Stopped'

  constructor (constructor: UserController) {
    this.express = this.createExpress();
    this.configureExpress();
    this.setupRoutes(constructor);
    this.state = 'Stopped';
  }

  private setupRoutes (userController: UserController) {
    // Create a new user
    this.express.post("/users/new", (req, res) => userController.createUser(req, res));

    // Edit a user
    this.express.post("/users/edit/:userId", (req, res) => userController.editUser(req, res));

    // Get a user by email
    this.express.get("/users", (req, res) => userController.getUserByEmail(req, res));

    this.express.get('/health', (req, res) => {
      return res.send({ ok: true }).status(200);
    })
  }

  private configureExpress () {
    this.express.use(express.json());
  }

  private createExpress () {
    return express();
  }

  public async start (): Promise<void> {
    // Kill the process running on the port if it's already running
    let port = 3000;
    return new Promise(async (resolve, reject) => {
      await ProcessService.killProcessOnPort(port, () => {
        this.http = this.express.listen(port, () => {
          console.log(`Server is running on port ${port}`);
          this.state = 'Started';
          resolve()
        });
      }) 
    })   
  }

  public isRunning () {
    return this.state === 'Started';
  }

  public async stop (): Promise<void> {
    if (!this.isRunning()) return;
    return new Promise((resolve, reject) => {
      this.http?.close(() => {
        this.state = 'Stopped';
        resolve();
      })
    })
  }

  public getHttp () {
    if (!this.isRunning()) throw new Error('Not yet started');
    return this.http;
  }

}