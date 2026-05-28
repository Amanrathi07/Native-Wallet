import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db";
import cookieParser from "cookie-parser";
import ratelimiter from "./middleware/rateLimiter";

import transactionRouter from "./routes/transaction.route";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(ratelimiter)
const port = process.env.PORT || 3000;

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY  ,
            user_id VARCHAR(255) NOT NULL ,
            title VARCHAR(255) NOT NULL ,
            amount DECIMAL(10,2) NOT NULL ,
            category VARCHAR(255) NOT NULL ,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE 
        )`;

    console.log("Database initialized successfully ");
  } catch (error) {
    console.log("Error initialized DB", error);
    process.exit(1);
  }
}

app.use("/api/v1",transactionRouter);

initDB().then(() => {
  app.listen(port, () => {
    console.log(`server is up and running on port :${port}`);
  });
});
