import dotenv from 'dotenv';
import path from 'path';

export default async (): Promise<void> => {
  const envPath = path.join(__dirname, '../.env.test');

  console.log('Reading env file at', envPath);
  dotenv.config({ path: envPath });
};
