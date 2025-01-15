const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '283711',
  port: 5432, // Default PostgreSQL port
});

// Export the pool for use in your application
module.exports = pool;

const createUsers = async () => {
    const query = `
      CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
  
    try {
      await pool.query(query);
      console.log('Table "users" created successfully');
    } catch (err) {
      console.error('Error creating table:', err.message);
    } finally {
    //   await pool.end();
    }
  };
  
  createUsers();