const faker = require('faker');
const Combinatorics = require('js-combinatorics');
const fs = require('fs');
const path = require('path');

const stocks = [];
const tickers = Combinatorics.baseN(
  [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ], 5,
)
  .toArray()
  .map((cmb) => cmb.join(''));

for (let i = 0; i < 1e7; i += 1) {
  const randomBuyRatingPercentage = Math.random();
  const randomSellRatingPercentage = Math.random() * (1 - randomBuyRatingPercentage);
  const randomHoldRatingPercentage = 1 - (randomBuyRatingPercentage + randomSellRatingPercentage);

  const roundOffTwoDecimals = (number) => Math.round(number * 100) / 100;

  const stock = {
    symbol: tickers[i],
    company: faker.company.companyName(),
    description: faker.lorem.paragraph(),
    sellSummary: faker.lorem.paragraph(2),
    buySummary: faker.lorem.paragraph(2),
    buyRating: roundOffTwoDecimals(randomBuyRatingPercentage),
    sellRating: roundOffTwoDecimals(randomSellRatingPercentage),
    holdRating: roundOffTwoDecimals(randomHoldRatingPercentage),
  };

  stocks.push(stock);
}

fs.writeFile(path.resolve(__dirname, '..', 'stocks.json'),
  JSON.stringify(stocks),
  (err) => console.log(err));
