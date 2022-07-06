const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(process.env.PWD, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('form');
});

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
