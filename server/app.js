// const path = require('path');
const express = require('express');
const app = express();
// const init = require('./init');

let listenPort = 3000;

const api = require('./api-middleware');
app.use('/spider', api);

const listener = app.listen(listenPort, () => {
  console.log('App listening on port', listener.address().port);
});
