const Exo = require('../models/Exo');

exports.createExo = (req, res, next) => {
    console.log("Salit");
    console.log(req.body);
    const exo = new Exo({
        name : req.body.exo.name,
        video : req.body.exo.video
    });
    exo.save()
        .then(() => res.status(201).json({ message : "Création réussi" }))
        .catch(error => res.status(400).json({error}));
}