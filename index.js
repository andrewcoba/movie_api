const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let users = [
  {
    username: 'peterson',
    password: 'mr.peter',
    email: 'peterson@gmail.com',
    favorites: [
      'The Dark Knight',
      'Thor: Ragnarok',
      'Interstellar'
    ]
  }
];

let movies = [
  {
    title: 'Interstellar',
    year: '2014',
    genre: 'science fiction drama',
    director: {
      name: 'Christopher Nolan',
      birth: '1970',
      death: '-',
    },
    actors: [
      'Matthew McConaughey',
      'Jessica Chastain'
    ]
  }
];

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('These are some of my favorite movies!');
});

//Returns all movies in database in json format
app.get('/movies', (req, res) => {
  res.json(movies);
});

//Returns a specific movie in json format
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) => {
    return movie.title === req.params.title
  }));
});

//Returns a list of all movies within a certain genre in json format
app.get('/movies/genres/:genre', (req, res) => {
  const genre = movies.find((movie) => movie.genre.name === req.params.genre).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(404).send('Genre not found.');
  }
});

//Returns info about a specific director in json format
app.get('/movies/directors/:name', (req, res) => {
  const director = movies.find((movie) => movie.director.name === req.params.name).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(404).send('Director not found.')
  }
});

//Creates a new user
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.username) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    const message = 'No username in request body';
    res.status(400).send(message);
  }
});

//Updates username
app.put('/users/:username', (req, res) => {
  const newUsername = req.body;
  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    user.username = newUsername.username;
    res.status(201).json(user)
  } else {
    res.status(404).send('User not found.')
  };
});

//Adds a movie to a user's favorites list
app.post('/users/:username/:movie', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    user.favorites.push(req.params.movie);
    res.status(200).send(req.params.movie + ' was added to ' + user.username + " 's favorites list.");
  } else {
    res.status(404).send('User not found.');
  };
});

//Removies a movie from favorites list
app.delete('/users/:username/:movie', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    user.favorites = user.favorites.filter((mov) => { return mov !== req.params.movie });
    res.status(200).send(req.params.movie + ' was removied from ' + user.username + " 's favorites list.");
  } else {
    res.status(404).send('User not found.')
  };
});

//Deletes user profile
app.delete('/users/:username', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    users = users.filter((user) => { return user.username !== req.params.username });
    res.status(201).send(req.params.username + ' was deleted.');
  } else {
    res.status(404).send('User not found.')
  }
})

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8081, () => {
  console.log('Your app is listening on port 8081');
});
