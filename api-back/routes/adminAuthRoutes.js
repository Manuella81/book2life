const withAuthAdmin = require('../withAuthAdmin');

//routes permettant la gestion de la connexion par token
module.exports = (app, db)=>{
    const adminModel = require('../models/AdminModel')(db);

    //route de récupération des infos de l'administrateur connecté par son token
   app.get('/api/v1/admin/checkToken', withAuthAdmin, async (req, res, next)=>{
        console.log(req)
        let admin = await adminModel.getAdminByMail(req.email); 
        console.log(admin);
        if(admin.code){
            res.json({status:500, err: admin})
        }
        res.json({status: 200, msg: "token valide ", admin: admin})
    })

}

