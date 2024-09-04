const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'fy8v1QmEFKJD8Oad5SWVKvMQzzJhRRfwaz5lHRWgQVfwmR0FP3SjK3byQ5LsZGgX');
        const userId = decodedToken.userId;
        req.auth = {
            userId : userId
        };
        console.log("Passe ici connexion réussi");
        next();
    } catch(error){
        console.log("Passe ici connexion raté");
        res.status(401).json({error});
    }
};