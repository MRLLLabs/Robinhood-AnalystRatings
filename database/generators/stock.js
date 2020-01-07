const faker = require('faker');
const Combinatorics = require('js-combinatorics');
const fs = require('fs');
const path = require('path');

const tickers = Combinatorics.baseN(
  [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ],
  5
)
  .toArray()
  .map(cmb => cmb.join(''));

const writeStocks = (writer, enc, cb) => {
  console.log('started...');
  let i = 1e7;

  const write = () => {

    let ok = true;
    do {
      i -= 1;
      const randomBuyRatingPercentage = Math.random();
      const randomSellRatingPercentage =
        Math.random() * (1 - randomBuyRatingPercentage);
      const randomHoldRatingPercentage =
        1 - (randomBuyRatingPercentage + randomSellRatingPercentage);

      const roundOffTwoDecimals = number => Math.round(number * 100) / 100;

      const stock = {
        symbol: tickers[i],
        company: faker.company.companyName(),
        description: faker.lorem.paragraph(),
        sellSummary: faker.lorem.sentences(2, '. '),
        buySummary: faker.lorem.sentences(2, '. '),
        buyRating: roundOffTwoDecimals(randomBuyRatingPercentage),
        sellRating: roundOffTwoDecimals(randomSellRatingPercentage),
        holdRating: roundOffTwoDecimals(randomHoldRatingPercentage),
      };

      // see if we should continue, or wait
      // don't pass the callback, because we're not done yet.
      if (i === 0) {
        writer.write(`${JSON.stringify(stock)}\n`, enc, cb);
      } else {
        ok = writer.write(`${JSON.stringify(stock)}\n`, enc);
      }

    } while (i && ok);

    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }

  write();
}

const stream = fs.createWriteStream(path.resolve(__dirname, '../sample_data/stocks.txt'));

writeStocks(stream, 'utf-8', () => {
  stream.end();
  console.log('fin');
})
