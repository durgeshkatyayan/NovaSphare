const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("./config/environment");
require("./database");

const configPassport = require("./passport/config");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3101;

// Allow frontend to access backend
app.use(
  cors({
    origin: "*", // Replace "*" with your frontend URL in production
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configPassport(app, express);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});