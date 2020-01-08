const protobuf = require('protobufjs');
const path = require('path');

protobuf
  .load(path.resolve(__dirname, 'rating.proto'))
  .then(root => {
    const RpbPut = root.lookupType('riak.RpbPutReq');

    const payload = {
      /* 
        required bytes bucket = 1;
    optional bytes key = 2;
    optional bytes vclock = 3;
    required RpbContent content = 4;
    optional uint32 w = 5;
      */

      bucket: 'stocks',
      key: 'AAAAA',
      content: {
        value: '{"description": "lorem ipsum"}',
        content_type: 'application/json',
      },
    };

    const message = RpbPut.create(payload);
    console.log(`message = ${JSON.stringify(message)}`);

    const err = RpbPut.verify(message);

    if (err) {
      throw new Error(err);
    }

    const buffer = RpbPut.encode(message).finish();
    console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);

    const decoded = RpbPut.decode(buffer);
    console.log(`decoded = ${JSON.stringify(decoded)}`);

    const obj = RpbPut.toObject(decoded, {
      enums: String, // enums as string names
      longs: String, // longs as strings (requires long.js)
      bytes: String, // bytes as base64 encoded strings
      arrays: true, // populates empty arrays (repeated fields) even if defaults=false
      objects: true, // populates empty objects (map fields) even if defaults=false
      oneofs: true, // includes virtual oneof fields set to the present field's name
    });

    console.log(obj);
  })
  .catch(err => {
    if (err) {
      throw new Error(err);
    }
  });
