const faker = require('faker');
const Combinatorics = require('js-combinatorics');
const fs = require('fs');
const path = require('path');

const getRandomIdxInclusive = (n, x) => {
  const min = Math.ceil(n);
  const max = Math.floor(x);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const tickers = Combinatorics.baseN(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'], 6)
  .toArray()
  .map((cmb) => cmb.join(''));

const ratings = [null, 'buy', 'hold', 'sell'];
const analystsRatings = [];

for (let i = 0; i < 1e8; i += 1) {
  const analyst = getRandomIdxInclusive(0, 50);
  const tickersLength = tickers.length - 1;
  const randomTickerIdx = getRandomIdxInclusive(0, tickersLength);
  const randomRatingsIdx = getRandomIdxInclusive(0, 3);
  const analystRating = {
    id: i,
    analyst_id: analyst,
    stock_symbol: tickers[randomTickerIdx],
    rating: ratings[randomRatingsIdx],
    rating_date: faker.date.recent(365),
  };

  analystsRatings.push(analystRating);
}

fs.writeFile(path.resolve(__dirname, '..', 'analysts-ratings.json'),
  JSON.stringify(analystsRatings),
  (err) => console.log(err));
