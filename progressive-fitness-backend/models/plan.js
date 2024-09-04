const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    name : {type : String, required : true},
    description : {type : String, required : true},
    typeOfPlan : {type : String, required : true},
    duration : { type : String, required : true},
    imageUrl : {type : String, required : true},
    workouts : [{ type : mongoose.Schema.Types.ObjectId, ref : 'Workout'}]
});

module.exports = mongoose.model('Plan', planSchema);