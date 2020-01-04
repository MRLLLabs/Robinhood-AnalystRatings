/* eslint-disable no-param-reassign */
const faker = require('faker');
const { tickers } = require('./tickers');

const len = tickers.length;

module.exports = {
  generateTickerSymbol: (userContext, evt, done) => {
    const symbol = tickers[faker.random.number({ min: 0, max: len })];
    userContext.vars.symbol = symbol;

    return done();
  },
  generateRatingSummary: (userContext, evt, done) => {
    const randomBuyRatingPercentage = Math.random();
    const randomSellRatingPercentage =
      Math.random() * (1 - randomBuyRatingPercentage);
    const randomHoldRatingPercentage =
      1 - (randomBuyRatingPercentage + randomSellRatingPercentage);

    const roundOffTwoDecimals = number => Math.round(number * 100) / 100;

    userContext.vars.symbol =
      tickers[faker.random.number({ min: 0, max: len })];
    userContext.vars.company = faker.company.companyName();
    userContext.vars.description = faker.lorem.paragraph();
    userContext.vars.sellSummary = faker.lorem.paragraph(1);
    userContext.vars.buySummary = faker.lorem.paragraph(1);
    userContext.vars.buyRating = roundOffTwoDecimals(randomBuyRatingPercentage);
    userContext.vars.sellRating = roundOffTwoDecimals(
      randomSellRatingPercentage
    );
    userContext.vars.holdRating = roundOffTwoDecimals(
      randomHoldRatingPercentage
    );

    return done();
  },
};
