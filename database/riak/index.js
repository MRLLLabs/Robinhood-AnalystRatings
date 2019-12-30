const Riak = require('basho-riak-client');
const logger = require('../logger');
const { nodes } = require('./.riak.config.js');

const client = new Riak.Client(nodes, (err, c) => {
  if (err) {
    throw new Error(err);
  }
  c.ping((error, rslt) => {
    if (error) {
      logger.error(error);
      process.exit(1);
    } else {
      logger.info(rslt);
    }
  });
});

module.exports = { client };
