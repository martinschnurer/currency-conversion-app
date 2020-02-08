import DOTENV from "dotenv";
import path from "path";

if (process.env.ENV !== "production" && process.env.ENV !== "development") {
  throw new Error('SERVER MUST CONTAIN ENV VARIABLE one of [production, development]');
} else {
  console.log(`CURRENT ENV = ${process.env.ENV}`);
}

const envFileName = process.env.ENV === 'production' ? '.env.production' : '.env';

const config = DOTENV.config({
  path: path.resolve(process.cwd(), envFileName),
});

if (config.error) {
  throw new Error('FAILED TO LOAD .ENV FILE');
}

export const CONFIG = config.parsed;