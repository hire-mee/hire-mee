const { Client } = require('pg');

const client = new Client({
  user: "postgres",
  port: 5432,
  database: "hiremee"
})

client.connect()
.then(() => console.log("Connected successfully"))
.catch((err) => console.error("Failed to connect"));

module.exports = client;