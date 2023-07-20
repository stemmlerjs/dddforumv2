import { Request, Response } from "express";
import { randomCharacters } from "../../../shared/utils/generateRandom";
import { Database } from "../../../shared/persistence/database";

export class UserController {
  constructor(private database: Database) {}

  async getUserByEmail(req: Request, res: Response) {
    try {
      const dbConnection = this.database.getConnection();
      const email = req.query.email as string;

      const user = await dbConnection.user.findUnique({ where: { email } });
      if (!user) {
        return res
          .status(404)
          .json({ error: "UserNotFound", data: undefined, success: false });
      }

      return res.json({
        error: undefined,
        data: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        success: true,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user." });
    }
  }

  async editUser(req: Request, res: Response) {
    try {
      const dbConnection = this.database.getConnection();
      const userId = Number(req.params.userId);
      const { email, username, firstName, lastName } = req.body;

      const existingUser = await dbConnection.user.findUnique({
        where: { id: userId },
      });
      if (!existingUser) {
        return res
          .status(404)
          .json({ error: "UserNotFound", data: undefined, success: false });
      }

      const editedUser = await dbConnection.user.update({
        where: { id: userId },
        data: { email, username, firstName, lastName },
      });

      return res.json({ error: undefined, data: editedUser, success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to edit user." });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      let dbConnection = this.database.getConnection();

      const { email, username, firstName, lastName } = req.body;

      // Check if the username is already taken
      const existingUserByUsername = await dbConnection.user.findUnique({
        where: { username },
      });

      if (existingUserByUsername) {
        return res.status(409).json({
          error: "UsernameAlreadyTaken",
          data: undefined,
          success: false,
        });
      }

      // Check if the email is already in use
      const existingUserByEmail = await dbConnection.user.findUnique({
        where: { email },
      });
      if (existingUserByEmail) {
        return res
          .status(409)
          .json({
            error: "EmailAlreadyInUse",
            data: undefined,
            success: false,
          });
      }

      // Create the user
      const user = await dbConnection.user.create({
        data: {
          email,
          username,
          firstName,
          lastName,
          password: randomCharacters(15),
        },
      });

      return res.status(201).json({
        error: undefined,
        data: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Failed to create user.",
        data: undefined,
        success: false,
      });
    }
  }
}
