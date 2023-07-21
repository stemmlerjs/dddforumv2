
import dotenv from 'dotenv'
import { CompositionRoot } from "./shared/composition/compositionRoot";
import path from 'path';

dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)})

const root = new CompositionRoot();
const server = root.getWebServer();
const db = root.getDatabase();

async function bootstrap() {
  try {
    await db.connect();
    await server.start();
  } catch (err) {
    console.log(err);
  }
}

bootstrap ();