let randomId = require('random-id');
let len = 30;
let pattern = 'aA0'

module.exports = (_db)=>{
    db = _db
    return BookModel
}

class BookModel{


/****************************************************************************
***********************Récupérations des livres******************************
****************************************************************************/

    //récupération des  derniers livres
    static async getLastBooks(){
        let sql = 'SELECT `id_book`, city, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, books.creationTimestamp, `id_cat`, books.id_user, `id_bookState`, books.validate, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme` FROM `books` INNER JOIN user ON books.id_user = user.id_user WHERE books.validate = "yes" ORDER BY `creationTimestamp` DESC LIMIT 30 '
		return db.query(sql)
			.then((result)=>{
				return result
			})
			.catch((err)=>{
				return err
			})
	}


	
    //récupération des livres d'un utilisateur (id_user)
    static async getAllBookByUser(id_user){
        let sql = 'SELECT `id_book`, nickName, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, books.creationTimestamp, `id_cat`, books.id_user, `id_bookState`, books.validate FROM `books` INNER JOIN user ON books.id_user = user.id_user WHERE books.id_user = ? ORDER BY creationTimestamp DESC'
		return db.query(sql, [id_user])
			.then((result)=>{
				return result
			})
			.catch((err)=>{
				return err
			})
	}
	
    
    //récupération d'un seul livre
    static getOneBook(id_book){
        let sql = 'SELECT state,nickName,email,name, city,humourGender, tri_mangabygender.gender, age, theme, `id_book`, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, books.creationTimestamp, books.id_cat, books.id_user, books.id_bookState, books.validate, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme` FROM `books` LEFT JOIN categories ON books.id_cat= categories.id_cat LEFT JOIN tri_jeunesse ON books.id_tri_jeunesse= tri_jeunesse.id LEFT JOIN tri_humour ON books.id_tri_humour= tri_humour.id LEFT JOIN tri_mangabygender ON books.id_tri_mangaByGender= tri_mangabygender.id LEFT JOIN tri_mangabytheme ON books.id_tri_mangaByTheme= tri_mangabytheme.id LEFT JOIN user ON books.id_user = user.id_user LEFT JOIN bookstate ON books.id_bookState = bookstate.id_bookState WHERE id_book = ?'
            return db.query(sql, [id_book])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
    }
    
    //récupérartion des états des livres
    static async getAllBookState(){
        let sql = 'SELECT `id_bookState`, `state` FROM `bookstate`'
		return db.query(sql)
			.then((result)=>{
				return result
			})
			.catch((err)=>{
				return err
			})
	}

     //récupérartion des catégories
     static async getAllCategories(){
        let sql = 'SELECT `id_cat`, `name` FROM `categories`'
		return db.query(sql)
			.then((result)=>{
				return result
			})
			.catch((err)=>{
				return err
			})
	}

    //récupérartion de la sous catégorie jeunesse
    static async getAllHumourGender(){
        let sql = 'SELECT `id`, `humourGender`, `id_cat` FROM `tri_humour`  '
		return db.query(sql)
			.then((result)=>{
				return result
			})
			.catch((err)=>{
				return err
			})
	}

    //récupérartion de la sous catégorie Humour
    static async getAllAgesJeunnesse(){
        let sql = 'SELECT `id`, `age`, `id_cat` FROM `tri_jeunesse` '
		return db.query(sql)
			.then((result)=>{
				return result
			})
			.catch((err)=>{
				return err
			})
	}

    //récupérartion de la sous catégorie manga par genre
    static async getAllMangaGender(){
        let sql = 'SELECT `id`, `gender`, `id_cat` FROM `tri_mangabygender` '
		return db.query(sql)
			.then((result)=>{
				return result
			})
			.catch((err)=>{
				return err
			})
	}

    //récupérartion de la sous catégorie manga par theme
    static async getAllMangaTheme(){
        let sql = 'SELECT `id`, `theme`, `id_cat` FROM `tri_mangabytheme`  '
		return db.query(sql)
			.then((result)=>{
				return result
			})
			.catch((err)=>{
				return err
			})
	}
    
