const express = require('express');
const router = require('./router')

const app = express();

const PORT = 8080;

app.use('/', router);

app.listen(PORT);