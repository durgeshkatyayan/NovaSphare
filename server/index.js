const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');

require('./config/environment');
require('./database');

const configPassport = require('./passport/config');
const routes = require('./routes/index');

// const assetFolder = path.resolve(__dirname, '../dist/');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.use(bodyParser.json());

configPassport(app, express);
app.get('/all', (req, res) => {
  res.send({ message: 'Server is running' });
});
app.use('/', routes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
