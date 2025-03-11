import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected successfully!"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err));

export default pool;
