const faker = require('faker');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const getRandomIdxInclusive = (n, x) => {
  const min = Math.ceil(n);
  const max = Math.floor(x);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const ratings = [null, 'buy', 'hold', 'sell'];
const analystsRatingsFields = 'id,analyst_id,stock_id,rating,rating_date\n';

let i = 1e8;
while (i) {
  const id = i;
  const randomAnalystId = getRandomIdxInclusive(1, 1e6);
  const randomStockId = getRandomIdxInclusive(17920338, 27920337);
  const randomRating = ratings[getRandomIdxInclusive(0, 3)];
  const randomRatingDate = moment(faker.date.recent(365)).format('YYYY-MM-DD');

  const analystRating = `${id},${randomAnalystId},${randomStockId},${randomRating},${randomRatingDate}\n`;

  fs.appendFileSync(
    path.resolve(__dirname, '..', 'analysts-ratings.csv'),
    i === 1 ? `${analystsRatingsFields}${analystRating}` : analystRating,
    err => console.log(err)
  );

  if (i % 10000 === 0) {
    console.log(i);
  }

  i -= 1;
}
