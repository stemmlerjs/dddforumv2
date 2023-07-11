import dotenv from 'dotenv';
import path from 'path';

import { prepareDev } from '../prepareDev';

export default async (): Promise<void> => {
  prepareDev();

  const envPath = path.join(__dirname, '../.env.development');

  console.log('Reading env file at', envPath);
  dotenv.config({ path: envPath });
};
