
import { execSync } from "child_process";
import { GlobalSetup } from "./globalDevTestSetup"

export default () => {

  // global setup
  let setup = new GlobalSetup();
  setup.runGlobalSetup();

  // e2e setup

    // Start the Docker development database
    execSync('docker-compose up --build -d', setup.getExecOptions())

    // tearing down the database
    execSync('npx prisma migrate reset --force')

    // running migrations
    execSync('npx prisma migrate dev')
}