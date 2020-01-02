const fs = require('fs');
const path = require('path');
const moment = require('moment');
const faker = require('faker');

const getRandomIdxInclusive = (n, x) => {
  const min = Math.ceil(n);
  const max = Math.floor(x);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const ratings = ['buy', 'hold', 'sell'];

let chunk = 1;
let i = 1e8;
while (i) {
  const id = i;
  const randomAnalystId = getRandomIdxInclusive(1, 1e6);
  const randomStockId = getRandomIdxInclusive(17920338, 27920337);
  const randomRating = ratings[getRandomIdxInclusive(0, 2)];
  const randomRatingDate = moment(faker.date.recent(365)).format('YYYY-MM-DD');

  /* Tab delimited row */
  const analystRating = `${id}\t${randomAnalystId}\t${randomStockId}\t${randomRating}\t${randomRatingDate}\n`;

  fs.appendFileSync(
    path.resolve(__dirname, '..', `sample_data/analysts-ratings-${chunk}.txt`),
    analystRating,
    err => console.log(err)
  );

  i -= 1;

  if (i % 1e7 === 0) {
    console.log(`Chunk ${chunk} complete`);
    chunk += 1;
  }
}
