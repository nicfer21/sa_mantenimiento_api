import { Sequelize } from "sequelize";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../src/config.js";

const db = new Sequelize(
  "postgres://fl0user:mt1rwbXu6VMT@ep-delicate-term-56466300.us-east-2.aws.neon.fl0.io:5432/mantenimiento?sslmode=require"
);

/* {
  host: DB_HOST,
  database: DB_NAME,
  dialect: "postgres",
  username: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync("./cert.pem"),
    },
  },
} */

export default db;
