
import { PrismaClient } from "@prisma/client";

export class Database {

  private prisma: PrismaClient;

  constructor () {
    this.prisma = new PrismaClient();
  }

  public async connect (): Promise<Error | void> {
    return new Promise(async (resolve, reject) => {
      return this.prisma.$connect()
        .then(() => {
          console.log('Connection to the database successful.');
          return resolve();
        })
        .catch((err) => {
          return reject(new Error(`Could not start the database ${err}`));
        })
    })
  }

  public async testConnection () {
    try {
      const result: any = await this.prisma.$queryRaw`SELECT 1 + 1 AS sum`
      if (result[0].sum === 2) return true;
    } catch (err) {
      return false;
    }
  }

  public getConnection () {
    return this.prisma;
  }
}