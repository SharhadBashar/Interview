const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send("Nothing here, but I like your curiosity. Type /calcPI at the end of the above link to go to application");
});

app.get('/calcPI', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

const piCalculator = require ('./src/calcPI');
app.use('calcPI', piCalculator);

app.listen(port, () => {
  console.log(`Listening on port ${chalk.green(port)}`);
  console.log(`Cmd + click to follow link to application: http://localhost:${port}/calcPI`)
});