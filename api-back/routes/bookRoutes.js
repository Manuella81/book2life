const fs = require('fs')//va nous permettre de supprimer des images locales
const withAuth = require('../withAuth')
const withAuthAdmin = require('../withAuthAdmin')

module.exports = (app,db)=>{
    const bookModel = require('../models/BookModel')(db)
	const mail = require('../lib/mailing');
    
	
	
/****************************************************************************
***********************Récupérations des livres******************************
****************************************************************************/
	
	//route de récupération des derniers livres
    app.get('/api/v1/books/last', async (req,  res, next)=>{
    	let books = await bookModel.getLastBooks();
		
    	if(books.code) {
    		res.json({status: 500, err: books});
    	}

    	res.json({status: 200, books: books});
    })
    
    
    
    //route de récupération de tous les livres d'un utilisateur connecté
    app.get('/api/v1/booksByUser/all/:id_user', withAuth, async (req,  res, next)=>{
    	let id_user = req.params.id_user;
    	let books = await bookModel.getAllBookByUser(id_user);
		
    	if(books.code) {
    		res.json({status: 500, err: books});
    	}

    	res.json({status: 200, books: books});
    })

	//route de récupération de tous les livres d'un utilisateur déconnecté
    app.get('/api/v1/booksByUser2/all/:id_user', async (req,  res, next)=>{
    	let id_user = req.params.id_user;
    	let books = await bookModel.getAllBookByUser(id_user);
		
    	if(books.code) {
    		res.json({status: 500, err: books});
    	}

    	res.json({status: 200, books: books});
    })
    
    
    //route de récupération d'un livre par son id
	app.get('/api/v1/book/one/:id_book', async (req, res, next)=>{
		let id_book = req.params.id_book
		let book = await bookModel.getOneBook(id_book)
		if(book.code){
			res.json({status: 500, err: book})
		}
		res.json({status: 200, result: book[0]})
	})
	
	
	//route récupérartion des catégories
	app.get('/api/v1/categories/all', async (req, res, next)=>{
		let categories = await bookModel.getAllCategories()
		if(categories.code){
			res.json({status: 500, msg: "Il y'a eu un problème !", err: categories})
		}
		res.json({status:200, msg: "OK! Toutes les catégories ont été récupérées!", result:categories})
	})

	//route récupérartion des états des livres
	app.get('/api/v1/bookState/all', async (req, res, next)=>{
		let bookState = await bookModel.getAllBookState()
		if(bookState.code){
			res.json({status: 500, msg: "Il y'a eu un problème !", err: bookState})
		}
		res.json({status:200, msg: "OK! Toutes les états de livres ont été récupérées!", result:bookState})
	})


	//route récupérartion de la sous catégorie jeunesse
	app.get('/api/v1/sousCatJeunnesse', async (req, res, next)=>{
		let categories = await bookModel.getAllAgesJeunnesse()
		if(categories.code){
			res.json({status: 500, msg: "Il y'a eu un problème !", err: categories})
		}
		res.json({status:200, msg: "OK! les infos de la sous catégorie âge a été récupérées!", result:categories})
	})

	//route récupérartion de la sous catégorie Humour
	app.get('/api/v1/sousCatHumour', async (req, res, next)=>{
		let categories = await bookModel.getAllHumourGender()
		if(categories.code){
			res.json({status: 500, msg: "Il y'a eu un problème !", err: categories})
		}
		res.json({status:200, msg: "OK! les infos de la sous catégorie Humour a été récupérées!", result:categories})
	})

	//route récupérartion de la sous catégorie manga par genre
	app.get('/api/v1/sousCatMangaGender', async (req, res, next)=>{
		let categories = await bookModel.getAllMangaGender()
		if(categories.code){
			res.json({status: 500, msg: "Il y'a eu un problème !", err: categories})
		}
		res.json({status:200, msg: "OK! les infos de la sous catégorie manga par genre a été récupérées!", result:categories})
	})

	//route récupérartion de la sous catégorie manga par theme
	app.get('/api/v1/sousCatMangaTheme', async (req, res, next)=>{
		let categories = await bookModel.getAllMangaTheme()
		if(categories.code){
			res.json({status: 500, msg: "Il y'a eu un problème !", err: categories})
		}
		res.json({status:200, msg: "OK! les infos de la sous catégorie manga par theme a été récupérées!", result:categories})
	})
	
	
	//route de récupération des livres par catégorie
	app.get('/api/v1/allBooks/categorie/:id_cat', async (req, res, next)=>{
		let id_cat = req.params.id_cat
		let books = await bookModel.getAllBookByCat(id_cat)
		if(books.code){
			res.json({status: 500, err: books})
		}
		res.json({status: 200, books: books})
	})
	
	
	//route de récupération des livres par sous-catégorie (tri_humour)
	app.get('/api/v1/humour/tri/:id_tri_humour', async (req, res, next)=>{
		let id_tri = req.params.id_tri_humour
		let triHumour = await bookModel.getAllBookByTriHumour(id_tri)
		if(triHumour.code){
			res.json({status: 500, msg: "Il y'a eu un problème !", err: triHumour})
		}
		res.json({status:200, msg: "OK! Tous les livres ont été récupérées!", result:triHumour})
	})
	
	
	//route de récupération des livres par sous-catégorie (tri_jeunesse)
	app.get('/api/v1/jeunesse/tri/:id_tri_jeunesse', async (req, res, next)=>{
		let id_tri = req.params.id_tri_jeunesse
		let triJeunesse = await bookModel.getAllBookByTriJeunesse(id_tri)
		if(triJeunesse.code){
			res.json({status: 500, msg: "Il y'a eu un problème !", err: triJeunesse})
		}
		res.json({status:200, msg: "OK! Tous les livres jeunesse ont été récupérées!", result: triJeunesse})
	})
	
	
	//route de récupération des livres par sous-catégorie (tri_mangaBygender)
	app.get('/api/v1/mangaByGender/:id_tri_mangaByGender', async (req, res, next)=>{
		let id_tri = req.params.id_tri_mangaByGender
		let mangaByGender = await bookModel.getAllBookByTriMangaGender(id_tri)
		if(mangaByGender.code){
			res.json({status: 500, msg: "Il y'a eu un problème !", err: mangaByGender})
		}
		res.json({status:200, msg: "OK! Tous les mangas par genre ont été récupérées!", result:mangaByGender})
	})
	
	
	//route de récupération des livres par sous-catégorie (tri_mangaBytheme)
	app.get('/api/v1/mangaByTheme/:id_tri_mangaByTheme', async (req, res, next)=>{
		let id_tri = req.params.id_tri_mangaByTheme
		let mangaByTheme = await bookModel.getAllBookByTriMangaTheme(id_tri)
		if(mangaByTheme.code){
			res.json({status: 500, msg: "Il y'a eu un problème !", err: mangaByTheme})
		}
		res.json({status:200, msg: "OK! Tous les mangas par theme ont été récupérées!", result:mangaByTheme})
	})


	//route de récupération des livres gratuits
	app.get('/api/v1/freeBooks/all', async (req,  res, next)=>{
    	let books = await bookModel.getAllFreeBooks();
		
    	if(books.code) {
    		res.json({status: 500, err: books});
    	}

    	res.json({status: 200, books: books});
    })


	//route de récupération des livres gratuits par catégorie
	app.get('/api/v1/lastFreeBooks/categorie/:id_cat', async (req, res, next)=>{
		let id_cat = req.params.id_cat
		let books = await bookModel.getFreeBoookByCat(id_cat)
		if(books.code){
			res.json({status: 500, err: books})
		}
		res.json({status: 200, books: books})
	})


	//route de récupération de tous les livres non validé
    app.get('/api/v1/books/no/all', withAuthAdmin, async (req,  res, next)=>{
    	let books = await bookModel.getAllNotValidateBooks();
		
    	if(books.code) {
    		res.json({status: 500, err: books});
    	}

    	res.json({status: 200, books: books});
    })
	

	//route de récupération des livres dans la bdd en fonction de la recherche de mot clé
	app.get('/api/v1/keyword/:keyword', async (req, res, next)=>{
	    let keyword1 = req.params.keyword;
	    let keyword2 = req.params.keyword;
	    let keyword3 = req.params.keyword;
	    let keyword4 = req.params.keyword; 
		let books = await bookModel.getAllBookByKeyword('%'+keyword1.toLowerCase()+'%', '%'+keyword2.toLowerCase()+'%', '%'+keyword3.toLowerCase()+'%', '%'+keyword4.toLowerCase()+'%')
		if(books.code){
			res.json({status: 500, msg: "Il y'a eu un problème !", err: books})
		}
		res.json({status:200, msg: "OK! Tous les livres ont été récupérées!", result:books})
	})


	//route de récupération des livres dans la bdd en fonction de la recherche de localisation
	app.get('/api/v1/location/:location', async (req, res, next)=>{
	    let location1 = req.params.location;
	    let location2 = req.params.location;
	    let location3= req.params.location;
		let books = await bookModel.getAllBookByLocation('%'+location1.toLowerCase()+'%', '%'+location2.toLowerCase()+'%', '%'+location3.toLowerCase()+'%')
		if(books.code){
			res.json({status: 500, msg: "Il y'a eu un problème !", err: books})
		}
		res.json({status:200, msg: "OK! Tous les livres ont été récupérées!", result:books})
	})


	//route de récupération des livres dans la bdd en fonction de la recherche de localisation et la catégorie
	app.get('/api/v1/location/:location/:id_cat', async (req, res, next)=>{
	    let location1 = req.params.location;
	    let location2 = req.params.location;
	    let location3= req.params.location;
		let id_cat = req.params.id_cat
		console.log(id_cat)
		let books = await bookModel.getAllBookByLocationAndCat('%'+location1.toLowerCase()+'%', '%'+location2.toLowerCase()+'%', '%'+location3.toLowerCase()+'%', id_cat)
		if(books.code){
			res.json({status: 500, msg: "Il y'a eu un problème !", err: books})
		}
		res.json({status:200, msg: "OK! Tous les livres ont été récupérées!", result:books})
	})



/****************************************************************************
***********************Actions réaliséés par un user*************************
****************************************************************************/

	//route de sauvegarde d'un message
	app.post('/api/v1/message/save' ,withAuth, async (req, res, next) =>{
		let message = await bookModel.saveMessage(req)
		//console.log(book)
		if(message.code){
			res.json({status: 500, err: "Echec: le messgae n'a pas pu être enregistré"})
		}

		mail( 
			req.body.sellerEmail,
            `Nouveau message de ${req.body.buyerName}`, 
			`Titre de la BD: ${req.body.bookTitle}`,
			`Message: ${req.body.contents}`,
        ); 

		res.json({status:200, msg: "Le message a été enregistré !", message: message})
         
	})

	
	//route de sauvegarde d'un livre
	app.post('/api/v1/book/save', withAuth, async (req, res, next) =>{
		let book = await bookModel.saveOneBook(req)
		//console.log(book)
		if(book.code){
			res.json({status: 500, err: "Echec: le livre n'a pas pu être rajouté"})
		}
		res.json({status:200, msg: "Le livre a été enregistré !", book: book})
	})


	//route d'ajout d'une image dans l'api (cette route stock une image et retourne au front le nom de l'image stocké)
    app.post('/api/v1/book/pict', withAuth, (req, res, next)=>{
		console.log(req.files.image.name);
		//si on a pas envoyé de req.files via le front ou que cet objet ne possède aucune propriété
		if (!req.files || Object.keys(req.files).length === 0) {
			//on envoi une réponse d'erreur
			console.log({status: 400, msg: "La photo n'a pas pu être récupérée"});
	    }
	    
	    //la fonction mv va envoyer l'image dans le dossier images.
	    req.files.image.mv('public/images/'+req.files.image.name, function(err) {
	    	console.log('ça passe', '/public/images/'+req.files.image.name)
	    	//si il y a une erreur
		    if (err) {
		    //renvoi d'un message d'erreur
			console.log({status: 500, msg: "La photo n'a pas pu être enregistrée"})
		    }
		 });
	   //si c'est ok on retourne un json avec le nom de la photo vers le front
	   res.json({status: 200, msg: "image bien enregistré!", url: req.files.image.name})
    })

	
	//route de modification d'un livre
	app.put('/api/v1/book/update/:id_book',withAuth,async (req, res, next)=>{
		let id_book = req.params.id_book;
		let result = await bookModel.updateOneBook(req, id_book);
		console.log(result)
		if(result.code){
			res.json({status: 500, msg: "Un problème est survenu"})
		}

		res.json({status: 200, msg: "le livre a bien été modifié"})
	})


	//route de suppression d'un livre par un utilisateur
	app.delete('/api/v1/book/delete/:id_book', withAuth, async (req, res, next)=>{
		let id_book = req.params.id_book;

		let result = await bookModel.deleteOneBook(id_book);

		if(result.code){
			res.json({status: 500, msg: "Un problème est survenu"})
		}

		res.json({status: 200, msg: "le livre a bien été supprimé"})
	})



/****************************************************************************
***********************Actions réaliséés par un admin************************
****************************************************************************/

	//route de validation d'un livre (par son id_book). C'est l'admin qui validera le livre dans son espace administrateur
    app.put('/api/v1/book/validate/:id_book', async (req, res, next)=>{
        let id_book = req.params.id_book;
        //validation de l'enregistrement du nouveau livre. La colonne validate de la bdd passe de no (par défaut) à yes. Le livre sera donc visible sur la page web
        let validate = await bookModel.updateValidateBook(id_book);
		console.log(validate)
        if(validate.code) {
            res.json({status: 500, msg: 'Un problème est survenu', error: validate});
        }
        
        res.json({status: 200, msg:"Le livre a été validé"})
    
    })

	
	//route de suppression d'un livre par un administrateur
	app.delete('/api/v1/book/adminDelete/:id_book', withAuthAdmin, async (req, res, next)=>{
		let id_book = req.params.id_book;

		let result = await bookModel.deleteOneBook(id_book);

		if(result.code){
			res.json({status: 500, msg: "Un problème est survenu"})
		}

		res.json({status: 200, msg: "le livre a bien été supprimé"})
	})


	
	
	
	
	
}