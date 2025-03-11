import pool from "./db"; // Import database connection

const testDbConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()"); // Test query
    console.log("✅ Database connected at:", result.rows[0].now);
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};

testDbConnection();
