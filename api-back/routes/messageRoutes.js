const withAuth = require('../withAuth')

module.exports = (app,db)=>{
    const messageModel = require('../models/MessageModel')(db)
	
    //routes de récupération des messages d'une conversation d'un utilisateur connecté
    app.get('/api/v1/messages/:conversationId',withAuth, async (req,  res, next)=>{
    	let conversationId = req.params.conversationId;
    	let messages = await messageModel.getMessages(conversationId);
		
    	if(messages.code) {
    		res.json({status: 500, err: messages});
    	}

    	res.json({status: 200, messages: messages});
    })

    //route de sauvegarde des messages envoyé par un user 
	app.post('/api/v1/messages', async (req, res, next) =>{
		let newMessage  = await messageModel.createMessage(req)
		console.log(newMessage)
		if(newMessage.code){
			res.json({status: 500, err: "Echec: le message n'a pas pu être enregistré"})
		}
		res.json({status:200, msg: "Le message a été enregistré !", newMessage: newMessage})
	})

}