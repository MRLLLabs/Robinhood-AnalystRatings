const Riak = require('basho-riak-client');
const async = require('async');
const { analysts } = require('../../sample_data/analysts');
const { nodes } = require('../.riak.config.js');

const client = new Riak.Client(nodes, (err, c) => {
  c.ping((error, rslt) => {
    if (error) {
      throw new Error(error);
    } else {
      console.log(`Riak client is connected to cluster: ${rslt}`);
    }
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

        c.storeValue(options, e => {
          if (e) {
            cb(e);
          } else {
            cb();
          }
        });
      },
      er => {
        if (er) {
          console.error(er);
        } else {
          console.log('All records have been processed successfully');
          c.stop(erro => {
            if (erro) {
              console.error(erro);
            } else {
              console.log('Client connection closed');
              process.exit();
            }
          });
        }
      }
    );
  });
});
