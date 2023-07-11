import '../prepareDev';

import dotenv from 'dotenv';
import path from 'path';

const envPath = path.join(__dirname, '../.env.development');

console.log('Reading env file at', envPath);
dotenv.config({ path: envPath });
