const mongoose = require('mongoose');
const Rating = require('../database/Rating.js');
require('babel-polyfill');

const companyData = {
    "company" : "DuBuque, Fisher and Armstrong", 
    "buySummary" : "Odit qui enim enim accusamus numquam suscipit deleniti officiis autem. Fugit labore aut id aut qui quae sunt reiciendis. Fugit consequatur eos tempora nulla suscipit facere consequatur culpa. Earum laudantium nisi. Explicabo magnam odio esse quia. Id dolore odio adipisci quia sit minima est in.", 
    "sellSummary" : "Blanditiis sed consequatur qui quia cupiditate enim. Asperiores qui nostrum voluptas est nesciunt unde. Est explicabo quo sequi nesciunt. Dolore fugiat dolore reprehenderit. Rerum nostrum voluptatem distinctio laboriosam.", 
    "sellRating" : "48%", 
    "buyRating" : "4%", 
    "holdRating" : "19%"
};

describe('Company Model Test', () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('should insert ratings doc into collection', async () => {
        const validRating = new Rating(companyData);
        const savedRating = await validRating.save();
        expect(savedRating._id).toBeDefined();
        expect(savedRating.company).toBe(companyData.company);
        expect(savedRating.buySummary).toBe(companyData.buySummary);
        expect(savedRating.sellSummary).toBe(companyData.sellSummary);
        expect(savedRating.sellRating).toBe(companyData.sellRating);
        expect(savedRating.buyRating).toBe(companyData.buyRating);
        expect(savedRating.holdRating).toBe(companyData.holdRating);
    });

    it('insert rating data successfully, but the field does not defined in schema should be undefined', async () => {
        const ratingWithInvalidField = new Rating({ "company" : "DuBuque, Fisher and Armstrong", "description": "Blanditiis sed consequatur qui quia cupiditate enim. Asperiores qui nostrum voluptas est nesciunt unde. Est explicabo quo sequi nesciunt. Dolore fugiat dolore reprehenderit. Rerum nostrum voluptatem distinctio laboriosam." });
        const savedRatingWithInvalidField = await ratingWithInvalidField.save();
        expect(savedRatingWithInvalidField._id).toBeDefined();
        expect(savedRatingWithInvalidField.description).toBeUndefined();
    });    
})