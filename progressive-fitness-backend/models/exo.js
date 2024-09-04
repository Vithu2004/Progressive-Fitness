const mongoose = require('mongoose');

const exoSchema = mongoose.Schema({
    name : {type : String, required : true},
    video : {type : String, required : false}
});

module.exports = mongoose.model('Exo', exoSchema);