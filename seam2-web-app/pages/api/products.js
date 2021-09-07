const { Pool, Client } = require("pg");

function createPool() {
  return new Pool({
      user: "postgres",
      host: "localhost",
      database: "test",
      port: "5432"
  });
}

async function queryProducts(client) {
  var query = `SELECT * FROM products;`
  var queryResult = await client.query(query);
  var rows = queryResult.rows
  return rows;
}

export default async function productHandler(req, res) {
  var pool = createPool();
  const client = await pool.connect();
  var devices = await queryProducts(client);
  res.status(200).json(devices);
  client.release();
}
