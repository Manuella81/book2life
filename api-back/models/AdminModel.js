const bcrypt = require('bcryptjs');
const saltRounds = 10;
let randomId = require('random-id');
let len = 30;
let pattern = 'aA0'
 
module.exports = (_db)=>{
    db = _db;
    return AdminModel;
}

class AdminModel {


    //sauvegarde d'un administrateur
    static async saveOneAdmin(){
	    //on hash le password
	    let firstname = ""
        let lastname = ""
        let email = ""
        let password = ""
        let hash = await bcrypt.hash(password, saltRounds);
        
	    //on génère un id personalisé
	    let key_id = randomId(len, pattern);
	    console.log(key_id)
	    
	    let sql = 'SELECT `id_admin`, `firstname`, `lastname`, `email`, `password`, `key_id`, `creationTimestamp` FROM `admin` WHERE email = ?'
	    
	    let sql2 = 'INSERT INTO `admin`(`firstname`, `lastname`, `email`, `password`, `key_id`, `creationTimestamp`) VALUES (?,?,?,?,?,NOW())'
	    
	    let admin = await db.query(sql, [email]);
	    
	    if(admin.length > 0) {
			return {status: 501, msg: "email déjà utilisé"}
		}
	    //on sauvegarde l'administrateur
	    return db.query(sql2, [ firstname, lastname, email, hash, key_id ])
		.then((result)=>{
			//retourne l'objet de reponse reussit en lui rajoutant le key_id
			result.key_id = key_id
			return result
		}).catch((err)=>{
			return err
		})
    }

    //récupération d'un administrateur en fonction de son mail
    static async getAdminByMail(email){
    	let sql = 'SELECT `id_admin`, `firstname`, `lastname`, `email`, `password`, `key_id`, `creationTimestamp` FROM `admin` WHERE email = ?'
	    return db.query(sql, [email])
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                return err
            })
	}
	
	
	//récupération d'un admin par son id
    static getOneAdmin(id_admin){
        let sql = "SELECT `id_admin`, `firstname`, `lastname`, `email`, `password`, `key_id`, `creationTimestamp` FROM `admin` WHERE id_admin = ?"
        return db.query(sql, [id_admin])
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                return err
            })
    }
    
    
    //récupération de tous les admin
    static getAllAdmin(){
        let sql = "SELECT `id_admin`, `firstname`, `lastname`, `email`, `password`, `key_id`, `creationTimestamp` FROM `admin` "
        return db.query(sql)
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                return err
            })
    }
    

    //mise à jour du mot de passe
    static async updatepassword(newPassword, key_id){
    	let sql = 'UPDATE admin SET password = ? WHERE key_id = ?'
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

    //mise à jour du key_id en fonction de l'email
    static async updateKeyId(email){
    	let sql = 'UPDATE admin SET key_id = ? WHERE email = ?'
	    let key_id = randomId(len, pattern);
		let admin = await db.query(sql, [key_id, email]);
		let result = {key_id: key_id, admin: admin}
		
		return result;
	    
	}
    
}