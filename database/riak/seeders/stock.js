const Riak = require('basho-riak-client');
const fs = require('fs');
const es = require('event-stream');
const path = require('path');
const winston = require('winston');
const async = require('async');
const { riakClient } = require('../.riak.config.js');

const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'combined.log' })],
});

logger.add(
  new winston.transports.Console({
    level: 'debug',
    colorize: true,
    timestamp: true,
  })
);

const client = riakClient((err, c) => {
  if (err) {
    logger.error(err);
  }
  c.ping(error => {
    logger.info('Client has entered ping');

    if (error) {
      logger.error(error);
    } else {
      logger.info('client.ping has resulted in a success!');
    }
    const updateStock = (stock, callback) => {
      const mapOp = new Riak.Commands.CRDT.UpdateMap.MapOperation();
      mapOp
        .setRegister('company', Buffer.from(stock.company))
        .setRegister('description', Buffer.from(stock.description))
        .setRegister('sellSummary', Buffer.from(stock.sellSummary))
        .setRegister('buySummary', Buffer.from(stock.buySummary))
        .setRegister('buyRating', Buffer.from(stock.buyRating.toString()))
        .setRegister('sellRating', Buffer.from(stock.sellRating.toString()))
        .setRegister('holdRating', Buffer.from(stock.holdRating.toString()));

      const options = {
        bucketType: 'map',
        bucket: 'stocks',
        w: 1,
        key: stock.symbol.toString(),
        op: mapOp,
      };

      client.updateMap(options, e => {
        if (e) {
          throw new Error(e);
        }
        // callback();
      });
    };

    const cargoQ = async.cargoQueue((tasks, callback) => {
      async.each(tasks, updateStock, e => {
        if (e) {
          throw new Error(e);
        }
      });
      callback();
    }, 8);

    fs.createReadStream(
      path.resolve(__dirname, '../../sample_data/stocks.json'),
      {
        flags: 'r',
      }
    )
      .pipe(es.split())
      .pipe(es.parse())
      .pipe(
        es
          .map(stock => {
            cargoQ.push(stock);
          })
          .on('finish', () => {
            logger.info('Stream write to db has successfully completed!');
            client.stop(e => {
              if (e) {
                logger.error(e);
              } else {
                console.log('Client connection closed');
              }
            });
          })
      );
  });
});
