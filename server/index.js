const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const bodyParser = require('body-parser');

app.use('/', express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))