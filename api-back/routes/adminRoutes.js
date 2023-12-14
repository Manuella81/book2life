//la bibliothèque bcryptjs permet de hasher les password
const bcrypt = require('bcryptjs');
const saltRounds = 10;
//librairie qui va générer un token de connexion
const jwt = require('jsonwebtoken');
//import des configurations aux bdd
let config
if(!process.env.HOST_DB) {
    config = require('../config')
}else {
    config = require('../config-exemple')
}

let secret = process.env.TOKEN_SECRET || config.token.secret;
const mail = require('../lib/mailing');
const withAuthAdmin = require('../withAuthAdmin');


module.exports = (app, db)=>{
    const adminModel = require('../models/AdminModel')(db);
    
    //route d'ajout d'un administrateur
    app.post('/api/v1/admin/add', async (req,  res, next)=>{
        //sauvegarde d'un administrateur 
        let result = await adminModel.saveOneAdmin(req);
        
        if(result.code) {
            res.json({status: 500, err: result})
        }

        if(result.status === 501 ) {
            res.json(result)        
        }
                
        res.json({status: 200, msg: "Administrateur enregistré"})
    
    })
    
    
    //route de demande de récupération de mot de pass oublié
    app.post('/api/v1/admin/forgot', async (req, res, next)=>{
        //récupération l'email de l'administrateur qui a oublié son mot de passe afin de pouvoir modifier son key_id
        let result = await adminModel.updateKeyId(req.body.email);
         
        if(result.code) {
             res.json({status: 500, msg: "Nous n'avons pas pu envoyer un email", error: result});
         }
         //on récupère le nouvel key_id
         let key_id = result.key_id;
         mail(
            req.body.email, 
            "Changement de mot de passe", 
            "Mot de passe oublié ?", 
            'Pour modifier votre mot de passe, cliquez <a href="http://manuellamaya.sites.3wa.io:9500/api/v1/user/changePassword/'+key_id+'">ici<a/> !'
            );
         
         res.json({status: 200, msg: "email envoyé"})
        
    })
    
    
    //route d'affichage du template de modification de password 
    app.get('/api/v1/admin/changePassword/:key_id', async (req, res, next)=>{
        let key_id = req.params.key_id;
        
        res.render('forgotAdmin', {key_id: key_id, error: null})
    })
    
    
    //route de modification du mot de passe
     app.post('/api/v1/admin/changePassword/:key_id', async (req, res, next)=>{
        let key_id = req.params.key_id;
        let error = null
        if(req.body.password1 !== req.body.password2) {
            error = "Vos deux mots de passe ne sont pas identique !";
        } else {
            let result = await adminModel.updatepassword(req.body.password1, key_id);
            if(result.code) {
                error = "Erreur: le mot de passe n'a pas pu être modifié !"
            } else {
                error = "le mot de passe a bien été modifié !"
            }
        }
        
        res.render('forgotAdmin', {key_id: key_id, error: error})
        
    })
    
    
    //route de login
    app.post('/api/v1/admin/login', async (req,  res, next)=>{
        let admin = await adminModel.getAdminByMail(req.body.email);
        //si l'email n'existe pas dans la bdd on affiche un message d'erreur
        if(admin.length === 0) {
            res.json({status: 404, msg: "Email inexistant dans la base de donnée"})
        } else {
            let same = await bcrypt.compare(req.body.password, admin[0].password);
            //si les 2 mots de passe sont identique on connecte l'adminisrateur et on crée un token
            if(same) {
                let infos = {id: admin[0].id_admin, email: admin[0].email}
                let token = jwt.sign(infos, secret);
                console.log("token admin", token)
                res.json({status: 200, msg: "Vous ête connecté !", token: token, admin: admin[0]})
                
            } else {
                res.json({status: 401, msg: "Mot de passe éronné !"})
            }
            
        }
        
    })
    
    
}