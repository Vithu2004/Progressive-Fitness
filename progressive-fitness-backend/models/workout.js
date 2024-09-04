const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
    name : {type : String, required : true},
    duration : {type : Number, required : true},
    exos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exo' }], // Tableau d'ObjectIds référençant plusieurs Exo
});

module.exports = mongoose.model('Workout', workoutSchema);