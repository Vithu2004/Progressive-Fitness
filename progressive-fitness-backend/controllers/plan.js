//Model
const Exo = require('../models/Exo');
const Workout = require('../models/Workout');
const Plan = require('../models/Plan');


exports.createPlan = (req, res, next) => {
    if (!req.body) {
        throw new Error("planData n'a pas été trouvé dans req.body");
    }

    const planData = JSON.parse(req.body.plandata); 
    // Ceci lève une erreur si planData est undefined
    delete planData._id;

    const workouts = planData.workouts;
    Workout.find()
        .then(allWorkout => {
            let workoutIds = [];
            for(let i = 0; i < workouts.length; i++){
                for(let x = 0; x < allWorkout.length; x++){
                    if(allWorkout[x].name === workouts[i]){
                        workoutIds.push(allWorkout[x]._id);
                    }
                }
            }
            const plan = new Plan({
                name : planData.name,
                description : planData.description,
                typeOfPlan : planData.typeOfPlan,
                duration : planData.duration,
                workouts : workoutIds.map(workout => workout._id),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            });
            plan.save()
                .then(() => res.status(201).json("Plan crée avec succès"))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({"erreur : " : error }));
}

exports.getPlans = (req, res, next) => {
    Plan.find()
        .then(plans => res.status(200).json(plans))
        .catch(error => res.status(400).json(error));
}

exports.getOnePlan = (req, res, next) => {
    Plan.findOne({ _id: req.params.id })
        .then(plan => {
            // Création d'un tableau de promesses pour tous les workouts
            const workoutPromises = plan.workouts.map(workoutId =>
                Workout.findOne({ _id: workoutId })
            );

            // Attente que toutes les promesses des workouts soient résolues
            Promise.all(workoutPromises)
                .then(workoutDetails => {
                    // Création d'un tableau de promesses pour les exos de chaque workout
                    const workoutPromisesExo = workoutDetails.map(workout => {
                        const exosPromises = workout.exos.map(exoId =>
                            Exo.findOne({ _id: exoId })
                        );

                        return Promise.all(exosPromises)
                            .then(exosDetail => {
                                // Ajout des exos détails au workout et suppression du champ original
                                workout._doc.exosDetail = exosDetail;
                                delete workout._doc.exos;
                                return workout;
                            });
                    });

                    // Attente que toutes les promesses des exos soient résolues
                    return Promise.all(workoutPromisesExo);
                })
                .then(workoutDetailsExo => {
                    // Suppression du champ workouts d'origine et ajout des détails
                    delete plan._doc.workouts;
                    plan._doc.workoutDetails = workoutDetailsExo;

                    // Envoi de la réponse avec le plan modifié
                    res.status(200).json(plan);
                })
                .catch(error => res.status(404).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
};
