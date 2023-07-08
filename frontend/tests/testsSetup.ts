
import path from 'path'
const envPath = path.join(__dirname, '../.env');
console.log('Reading env file at', envPath);
require('dotenv').config({ path: envPath });