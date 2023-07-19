import dotenv from 'dotenv';
import path from 'path';

export default async (): Promise<void> => {
  const nodeEnv = process.env.ENV || 'development';
  const envPath = path.join(__dirname, `../.env.${nodeEnv}`);

  console.log(`Starting tests using env `, envPath);
  dotenv.config({ path: envPath });
};
