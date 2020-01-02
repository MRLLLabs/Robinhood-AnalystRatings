const faker = require('faker');
const fs = require('fs');
const path = require('path');

const dates = [];

let i = 1e4;

while (i) {
  dates.push(`${faker.date.recent(365).toISOString()}`);
  i -= 1;
}

fs.writeFile(
  path.resolve(__dirname, 'dates.js'),
  JSON.stringify(dates),
  err => {
    if (err) console.log(err);
  }
);
