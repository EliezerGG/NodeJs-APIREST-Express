const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mi serve en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola nuevo endpoint');
});

routerApi(app);

app.listen(port, () => {
  console.log('Mi port ' + port);
});