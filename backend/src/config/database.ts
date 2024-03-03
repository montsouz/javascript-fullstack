import { Sequelize } from "sequelize";

const CONFIG = process.env.DB_SSL
  ? {
      username: process.env.DB_USERNAME ?? "user",
      password: process.env.DB_PASSWORD ?? "password",
      host: process.env.DB_HOST ?? "db",
      port: 5432,
      dialect: "postgres",
      dialectOptions: process.env.DB_SSL
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {},
    }
  : process.env.DATABASE_URL;

export const sequelize = new Sequelize(CONFIG as any);
