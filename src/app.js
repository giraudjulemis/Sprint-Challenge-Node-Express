const express = require('express');
const fetch = require('node-fetch');

const app = express();

const PORT = 3000;
const STATUS_SUCCESS = 200;
const STATUS_ERROR = 422;

const CURRENT_PRICE = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const YESTERDAY_PRICE = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';

const router = express.Router();

router.route('/compare')
  .get((req, res) => {
    const currentprice = fetch(CURRENT_PRICE)
      .then(res => res.json())
      .then(rate => rate.bpi.USD.rate_float)
      .then(result => {
        return result;
      })
      .catch(err => {
        res.status(STATUS_ERROR);
        res.send({ error: err });
      });

    const yesterdayprice = fetch(YESTERDAY_PRICE)
      .then(res => res.json())
      .then(rate => rate.bpi);
  });

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