    //récupération des livres par catégorie
    static async getAllBookByCat(id_cat){
    	let sql = 'SELECT `id_book`, city, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, books.creationTimestamp, `id_cat`, books.id_user,nickName, `id_bookState`, books.validate, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme` FROM `books` INNER JOIN user ON books.id_user = user.id_user WHERE id_cat = ? AND books.validate = "yes"'
    	    return db.query(sql, [id_cat])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
	}
	
    
    //récupération des livres par sous-catégorie (tri_humour, tri_jeunesse, tri_mangaBygender, tri_mangaBytheme)
    static async getAllBookByTriHumour(id_tri){
    	let sql = 'SELECT `id_book`, city, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, books.creationTimestamp, `id_cat`, books.id_user,nickName, `id_bookState`, books.validate, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme` FROM `books` INNER JOIN user ON books.id_user = user.id_user WHERE id_tri_humour IS NOT NULL AND books.validate = "yes" AND id_tri_humour=?'
    	    return db.query(sql, [id_tri])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
	}
	
	static async getAllBookByTriJeunesse(id_tri){
    	let sql = 'SELECT `id_book`, city, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, books.creationTimestamp, `id_cat`, books.id_user,nickName, `id_bookState`, books.validate, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme` FROM `books` INNER JOIN user ON books.id_user = user.id_user WHERE `id_tri_jeunesse` = ? AND `id_tri_jeunesse` IS NOT NULL AND books.validate = "yes"'
    	    return db.query(sql, [id_tri])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
	}
	
	static async getAllBookByTriMangaGender(id_tri){
    	let sql = 'SELECT `id_book`, city, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, books.creationTimestamp, `id_cat`, books.id_user,nickName, `id_bookState`, books.validate, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme` FROM `books` INNER JOIN user ON books.id_user = user.id_user WHERE `id_tri_mangaByGender` = ? AND id_tri_mangaByGender IS NOT NULL AND books.validate = "yes"'
    	    return db.query(sql, [id_tri])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
	}
	
	static async getAllBookByTriMangaTheme(id_tri){
    	let sql = 'SELECT `id_book`, city, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, books.creationTimestamp, `id_cat`, books.id_user,nickName, `id_bookState`, books.validate, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme` FROM `books` INNER JOIN user ON books.id_user = user.id_user WHERE `id_tri_mangaByTheme` = ? AND id_tri_mangaByTheme IS NOT NULL AND books.validate = "yes"'
    	    return db.query(sql, [id_tri])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
	}
	


    //récupération des livres gratuits
    static async getAllFreeBooks(){
        let sql = 'SELECT `id_book`, city, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, books.creationTimestamp, `id_cat`, books.id_user, `id_bookState`, books.validate, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme` FROM `books` INNER JOIN user ON books.id_user = user.id_user WHERE price = 0 OR price IS NULL AND books.validate = "yes"'
		return db.query(sql)
			.then((result)=>{
				return result
			})
			.catch((err)=>{
				return err
			})
	}


	//récupération des derniers livres gratuits par catégorie
    static async getFreeBoookByCat(id_cat){
    	let sql = 'SELECT `id_book`, city, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, books.creationTimestamp, `id_cat`, books.id_user, `id_bookState`, books.validate, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme` FROM `books` INNER JOIN user ON books.id_user = user.id_user WHERE (price = 0 OR price IS NULL) AND id_cat = ? AND books.validate = "yes"'
    	    return db.query(sql, [id_cat])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
	}


    //récupération de tous les livres non validé
    static async getAllNotValidateBooks(){
        let sql = 'SELECT `id_book`, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, `creationTimestamp`, `id_cat`, `id_user`, `id_bookState`, `validate`, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme` FROM `books` WHERE validate = "no" '
		return db.query(sql)
			.then((result)=>{
				return result
			})
			.catch((err)=>{
				return err
			})
	}

