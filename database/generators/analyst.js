const faker = require('faker');
const fs = require('fs');
const path = require('path');

let analysts = '';

for (let i = 1; i <= 1e6; i += 1) {
  const analyst = {
    id: i,
    fullName: faker.name.findName(),
  };

  analysts += `${JSON.stringify(analyst)}\n`;
}

fs.writeFile(path.resolve(__dirname, '..', 'analysts.json'), analysts, err =>
  console.log(err)
);
