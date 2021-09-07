const { Pool, Client } = require("pg");

function createPool() {
  return new Pool({
      user: "postgres",
      host: "localhost",
      database: "test",
      port: "5432"
  });
}

async function queryDevices(client, customerId) {
  var query = `SELECT "id", "productId", "deviceName" FROM devices WHERE "customerId" = ${customerId};`
  console.log("query", query);
  var queryResult = await client.query(query);
  var rows = queryResult.rows
  console.log("rows", rows);
  return rows;
}

export default async function devicesHandler({ query: { customerId } }, res) {
  var pool = createPool();
  const client = await pool.connect();
  var devices = await queryDevices(client, customerId);
  res.status(200).json(devices);
  client.release();
}
