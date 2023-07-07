import { Database } from "./databaseConnection"

describe('database', () => {
  test('connecting to the database', async () => {
    let db = new Database();
    let result = await db.testConnection();
    expect(result).toBeTruthy();
  })
})