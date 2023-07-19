import { Database } from "./database"

describe('database', () => {

  it('can be connected to', async () => {
    let database = new Database();
    expect(await database.connect()).toBeTruthy()
    expect(await database.testConnection()).toBeTruthy();
  });

})