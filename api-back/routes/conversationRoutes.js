const withAuth = require('../withAuth')

/*module.exports = (app,db)=>{
    const conversationModel = require('../models/ConversationModel')(db)
	
    //routes de récupération de toutes les conversations d'un utilisateur connecté
    // Routes de récupération de toutes les conversations d'un utilisateur connecté
	app.get('/api/v1/conversations/:userId/:bookId', async (req, res, next) => {
		let userId = req.params.userId;
		let bookId = req.params.bookId;
	
		let conversations = await conversationModel.getConversations(userId, bookId);
		
		if (conversations.code) {
			res.status(500).json({ status: 500, err: conversations });
		}
		
		res.status(200).json({ status: 200, conversations: conversations });
	});

}*/

module.exports = (app,db)=>{
    const conversationModel = require('../models/ConversationModel')(db)
	
    //routes de récupération de toutes les conversations d'un utilisateur connecté
	app.get('/api/v1/conversations/:userId', withAuth, async (req, res, next) => {
		let userId = req.params.userId;
	
		let conversations = await conversationModel.getConversations(userId);
		
		if (conversations.code) {
			res.status(500).json({ status: 500, err: conversations });
		}
		
		res.status(200).json({ status: 200, conversations: conversations });
	});

	//routes de récupération d'une conversation'
	app.get('/api/v1/conversation/:conversationId', withAuth, async (req, res, next) => {
		let conversationId = req.params.conversationId;
	
		let conversation = await conversationModel.getOneConversation(conversationId);
		
		if (conversation.code) {
			res.status(500).json({ status: 500, err: conversation });
		}
		
		res.status(200).json({ status: 200, conversation: conversation });
	});


	//route de sauvegarde d'une nouvelle conversation
	app.post('/api/v1/conversation/save',withAuth, async (req, res, next) =>{
		let newConversation  = await conversationModel.saveConversation(req)
		console.log(newConversation)
		if(newConversation.code){
			res.json({status: 500, err: "Echec: la nouvelle conversation n'a pas pu être enregistré"})
		}
		res.json({status:200, msg: "Une nouvelle conversation a été enregistré !", newConversation: newConversation})
	})

	
	//route de mise à jour du champs newChat
	app.put('/api/v1/update/firstMessage/:conversationId', async (req, res, next)=>{
		let conversationId = req.params.conversationId;
		let update = await conversationModel.updateFisrtMessge(conversationId);
		console.log(update)
		if(update.code) {
			res.json({status: 500, msg: 'Un problème est survenu', error: update});
		}
		
		res.json({status: 200, msg:"Le statut de la conversation a été mis à jour"})    
	})

	app.put('/api/v1/update/false/:conversationId', async (req, res, next)=>{
		let conversationId = req.params.conversationId;
		let update = await conversationModel.updateFalse(conversationId);
		console.log(update)
		if(update.code) {
			res.json({status: 500, msg: 'Un problème est survenu', update: update, error: update});
		}
		
		res.json({status: 200, msg:"Le statut de la conversation a été mis à jour"})    
	})

	//route de suppression d'une conversation
	app.delete('/api/v1/conversation/delete/:conversationId', withAuth, async (req, res, next)=>{
		let conversationId = req.params.conversationId;

		let result = await conversationModel.deleteOneConversation(conversationId);

		if(result.code){
			res.json({status: 500, msg: "Une erreur est survenue lors de la suppression de la conversation."})
		}

		res.json({status: 200, msg: "La conversation et les messages associés ont été supprimés avec succès."})
	})



}                                                                  