const Riak = require('basho-riak-client');
const async = require('async');
const { client } = require('../index');
const { analysts } = require('../../sample_data/analysts');

client.ping((error, rslt) => {
  if (error) {
    throw new Error(error);
  } else {
    console.log(`Riak client is connected to cluster: ${rslt}`);
  }
});

async.eachSeries(
  analysts,
  (analystInfoObj, cb) => {
    const riakObj = new Riak.Commands.KV.RiakObject();
    riakObj.setContentType('application/json');
    riakObj.setValue(analystInfoObj);

    const options = {
      bucket: 'analysts',
      key: analystInfoObj.id.toString(),
      value: riakObj,
    };

    client.storeValue(options, err => {
      if (err) {
        cb(err);
      } else {
        cb();
      }
    });
  },
  err => {
    if (err) {
      console.error(err);
    } else {
      console.log('All records have been processed successfully');
      client.stop(error => {
        if (error) {
          console.error(error);
        } else {
          console.log('Client connection closed');
          process.exit();
        }
      });
    }
  }
);
