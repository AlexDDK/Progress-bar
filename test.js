const express = require('express');

const app = express();
require('dotenv').config();
const path = require('path');
const router = require('express').Router();

app.set('view engine', 'hbs');
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/', indexRouter)

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('Server has been started on port 3000'));
