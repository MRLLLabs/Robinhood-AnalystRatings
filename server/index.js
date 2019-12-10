const express = require('express')
const app = express()
const port = 3005
const path = require('path');
const bodyParser = require('body-parser');
const Rating = require('../database/Rating.js');
const cors = require('cors');

app.use('/', express.static(path.join(__dirname, '../dist')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ratings/getData/:id', (req, res) => {
    var id = req.params.id;
    Rating.findOne({id: id}, (err, response) => {
        if (err) {
            console.log (err);
        } else {
            res.send(response)
        }
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))