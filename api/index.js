const express = require("express");
const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.get("/jobs", async (req, res) => {
  const response = await getAsync("github");
  res.send(response);
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
