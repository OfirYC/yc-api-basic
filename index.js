import * as pg from "pg";
import express from "express";
import bodyParser from "body-parser";
import url from "url";
import cors from "cors";
import axios from "axios";

const { Client } = pg.default;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let PORT = 1337;

const client = new Client({
  host: "postgres-1.ctknysk7lqdz.us-east-1.rds.amazonaws.com",
  user: "OfirYC",
  port: 5432,
  password: "B.?3f*pbf=2Df!i",
  database: "postgres",
});

client.connect().then(() => console.log("Connected Succesfully"));

const genericQuery = async (_what, _from, _where, _inputs) => {
  return new Promise(function (res, rej) {
    var sql;
    console.log("From", _from);
    if (_where !== undefined || null) {
      sql = `SELECT ${_what} FROM "Yieldchain".${_from} WHERE ${_where} = ${_inputs}`;
    } else {
      sql = `SELECT ${_what} FROM "Yieldchain".${_from}`;
    }
    client.query(sql, (err, rows) => {
      if (!err) {
        res(rows.rows);
      } else {
        rej(err.message);
      }
    });
  });
};

/**
 * @dev
 * @notice
 * Queries From The Database Server
 */

app.get("/tokens", async (req, res) => {
  const tokens = await genericQuery("*", "tokens");
  res.status(200).json({ tokens });
});

app.get("/networks", async (req, res) => {
  const networks = await genericQuery("*", "networks");
  res.status(200).json({ networks });
});

app.get("/strategies", async (req, res) => {
  const strategies = await genericQuery("*", "strategies");
  res.status(200).json({ strategies });
});

app.get("/protocols", async (req, res) => {
  const protocols = await genericQuery("*", "protocols");
  res.status(200).json({ protocols });
});

app.get("/pools", async (req, res) => {
  const pools = await genericQuery("*", "fe_pools");
  res.status(200).json({ pools });
});

app.get("/flows", async (req, res) => {
  const flows = await genericQuery("*", "flows");
  res.status(200).json({ flows });
});

app.get("/parameters", async (req, res) => {
  const parameters = await genericQuery("*", "parameters");
  res.status(200).json({ parameters });
});

app.get("/steps", async (req, res) => {
  const steps = await genericQuery("*", "steps");
  res.status(200).json({ steps });
});

app.get("/users", async (req, res) => {
  const users = await genericQuery("*", "users");
  res.status(200).json({ users });
});

app.get("/protocols-pools", async (req, res) => {
  const protocols_pools = await genericQuery("*", "protocols_pools");
  res.status(200).json({ protocols_pools });
});

app.get("/protocols-networks", async (req, res) => {
  const protocols_networks = await genericQuery("*", "protocols_networks");
  res.status(200).json({ protocols_networks });
});

app.get("/pools-functions", async (req, res) => {
  const pools_functions = await genericQuery("*", "pools_functions");
  res.status(200).json({ pools_functions });
});

app.get("/functions-parameters", async (req, res) => {
  const functions_parameters = await genericQuery("*", "functions_parameters");
  res.status(200).json({ functions_parameters });
});

app.get("/functions-flows", async (req, res) => {
  const functions_flows = await genericQuery("*", "functions_flows");
  res.status(200).json({ functions_flows });
});

app.get("/strategies-steps", async (req, res) => {
  const strategies_steps = await genericQuery("*", "strategies_steps");
  res.status(200).json({ strategies_steps });
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
