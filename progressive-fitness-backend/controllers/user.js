const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Inscription 
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 15)
        .then(hash => {
            delete req.body.password;
            const user = new User({
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                currentPlan : req.body.currentPlan
            });
            user.save()
                .then(() => res.status(201).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'fy8v1QmEFKJD8Oad5SWVKvMQzzJhRRfwaz5lHRWgQVfwmR0FP3SjK3byQ5LsZGgX'
                    )
                }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Connexion
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire Identifiant / Mot de Passe incorrecte' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ message: 'Paire Identifiant / Mot de Passe incorrecte' });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    'fy8v1QmEFKJD8Oad5SWVKvMQzzJhRRfwaz5lHRWgQVfwmR0FP3SjK3byQ5LsZGgX'
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};

// exports.updateUser = (req, res, next) =>{
//     User.updateOne({_id : req.auth.userId}, 
//         {
//             ...req.body,
//             _id : req.auth.userId
//          })
//         .then(() => res.status(200).json({message : "Modifié avec succes"}))
//         .catch(() => res.status(400).json({error}));
// }