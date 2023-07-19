
import { GlobalSetup } from "./globalDevTestSetup"

export default () => {

  // global setup
  let setup = new GlobalSetup();
  setup.runGlobalSetup();

}