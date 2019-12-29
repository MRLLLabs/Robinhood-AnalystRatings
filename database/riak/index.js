const Riak = require('basho-riak-client');

const { nodes } = require('./.riak.config.js');

const client = new Riak.Client(nodes, (err, c) => {
  if (err) {
    throw new Error(err);
  }
});

client.ping((err, rslt) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log(`Riak cluster is connected returning ${rslt}`);
  }
})

module.exports = client;

