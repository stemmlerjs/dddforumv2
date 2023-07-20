
import { UserController } from "../../modules/users/controllers/userController";
import { WebServer } from "../http/webServer";
import { Database } from "../persistence/database";

export class CompositionRoot {
  private database: Database;
  private userController: UserController;
  private webServer: WebServer;

  constructor () {
    this.database = this.createDatabase();
    this.userController = this.createUserController();
    this.webServer = this.createWebServer();
  }

  private createDatabase () {
    return new Database();
  }
  
  private getDatabase() {
    return this.database;
  }

  private createUserController () {
    let database = this.getDatabase();
    return new UserController(database);
  }

  private getUserController () {
    return this.userController;
  }

  private createWebServer () {
    let userController = this.getUserController();
    return new WebServer(userController);
  }

  public getWebServer () {
    return this.webServer;
  }
  
}