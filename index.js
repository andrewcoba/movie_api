const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));
app.use(express.static('public'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

let topMovies = [
  {
    title: 'Django Unchained',
    director: 'Quentin Tarantino'
  },
  {
    title: 'School of Rock',
    director: 'Richard Linklater'
  },
  {
    title: 'Inception',
    director: 'Christopher Nolan'
  },
  {
    title: 'Melancholia',
    director: 'Lars Von Trier'
  },
  {
    title: 'Enemy',
    director: 'Denis Villeneuve'
  },
  {
    title: 'The Sixth Sense',
    director: 'M. Night Shyamalan'
  },
  {
    title: 'Edge of Tomorrow',
    director: 'Doug Liman'
  },
  {
    title: 'X-Men: First Class',
    director: 'Matthew Vaughn'
  },
  {
    title: 'Thor: Ragnarok',
    director: 'Taika Waititi'
  },
  {
    title: 'The Departed',
    director: 'Martin Scorsese'
  }
];

app.get('/', (req, res) => {
  res.send('These are some of my favorite movies!');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname});
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
