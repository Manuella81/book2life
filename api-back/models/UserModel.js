const bcrypt = require('bcryptjs');
const saltRounds = 10;
let randomId = require('random-id');
let len = 30;
let pattern = 'aA0'
 
module.exports = (_db)=>{
    db = _db;
    return UserModel;
}

class UserModel {
    
    //route de sauvegarde d'un membre
    static async saveOneUser(req){
	    //hash du password
	    let hash = await bcrypt.hash(req.body.password, saltRounds);
	    //génération un id personnalisé
	    let key_id = randomId(len, pattern);
	    console.log(key_id)
	    
	    let sql = 'INSERT INTO `user`(`email`, `nickName`, `firstName`, `lastName`, `password`, `address`, `zip`, `city`, `lat`, `lng`, `validate`, `creationTimestamp`, `phone`, `role`, `key_id`) VALUES (?,?,?,?,?,?,?,?,?,?,"yes",NOW(),?,"user",?)'
	    
	    //sauvegarde de l'utilisateur
	    return db.query(sql, [req.body.email, req.body.nickName, req.body.firstName, req.body.lastName, hash, req.body.address, req.body.zip, req.body.city, req.body.lat, req.body.lng, req.body.phone, key_id ])
		.then((result)=>{
			//retourne l'objet de reponse reussit en lui rajoutant le key_id
			result.key_id = key_id
			return result
		}).catch((err)=>{
			return err
		})
    }
    
    
    //récupération d'un membre en fonction de son email
    static async getUserByMail(email){
    	let sql = 'SELECT `id_user`, `email`, `nickName`, `firstName`, `lastName`, `password`, `address`, `zip`, `city`, `lat`, `lng`, `validate`, `creationTimestamp`, `phone`, `role`, `key_id` FROM `user` WHERE email = ?'
	    return db.query(sql, [email])
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                return err
            })
	}

    //récupération d'un membre en fonction de son pseudo
    static async getUserByNickName(nickName){
    	let sql = 'SELECT `id_user`, `email`, `nickName`, `firstName`, `lastName`, `password`, `address`, `zip`, `city`, `lat`, `lng`, `validate`, `creationTimestamp`, `phone`, `role`, `key_id` FROM `user` WHERE nickName = ?'
	    return db.query(sql, [nickName])
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                return err
            })
	}

	//récupération d'un utilisateur par son id
    static getOneUser(id_user){
        let sql = "SELECT `id_user`, `email`, `nickName`, `firstName`, `lastName`, `password`, `address`, `zip`, `city`, `lat`, `lng`, `validate`, `creationTimestamp`, `phone`, `role`, `key_id` FROM `user` WHERE id_user = ?"
        return db.query(sql, [id_user])
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                return err
            })
    }
	
    
    //mise à jour du status du membre: satus validé
    static async updateValidateUser(key_id){
    	let sql = 'UPDATE user SET validate = "yes" WHERE key_id = ?'
		return db.query(sql, [key_id])
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                return err
            })
	}
    
    
    //mise à jour du mot passe
    static async updatepassword(newPassword, key_id){
    	let sql = 'UPDATE user SET password = ? WHERE key_id = ?'
	    //on crypte le password
	    let hash = await bcrypt.hash(newPassword, saltRounds);
		
		return db.query(sql, [hash, key_id])
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                return err
            })
	}
	
    
    
    //mise à jour du key_id en fonction de l'email du membre
    static async updateKeyId(email){
    	let sql = 'UPDATE user SET key_id = ? WHERE email = ?'
	    let key_id = randomId(len, pattern);
		let user = await db.query(sql, [key_id, email]);
		let result = {key_id: key_id, user: user}
		
		return result;
	}
	

	//modification d'un utilisateur
    static updateUser(req, id_user){
        return db.query("UPDATE user SET nickName = ?, firstName = ?, lastName = ?, address = ?, zip = ?, city = ?, phone = ? WHERE id_user = ?", [req.body.nickName, req.body.firstName, req.body.lastName, req.body.address, req.body.zip, req.body.city, req.body.phone, id_user])
            .then((response)=>{
                return response
            })
            .catch((err)=>{
                return err
            })
    }
	
	
	//récupération des livres par rapport à l'adresse rentrée par l'utilisateur
	static async getBookByPosition(req){
    	let distance = req.body.distance;     
        let sql = "SELECT `id_user`, `email`, `nickName`, `firstName`, `lastName`, `password`, `address`, `zip`, `city`, `lat`, `lng`, `validate`, `creationTimestamp`, `phone`, `role`, `key_id`, ( 6371 * acos( cos( radians(?) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(?) ) + sin( radians(?) ) * sin( radians( lat ) ) ) ) AS distance FROM user"+condition+" HAVING distance < ? ORDER BY distance";
        
        return db.query(sql, [parseFloat(req.body.lat), parseFloat(req.body.lng), parseFloat(req.body.lat), distance])
        .then((pub)=>{
            return pub;
        })
        .catch((err)=>{
            return err;
        })
	}
    
}