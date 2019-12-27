const fs = require('fs');
const path = require('path');
const moment = require('moment');
const dates = require('./dates');

const getRandomIdxInclusive = (n, x) => {
  const min = Math.ceil(n);
  const max = Math.floor(x);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const ratings = [null, 'buy', 'hold', 'sell'];
const analystsRatingsFields = 'id,analyst_id,stock_id,rating,rating_date\n';

fs.writeFileSync(
  path.resolve(__dirname, '..', 'analysts-ratings.csv'),
  analystsRatingsFields,
  err => console.log(err)
);

const datesCount = dates.length;

let i = 1e8;
while (i) {
  const id = i;
  const randomAnalystId = getRandomIdxInclusive(1, 1e6);
  const randomStockId = getRandomIdxInclusive(17920338, 27920337);
  const randomRating = ratings[getRandomIdxInclusive(0, 3)];
  const randomRatingDate = moment(
    dates[getRandomIdxInclusive(0, datesCount)]
  ).format('YYYY-MM-DD');

  /* CSV */
  const analystRating = `${id},${randomAnalystId},${randomStockId},${randomRating},${randomRatingDate}\n`;

  fs.appendFileSync(
    path.resolve(__dirname, '..', 'analysts-ratings.csv'),
    analystRating,
    err => console.log(err)
  );

  if (i % 10000 === 0 || i < 10000) {
    console.log(i);
  }

  i -= 1;
}
