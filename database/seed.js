const db = require('./index.js');
const Rating = require('./Rating.js');
const faker = require('faker');

var sampleData = function (){
    var companyInfo = [];
    
    for (var i = 0; i < 100; i++ ) {
        var info = {};
        info.id = i;
        info.company = faker.company.companyName();
        info.buySummary = faker.lorem.paragraph();
        info.sellSummary = faker.lorem.paragraph();
        info.sellRating = Math.round(Math.random() * (100 - 1) + 1).toString() + '%';
        info.buyRating =  Math.round(Math.random() * (100 - 1) + 1).toString() + '%';
        info.holdRating =  Math.round(Math.random() * (100 - 1) + 1).toString() + '%';
        companyInfo.push(info);
    }
    return companyInfo
    }

    var data = sampleData();

const insertSampleData = function() {
    Rating.create(data)
  };
  
  insertSampleData();