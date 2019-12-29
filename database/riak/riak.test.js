const Riak = require('bacho-riak-client');
const { nodes } = require('.riak.config.js');

describe('create', () => {
  
  const client = new Riak.Client(nodes, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
})
