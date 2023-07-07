
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UserService {

  async createUser(userData: any) {
    try {
      // If already exists, return error
      // If username taken, return error
      // If invalid properties, return error
      // Return success
      const user = await prisma.user.create({ data: userData });
      return user
    } catch (err) {
      console.log(err);
    }
  }

  async editUser(userId: number, userData: any) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: userData,
    });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

}