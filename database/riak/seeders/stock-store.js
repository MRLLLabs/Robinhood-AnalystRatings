const Riak = require('basho-riak-client');
const fs = require('fs');
const es = require('event-stream');
const path = require('path');
const winston = require('winston');
const async = require('async');
const { nodes } = require('../.riak.config.js');

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

const client = new Riak.Client(nodes, (err, c) => {
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

    const q = (stock, callback) => {
      const options = {
        bucket: 'stocks',
        key: stock.symbol.toString(),
        value: stock,
      };

      client.storeValue(options, e => {
        if (e) {
          logger.error(e);
        } else {
          callback();
        }
      });
    };

    fs.createReadStream(
      path.resolve(__dirname, '../../sample_data/stocks.json'),
      {
        flags: 'r',
      }
    )
      .on('error', e => {
        if (e) {
          logger.error(e);
        }
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
      .pipe(es.split())
      .pipe(es.parse())
      .pipe(
        es.mapSync(stock => {
          q(stock, e => {
            if (e) {
              logger.error(e);
            }
            logger.info(`finished processing ${stock.symbol}`);
          });
        })
      );
  });
});
