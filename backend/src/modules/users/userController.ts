
import { Request, Response } from "express";
import { CreateUserResponse } from "../../shared/users/dtos/usersDTOs.shared";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UserController {

  constructor () {}

  async createUser (req: Request, res: Response) {
    try {
      // If already exists, return error
      // If username taken, return error
      // If invalid properties, return error
      // Return success
      const user = await prisma.user.create({ data: req.body });
      if (!user) throw new Error();

      const returnDTO: CreateUserResponse = {
        success: true,
        error: null,
        data: user
      }
      res.status(201).json(returnDTO);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user.' });
    }
  }

  async editUserByIdController (req: Request, res: Response) {
    try {
      const user = await prisma.user.update({
        where: { id: Number(req.params.userId) },
        data: req.body,
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to edit user.' });
    }
  }

  async getUserByEmailController (req: Request, res: Response) {
    try {
      const email = req.query.email as string;
      const user = await prisma.user.findUnique({ where: { email } });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user.' });
    }
  }
}

