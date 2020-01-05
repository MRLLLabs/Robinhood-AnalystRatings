const Riak = require('basho-riak-client');

const riakNodes = [
  '172.17.0.2:8087',
  '172.17.0.3:8087',
  '172.17.0.4:8087',
  '172.17.0.5:8087',
  '172.17.0.6:8087',
];

const nodes = Riak.Node.buildNodes(riakNodes);
const cluster = new Riak.Cluster({ nodes: nodes, queueCommands: true });

const riakClient = cb => new Riak.Client(cluster, cb);

module.exports = {
  riakClient,
  nodes: riakNodes,
};
