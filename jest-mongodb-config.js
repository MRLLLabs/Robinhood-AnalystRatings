//this preset allows us to test database capabilities without saving dummy data in our real database. MongoDB memory server
//provides us the ability to store data in memory only

module.exports = {
    mongodbMemoryServerOptions: {
      instance: {
        dbName: 'jest'
      },
      binary: {
        version: '4.2.1',
        skipMD5: true
      },
      autoStart: false
    }
  };