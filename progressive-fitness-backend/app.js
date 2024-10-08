const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const userRoute = require('./routes/user');
const planRoute = require('./routes/plan');
const workoutRoute = require('./routes/workout');
const exoRoute = require('./routes/exo');

mongoose.connect('{Add Your Own URL MongoDB}',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

//Header
app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Auth
app.use('/api/auth', userRoute);
// Plan
app.use('/api/plan', planRoute);
// Workout
app.use('/api/workout', workoutRoute);
//Exo
app.use('/api/exo', exoRoute);
//Image
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
