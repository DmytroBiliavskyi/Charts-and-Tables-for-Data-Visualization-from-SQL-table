import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "fedev",
  host: "54.92.200.80",
  database: "productdb_backup",
  password: "password",
  port: 5432,
  idleTimeoutMillis: 30000,
  max: 20,
});

export default pool;
