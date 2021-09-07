const { Pool, Client } = require("pg");

function createPool() {
  return new Pool({
      user: "postgres",
      host: "localhost",
      database: "test",
      port: "5432"
  });
}

async function insertDevice(client, cid, pid, {deviceName: dn}) {
  var query = `INSERT INTO devices("customerId", "productId", "deviceName") VALUES(${cid}, ${pid}, '${dn}') RETURNING *`;
  console.log("query", query);
  var queryResult = await client.query(query);
  return queryResult.rows[0].id;
}

export default async function devicesHandler(query, res) {
  var url = new URL(query.url, `http://${query.headers.host}`);
  var params = url.searchParams;
  var deviceName = params.get("deviceName");
  var customerId = params.get("customerId");
  var productId = params.get("productId");
  // Try and convert to integer
  customerId = parseInt(customerId);
  productId = parseInt(productId);
  if (customerId === NaN || productId === NaN) {
    // I could make this more clear
    res.status(404).json({ message: `Could not convert customerId or productId to integer`});
  } else {
    var pool = createPool();
    const client = await pool.connect();
    var deviceId = await insertDevice(client, customerId, productId, {deviceName});
    res.status(200).json({deviceName, productId});
    client.release();
  }
}
