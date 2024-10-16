const express = require("express");
const request = require("request");
const cors = require("cors");

// require dotenv if not in production mode
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Declare express App
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// ROUTE: Gets current System Status from Enphase API Url and fowards on JSON
// response to front-end
app.get("/api/status", (req, res) => {
  const statusUrl = process.env.API_SYSTEM_STATUS_URL;
  request(statusUrl, (error, response, body) => {
    if (error) {
      return res.status(500).send("Error occured: " + error);
    }
    res.setHeader("Content-Type", "application/json");
    res.send(body);
  });
});

// ROUTE: Gets Systems data from Enphase API Url and forwards on JSON
// response to front-end
app.get("/api/systems", (req, res) => {
  const apiUrl = process.env.API_SYSTEMS_URL;

  request(apiUrl, (error, response, body) => {
    if (error) {
      return res.status(500).send("Error occurred: " + error);
    }
    res.setHeader("Content-Type", "application/json");
    res.send(body);
  });
});

// Expose listening port 5001 and display startup message.
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
