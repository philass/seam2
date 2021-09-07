const { Pool, Client } = require("pg");

function createPool() {
  return new Pool({
      user: "postgres",
      host: "localhost",
      database: "test",
      port: "5432"
  });
}

async function queryCustomer(client, email) {
  var query = `SELECT id FROM customers WHERE email = '${email}';`
  console.log("query", query);
  var queryResult = await client.query(query);
  var rows = queryResult.rows
  if (rows.length === 0)
    return null;
  var id = rows[0].id;
  console.log('id', id);
  return id;
}

export default async function loginHandler({ query: { email } }, res) {
  var pool = createPool();
  const client = await pool.connect();
  var customerId = await queryCustomer(client, email);
  if (customerId === null) {
    res.status(404).json({ message: `No customer with email : ${email} found.` })
  } else {
    res.status(200).json(customerId);
  }
  client.release();
}
