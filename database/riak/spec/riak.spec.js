const Riak = require('basho-riak-client');
const logger = require('../../logger');
const { nodes } = require('../.riak.config.js');

const client = new Riak.Client(nodes, err => {
  if (err) {
    throw new Error(err);
  }
});

const checkErr = error => {
  logger.error(error);
  process.exit(1);
};
const disconnect = () => {
  client.stop(e => {
    if (e) {
      checkErr(e);
    }
  });
};

const pingCluster = async () => {
  return new Promise((resolve, reject) => {
    client.ping((err, rslt) => {
      if (err) {
        reject(err);
      }
      resolve(rslt);
    });
  });
};

const getReadBenchmark = async () => {
  const start = new Date();
  return new Promise((resolve, reject) => {
    client.fetchValue(
      { bucketType: 'map', bucket: 'stocks', key: 'AAAAA', convertToJs: true },
      (err, res) => {
        if (err) {
          disconnect();
          reject(err);
        } else if (res.isNotFound) {
          disconnect();
          reject(new Error('Failed: not found'));
        } else {
          const end = new Date();
          const timeDiff = end - start;
          disconnect();
          resolve(timeDiff);
        }
      }
    );
  });
};

describe('benchmarking', () => {
  it('should respond to a ping', async () => {
    expect.hasAssertions();
    const status = await pingCluster();
    expect(status).toBe(true);
  });

  it('should respond from riak db in under 50ms', async () => {
    expect.hasAssertions();
    const time = await getReadBenchmark();
    expect(time)
      .expect(time)
      .toBeLessThan(50);
  });
});
