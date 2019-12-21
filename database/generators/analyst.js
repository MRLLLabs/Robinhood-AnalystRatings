const faker = require('faker');
const fs = require('fs');
const path = require('path');

const analysts = [];

for (let i = 1; i <= 1e6; i += 1) {
  const analyst = {
    id: i,
    fullName: faker.name.findName(),
  };

  analysts.push(analyst);
}

fs.writeFile(path.resolve(__dirname, '..', 'analysts.json'),
  JSON.stringify(analysts),
  (err) => console.log(err));
