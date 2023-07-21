import { CompositionRoot } from "./shared/composition/compositionRoot";

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