    //récupération des livres dans la bdd en fonction de la recherche de mot clé
    static async getAllBookByKeyword(keyword1,keyword2, keyword3, keyword4){
    	let sql = "SELECT `id_book`, city, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, books.creationTimestamp, `id_cat`, user.id_user, `id_bookState`, books.validate, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme` FROM `books` INNER JOIN user ON books.id_user = user.id_user WHERE books.validate ='yes' AND (LOWER(title) LIKE ? OR LOWER(author) LIKE ? OR LOWER(editor) LIKE ?)"
    	    return db.query(sql, [keyword1,keyword2, keyword3, keyword4])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
	}
    
    
    //récupération des livres dans la bdd en fonction de la recherche de localisation
    static async getAllBookByLocation(location1,location2, location3){
    	let sql = "SELECT address, city, zip, `id_book`, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, books.creationTimestamp, `id_cat`, books.id_user, `id_bookState`, books.validate, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme` FROM `books` INNER JOIN user ON books.id_user = user.id_user WHERE books.validate ='yes' AND (LOWER(address) LIKE ? OR LOWER(city) LIKE ? OR zip LIKE ?) "
    	    return db.query(sql, [location1,location2, location3])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
	}

     //récupération des livres dans la bdd en fonction de la recherche de localisation et la catégorie
     static async getAllBookByLocationAndCat(location1,location2, location3, id_cat){
    	let sql = "SELECT address, city, zip, `id_book`, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, books.creationTimestamp, id_cat, books.id_user, `id_bookState`, books.validate, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme` FROM `books` INNER JOIN user ON books.id_user = user.id_user WHERE books.validate ='yes' AND (LOWER(address) LIKE ? OR LOWER(city) LIKE ? OR zip LIKE ?) AND id_cat=?"
    	    return db.query(sql, [location1,location2, location3, id_cat])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
	}


    
/****************************************************************************
***********************Actions réaliséés par un user*************************
****************************************************************************/

    
    //sauvegarde d'un seul livre
    static saveOneBook(req){
        let sql = "INSERT INTO `books`(`title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, `creationTimestamp`, `id_cat`, `id_user`, `id_bookState`, `validate`, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme`) VALUES (?,?,?,?,?,?,?,?,?,NOW(),?,?,?,'no',?,?,?,?)"
        return db.query(sql, [req.body.title, req.body.synopsis, req.body.price, req.body.photo, req.body.author, req.body.releaseDate, req.body.editor, req.body.numberOfPages, req.body.language, req.body.id_cat, req.body.id_user, req.body.id_bookState, req.body.id_tri_humour, req.body.id_tri_jeunesse, req.body.id_tri_mangaByGender, req.body.id_tri_mangaByTheme])
            .then((result)=>{
                return result
            })
            .catch((err)=>{
                return err
            })
    }
    


    //enregistrement d'un message
    static saveMessage(req){
        let sql = "INSERT INTO `messages`(buyerName, bookTitle,`contents`, email, sellerEmail, `id_book`, `id_user`, `creationTimestamp`) VALUES (?, ?, ?, ?, ?, ?,?, NOW())"
        return db.query(sql, [ req.body.buyerName, req.body.bookTitle, req.body.contents, req.body.email, req.body.sellerEmail, req.body.id_book, req.body.id_user])
            .then((result)=>{
                return result
            })
            .catch((err)=>{
                return err
            })
    }
	
    
    //modification d'un livre
    static updateOneBook(req, id_book){
        let sql = "UPDATE `books` SET `title`=?,`synopsis`=?,`price`=?,`photo`=?,`author`=?,`releaseDate`=?,`editor`=?,`numberOfPages`=?,`language`=? WHERE id_book = ?"
        return db.query(sql, [req.body.title, req.body.synopsis, req.body.price, req.body.photo, req.body.author, req.body.releaseDate, req.body.editor, req.body.numberOfPages, req.body.language, id_book])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }
    
    //suppression d'un livre
    static deleteOneBook(id_book){
        let sql = "DELETE FROM `books` WHERE id_book=?";
        return db.query(sql, [id_book])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }
    
/****************************************************************************
***********************Actions réaliséés par un admin************************
****************************************************************************/

//mise à jour du status du livre: satus validé
static async updateValidateBook(id_book){
    let sql = "UPDATE `books` SET  validate='yes' WHERE id_book = ?"
    return db.query(sql, [id_book])
    .then((response)=>{
        return response;
    })
    .catch((err)=>{
        return err;
    })
}

}

