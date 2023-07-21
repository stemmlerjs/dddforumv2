
import dotenv from 'dotenv'
import path from 'path'
import { execSync } from 'child_process';

type ExecOptions = {
  readonly cwd: string;
  readonly stdio: "inherit";
}

export class GlobalSetup {

  private execOptions: ExecOptions;

  constructor () {
    this.execOptions = this.setExecOptions()
  }

  public getExecOptions () {
    return this.execOptions;
  }

  private setExecOptions () {
    const rootDirectory = path.join(__dirname, '../');
    const execOptions = {
      cwd: rootDirectory,
      stdio: 'inherit'
    } as const;
    return execOptions
  }

  private getRootPath () {
    return this.execOptions.cwd;
  }

  private loadEnvs () {
    const rootPath = this.getRootPath();

    // load the env file
    const envVariablesPath = path.join(rootPath, `.env.development`);
    
    // use dotenv to read all the values of the config file into memory
    dotenv.config({ path: envVariablesPath })
  }

  private generatePrismaClient () {
    const execOptions = this.getExecOptions();
    // Generate the latest client code for Prisma
    execSync('prisma generate --schema prisma/schema.prisma', execOptions)
  }

  public runGlobalSetup () {
    this.loadEnvs();
    this.generatePrismaClient();
  }
}
