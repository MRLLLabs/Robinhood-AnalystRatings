DROP DATABASE IF EXISTS robinhood_db;
CREATE DATABASE robinhood_db;

\c robinhood_db;

DROP TABLE IF EXISTS analysts;
CREATE TABLE "analysts" (
  "id" INT,
  "name" text,
  PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS stocks;
CREATE TABLE "stocks" (
  "symbol" varchar(5),
  "company" text,
  "description" text,
  "sell_summary" text,
  "buy_summary" text,
  "buyRating" numeric(3, 2) DEFAULT NULL,
  "sellRating" numeric(3, 2) DEFAULT NULL,
  "holdRating" numeric(3, 2) DEFAULT NULL,
  PRIMARY KEY ("symbol")
);

DROP TABLE IF EXISTS analyst_ratings;
CREATE TABLE "analyst_ratings" (
  "id" int NOT NULL,
  "analysts_id" int REFERENCES analysts(id) ON DELETE CASCADE, 
  "stocks_symbol" varchar(5) REFERENCES stocks(symbol) ON DELETE CASCADE,
  "rating" text,
  "rating_date" DATE NOT NULL DEFAULT CURRENT_DATE,
  PRIMARY KEY ("id")
);

CREATE INDEX "FK" ON  "analyst_ratings" ("analysts_id", "stocks_symbol");