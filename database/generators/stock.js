const faker = require('faker');
const Combinatorics = require('js-combinatorics');
const fs = require('fs');
const path = require('path');

const stocks = [];
const tickers = Combinatorics.baseN(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'], 6)
                  .toArray()
                  .map((cmb) => cmb.join(''));

for (var i = 0; i < 1e7; i += 1) {
  const stock = {
    symbol: tickers[i],
    company: faker.company.companyName(),
    description: faker.lorem.paragraph(),
    sellSummary: faker.lorem.paragraph(2),
    buySummary: faker.lorem.paragraph(2),
  }

  stocks.push(stock);
}

fs.writeFile(path.resolve(__dirname, '..', 'stocks.json'),
  JSON.stringify(stocks),
  (err) => console.log(err)
);

