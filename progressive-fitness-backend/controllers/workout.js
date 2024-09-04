const Exo = require('../models/Exo');
const Workout = require('../models/Workout');

exports.createWorkout = (req, res, next) => {
    const exos = req.body.workout.exos;
    //Permet de rechercher les exercices avec le nom, on selectionne ensuite l'id des exos

    Exo.find()
        .then(allExo => {
            let exoIds = [];
            for(let i = 0; i < exos.length; i++){
                for(let x = 0; x < allExo.length; x++){
                    if(allExo[x].name === exos[i]){
                        exoIds.push(allExo[x]._id);
                    }
                }
            }
            const workout = new Workout({
                name : req.body.workout.name,
                duration : req.body.workout.duration,
                exos : exoIds.map(exo => exo._id)
            });

            workout.save()
                .then(() => res.status(201).json("Workout crée avec succès"))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({"erreur : " : error }));
}

exports.getOneWorkout = (req, res, next) =>{
    Workout.findOne({_id : req.params.id})
        .then(workout => res.status(200).json(workout))
        .catch(error => res.status(404).json(error));
}