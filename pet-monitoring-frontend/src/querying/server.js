import express from "express";
import bodyParser from "body-parser";
import { InfluxDB } from "influx";
import cors from "cors";

const app = express();
const PORT = process.env.PORT; 

app.use(cors());

const INFLUX_HOST = process.env.INFLUX_HOST;
const INFLUX_PORT = process.env.INFLUX_PORT;
const INFLUX_DB = process.env.INFLUX_DB;
const INFLUX_USER = process.env.INFLUX_USER;
const INFLUX_PASSWORD = process.env.INFLUX_PASSWORD;

const influx = new InfluxDB({
  host: INFLUX_HOST,
  port: INFLUX_PORT,
  database: INFLUX_DB,
  username: INFLUX_USER,
  password: INFLUX_PASSWORD,
});

app.use(bodyParser.json());

app.get("/latest/:parameter", async (req, res) => {
  const parameter = req.params.parameter; // e.g., "temperature", "humidity", "luminosity", "pressure"

  try {
    // Query the latest data for the parameter
    const query = ` SELECT LAST("${parameter}") AS value FROM sensor_data`;
    
    const results = await influx.query(query);

    if (results.length === 0) {
        return res.status(404).json({ message: "No data found" });
      }
      res.json({ time: results[0].time, value: results[0].value });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
