require('newrelic');
require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT;
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const Riak = require('basho-riak-client');
const winston = require('winston');
const { nodes } = require('../database/riak/.riak.config.js');

app.use('/', express.static(path.join(__dirname, '../dist')));
app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const client = new Riak.Client(nodes, err => {
  if (err) {
    console.error(err);
  }
});

const stop = done =>
  client.stop((err, rslt) => {
    if (err) {
      logger.error('[TasteOfRiakIntro] err: %s', err);
    }
    done(err, rslt);
  });

app.get('/ratings/getData', (req, res) => {
  const symbol = req.query.symbol ? req.query.symbol : 'AAAAA';

  client.fetchValue(
    {
      bucket: 'stocks',
      key: symbol,
      convertToJs: true,
    },
    (err, rslt) => {
      if (err) {
        logger.error(err);
        return res.status(404).send('not found');
      }
      const riakObj = rslt.values.shift();
      const stock = riakObj && riakObj.value;
      const { buyRating, sellRating, holdRating } = stock;
      stock.buyRating = `${buyRating * 100}%`;
      stock.sellRating = `${sellRating * 100}%`;
      stock.holdRating = `${holdRating * 100}%`;
      if (!stock) {
        res.status(404).send('not found');
      }
      res.send(stock);
    }
  );
});

app.post('/ratings/', (req, res) => {
  client.storeValue(
    {
      bucket: 'stocks',
      returnBody: true,
      convertToJs: true,
      key: req.body.symbol,
      value: req.body,
    },
    (err, rslt) => {
      if (err) {
        logger.error(err);
        return res.status(400).send(err);
      }

      const updated = rslt.values.shift().value;
      return res.send(updated);
    }
  );
});

app.put('/ratings/:symbol', (req, res) => {
  client.fetchValue(
    {
      bucketType: 'map',
      bucket: 'stocks',
      key: req.params.symbol,
      convertToJs: true,
    },
    (err, rslt) => {
      if (err) {
        logger.error(err);
        return res.status(404).send(err);
      }
      const riakObj = rslt.values.shift();
      const stock = riakObj.value;
      logger.info('found %s', stock.symbol);

      riakObj.setValue(req.body);

      client.storeValue(
        { value: riakObj, returnBody: true, convertToJs: true },
        (e, r) => {
          if (e) {
            logger.error(e);
          }
          const updated = r.values.shift().value;
          return res.send(updated);
        }
      );
    }
  );
});

app.delete('/ratings/:symbol', (req, res) => {
  client.deleteValue(
    { bucket: 'stocks', key: req.params.symbol },
    (err, rslt) => {
      if (err) {
        return res.status(400).send(err);
      }

      return res.status(200).send(rslt);
    }
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
