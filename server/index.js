const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');

require('./config/environment');
require('./database');

const configPassport = require('./passport/config');
const routes = require('./routes/index');

<<<<<<< HEAD
const assetFolder = path.resolve(__dirname, '../dist/');
const port = Number(process.env.PORT || 3101);
=======
// const assetFolder = path.resolve(__dirname, '../dist/');
const port = process.env.PORT || 3000;
>>>>>>> 9abd9c04f08e7eaae43f39a52da66af68238e304
const app = express();

app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.use(bodyParser.json());

configPassport(app, express);
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.use('/', routes);

app.listen(port, () => console.log(`Server is listening on port ${port}`))
  .on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Please stop the existing process or change PORT in server/.env.`);
      process.exit(1);
    }

    throw error;
  });
