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
const withAuth = require('../withAuth');


module.exports = (app, db)=>{
    const userModel = require('../models/UserModel')(db);


    //route de récupération d'un utilisateur par son id
    app.get('/api/v1/user/one/:id_user', async (req,  res, next)=>{
        let id_user = req.params.id_user;
    	let user = await userModel.getOneUser(id_user);
		
    	if(user.code) {
    		res.json({status: 500, err: user});
    	}

    	res.json({status: 200, user: user});
    })


    
    //route d'ajout d'un utilisateur
    app.post('/api/v1/user/add', async (req,  res, next)=>{
         //vérifier si le mail existe déjà dans la bdd sinon on le refoule
         let check = await userModel.getUserByMail(req.body.email)
         let checkNickName = await userModel.getUserByNickName(req.body.nickName)
        
         if(check.code){
             res.json({status: 500, msg: "Erreur vérification email.", err: check})
         }

         if(checkNickName.code){
            res.json({status: 500, msg: "Erreur vérification pseudo.", err: check})
        }
         
         if(check.length > 0 ){
             if(check[0].email === req.body.email){
                 res.json({status: 401, msg: "Email déjà utilisé"})
             }
         }else if(checkNickName.length > 0){
            if(checkNickName[0].nickName === req.body.nickName){
               res.json({status: 401, msg: "Pseudo déjà utilisé"})
           } 
        }
         else {
         
             //ensuite on enregistre le nouvel utilisateur
             let user = await userModel.saveOneUser(req)
             
             if(user.code){
                 res.json({status: 500, msg: "Il y'a eu un problème !", err: user})
             }

            //envoi d'un mail (avec un lien a qui pointe vers la route api de validation par le key_id)
            mail(
                req.body.email, 
                "validation de votre compte", 
                "Bienvenu sur Book2life", 
                'Pour valider votre mail, cliquez <a href="http://localhost:3000//api/v1/user/validate/'+user.key_id+'">ici<a/> !'
            )
             res.json({status:200, msg: "L'utilisateur a bien été enregistré !"})
         
         }
    
    })
    
    
    //route de validation d'un utilisateur (par son key_id). L'utilisateur reçoit un mail afin de valider son compte
    app.get('/api/v1/user/validate/:key_id', async (req, res, next)=>{
        let key_id = req.params.key_id;
        //validation de l'enregistrement du nouvel utilisateur. La colonne validate de la bdd passe de no (par défaut) à yes 
        let validate = await userModel.updateValidateUser(key_id);
        if(validate.code) {
            res.json({status: 500, msg: 'Un problème est survenu', error: validate});
        }
        
        res.json({status: 200, msg:"compte utilisateur validé"})
    
    })
    
    
    //route de demande de récupération de mot de pass oublié
    app.post('/api/v1/user/forgot', async (req, res, next)=>{
        //récupération l'email de l'utilisateur qui a oublié son mot de passe afin de pouvoir modifier son key_id
        let result = await userModel.updateKeyId(req.body.email);
         
        if(result.code) {
             res.json({status: 500, msg: "Nous n'avons pas pu envoyer un email", error: result});
         }
         //on récupère le nouvel key_id
         let key_id = result.key_id;
         mail(
            req.body.email, 
            "Changement de mot de passe", 
            "Mot de passe oublié ?", 
            'Pour modifier votre mot de passe, cliquez <a href="http://localhost:8080/api/v1/user/changePassword/'+key_id+'">ici<a/> !'
        );
         
         res.json({status: 200, msg: "email envoyé"})
        
    })
    
    
    //route d'affichage du template de modification de password 
    app.get('/api/v1/user/changePassword/:key_id', async (req, res, next)=>{
        let key_id = req.params.key_id;
        
        res.render('forgotUser', {key_id: key_id, error: null})
    })
    
    
    //route de modification du mot de passe
     app.post('/api/v1/user/changePassword/:key_id', async (req, res, next)=>{
        let key_id = req.params.key_id;
        let error = null
        if(req.body.password1 !== req.body.password2) {
            error = "Vos deux mots de passe ne sont pas identique !";
        } else {
            let result = await userModel.updatepassword(req.body.password1, key_id);
            if(result.code) {
                error = "Erreur: le mot de passe n'a pas pu être modifié !"
            } else {
                error = "le mot de passe a bien été modifié !"
            }
        }
        
        res.render('forgotUser', {key_id: key_id, error: error})
        
    })
    
    
    //route de login
    app.post('/api/v1/user/login', async (req,  res, next)=>{
        let user = await userModel.getUserByMail(req.body.email);
        //si l'email n'existe pas dans la bdd on affiche un message d'erreur
        if(user.length === 0) {
            res.json({status: 404, msg: "Email inexistant dans la base de donnée"})
        } else {
            //ni la colonne validate est égale à "no" on affiche un message d'erreur
            if(user[0].validate === "no") {
                res.json({status: 403, msg: "Votre compte n'est pas validé"})
            }
            
            let same = await bcrypt.compare(req.body.password, user[0].password);
            //si les 2 mots de passe sont identique on connecte l'utilisateur et on crée un token
            if(same) {
    
                let infos = {id: user[0].id_user, email: user[0].email}
                let token = jwt.sign(infos, secret);
                console.log("token user", token)
                res.json({status: 200, msg: "Vous ête connecté !", token: token, user: user[0]})
                
            } else {
                res.json({status: 401, msg: "Mot de passe éronné !"})
            }
            
        }
        
    })
    

     //route de modification d'un utilisateur
     app.put('/api/v1/user/update/:id_user', withAuth, async (req, res, next)=>{
        let id_user = req.params.id_user
        
        let user = await userModel.updateUser(req, id_user)
        
        if(user.code){
            res.json({status: 500, msg: "Problème rencontré lors de la modification!", err: user})
        }
        
        //mon profil est modifié je renvoi les infos de profil mis à jour vers le front
        let newUser = await userModel.getOneUser(id_user)
        
        if(newUser.code){
            res.json({status: 500, msg: "Problème rencontré lors de la modification!", err: newUser})
        }
        
        res.json({status: 200, result: user, newUser: newUser[0]})
    })
    

}