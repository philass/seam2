const fsp = require('fs/promises');
const { Pool, Client } = require("pg");
const assert = require('assert/strict');

function createPool() {
  return new Pool({
      user: "postgres",
      host: "localhost",
      database: "test",
      port: "5432"
  });
}

async function insertProduct(client, {category : c, productName : pn}) {
  var query = `INSERT INTO products("category", "productName")VALUES('${c}', '${pn}') RETURNING *`;
  console.log("query", query);
  var queryResult = await client.query(query);
  return queryResult.rows[0].id;
}

async function insertCustomer(client, {name : n, email : e}) {
  var query = `INSERT INTO customers("name", "email")VALUES('${n}', '${e}') RETURNING *`;
  console.log("query", query);
  var queryResult = await client.query(query);
  return queryResult.rows[0].id;
}

async function insertDevice(client, cid, pid, {deviceName: dn}) {
  var query = `INSERT INTO devices("customerId", "productId", "deviceName") VALUES(${cid}, ${pid}, '${dn}') RETURNING *`;
  console.log("query", query);
  var queryResult = await client.query(query);
  return queryResult.rows[0].id;
}

// id | deviceId | name | code | alwaysActive | activeHoursBegin | activeHoursEnd | startsAt | endsAt

async function insertActiveCodes(client, did, {name, code, alwaysActive, activeHours, startsAt, endsAt}) {
  var activeHoursBegin, activeHoursEnd;
  if (activeHours !== undefined) {
    activeHoursBegin = activeHours[0];
    activeHoursEnd = activeHours[1];
  }
  // This seems redundant, but is neccesary as alwaysActive may be undefined;
  if (alwaysActive === undefined) {
   alwaysActive = false; 
  }
  var vals = [name, code, activeHoursBegin, activeHoursEnd, startsAt, endsAt]
  vals.forEach(
    (e, idx) => {
      vals[idx] = e === undefined ? "Null" : `'${e}'`;
    });
  [name, code, activeHoursBegin, activeHoursEnd, startsAt, endsAt] = vals

  //var query = `INSERT INTO active_codes("deviceId", "name", "code", "alwaysActive", "activeHoursBegin", "activeHoursEnd", "startsAt", "endsAt") VALUES(${did}, '${name}', '${code}', ${alwaysActive}, ${activeHoursBegin}, ${activeHoursEnd}, ${startsAt}, ${endsAt}) RETURNING *`;
  var query = `INSERT INTO active_codes("deviceId", "name", "code", "alwaysActive", "activeHoursBegin", "activeHoursEnd", "startsAt", "endsAt") VALUES(${did}, ${name}, ${code}, ${alwaysActive}, ${activeHoursBegin}, ${activeHoursEnd}, ${startsAt}, ${endsAt}) RETURNING *`;
  console.log("query", query);
  var queryResult = await client.query(query);
  return queryResult.rows[0].id;
}

fsp.readFile("customer_data.json").then(async (data) => {
  const json = JSON.parse(data);
  var pool = createPool();
  console.log(json);
  const client = await pool.connect();
  var productNameMap = new Map();
  for (var i = 0; i < json.products.length; i++) {
    var product = json.products[i];
    console.log("product", product);
    var productId = await insertProduct(client, product);
    productNameMap.set(product.productName, {productId, category : product.category});
  }
  for (var i = 0; i < json.customers.length; i++) {
    var customer = json.customers[i];
    console.log("customer", customer);
    var customerId = await insertCustomer(client, customer);
    console.log('customerId', customerId);
    for (var j = 0; j < customer.devices.length; j++) {
      var device = customer.devices[j];
      var {productId, category} = productNameMap.get(device.productName);
      console.log("printing categories");
      console.log(productNameMap.get(device.productName));
      console.log(device.category, category);
      assert(device.category === category);
      var deviceId = await insertDevice(client, customerId, productId, device);
      // TODO make sure that activeCodes doesn't need to be a string
      if ("activeCodes" in device) {
        console.log(device.activeCodes);
        for (var k = 0; k < device.activeCodes.length; k++) {
          var activeCodeId = await insertActiveCodes(client, deviceId, device.activeCodes[k]);
        }
      }

    }
  }
//  json.customers.forEach(async (customer) => {
//    console.log("customer", customer);
//    var customerId = await insertCustomer(client, customer);
//    console.log('customerId', customerId);
//    customer.devices.forEach(async (device) => {
//      var deviceId = await insertDevice(client, customerId, device);
//      console.log('deviceId', deviceId);
//    });
//  });
  client.release();
});

// Call to helper function
//

// This script is helpful to make sure that all fields are filled out! and all cases are checked.
// Accepts arguements that 
  //var res = readUniqueActiveCodeKeys(json.customers);
  //console.log(res);
function readUniqueActiveCodeKeys(customers) {
  var uniqueKeys = new Set();
  var arr = [];
  customers.forEach((customer) => {
    customer.devices.forEach((device) => {
      if (!("activeCodes" in device)) {
        // Must figure out how to put the information that this is not owned into the schema
        console.log("There are no active codes");
      } else {
        device.activeCodes.forEach((ac) => {
          var ac_keys = Object.keys(ac);
          arr = [...arr, ...ac_keys];
        });
      }
      uniqueKeys = new Set(arr);
    });
  });
  return uniqueKeys;
}


// What do I want to do?
//
// The first thing would be to create customer.json with
// Schema of the following
//
// Name Email device_id
//
//
//
// int      String      String   
// deviceId productName name     code alwaysActive
//
// 
//
