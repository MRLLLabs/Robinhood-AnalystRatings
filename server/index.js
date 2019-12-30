const express = require('express');

const app = express();
const port = process.env.PORT;
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const Rating = require('../database/Rating.js');

app.use('/', express.static(path.join(__dirname, '../dist')));
app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ratings/getData', (req, res) => {
  const id = req.query.id ? req.query.id : '1';
  Rating.findOne({ id }, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      res.send(response);
    }
  });
});

app.post('/ratings/', (req, res) => {
  const newRating = new Rating(req.body);
  newRating.save((err) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(201).send(newRating);
  });
});

app.put('/ratings/:id', (req, res) => {
  Rating.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }, // return the updated version
    (err, rating) => {
      if (err) {
        return res.status(404).send(err);
      }
      return res.send(rating);
    },
  );
});

app.delete('/ratings/:id', (req, res) => {
  Rating.findByIdAndRemove(req.params.id, (err, rating) => {
    if (err) {
      return res.status(400).send(err);
    }
    const response = {
      message: 'rating successfully deleted',
      // eslint-disable-next-line no-underscore-dangle
      id: rating._id,
    };
    return res.status(200).send(response);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
