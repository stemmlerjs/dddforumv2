import { Database } from './databaseConnection';

describe('database', () => {
  test('connecting to the database', async () => {
    const db = new Database();
    const result = await db.testConnection();
    expect(result).toBeTruthy();
  });
});
