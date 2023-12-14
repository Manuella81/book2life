const withAuth = require('../withAuth');

//routes permettant la gestion de la connexion par token
module.exports = (app, db)=>{
    const userModel = require('../models/UserModel')(db);

    //route de récupération des infos de l'utilisateur connecté par son token
    app.get('/api/v1/user/checkToken', withAuth, async (req, res, next)=>{
        console.log(req)
        let user = await userModel.getUserByMail(req.email); 
        console.log(user);
        if(user.code){
            res.json({status:500, err: user})
        }
        res.json({status: 200, msg: "token valide ", user: user})
    })

}