const express = require('express');
const app = express();
//récupération tout le dossier pubic (css, fonts, img, js)
app.use(express.static(__dirname + '/public'));
//gestion de l'affichage des templates front (templates des mots de passe oubliés)
app.set('views', './views');
app.set('view engine', 'ejs');
//const path = require('path');
const cors = require('cors');
app.use(cors());

const fileUpload = require('express-fileupload')
app.use(fileUpload({
    createParentPath: true
}))
//on parse les url
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(__dirname+'/public'))


let config;
//on check si l'api est en ligne ou non et on décide quelle bdd on va utiliser
if(!process.env.HOST_DB){
    //nous sommes en local
    config = require("./config-exemple")
}else{
    //nous sommes en ligne
    config = require("./config")
}


const mysql = require('promise-mysql');

//appel des routes
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const bookRoutes = require('./routes/bookRoutes')
const adminAuthRoutes = require('./routes/adminAuthRoutes')
const userAuthRoutes = require('./routes/userAuthRoutes')
const conversationRoutes = require('./routes/conversationRoutes')
const messageRoutes = require('./routes/messageRoutes')

const host = process.env.HOST_DB || config.db.host;
const database = process.env.DATABASE_DB || config.db.database;
const user = process.env.USER_DB || config.db.user;
const password = process.env.PASSWORD_DB || config.db.password;
const port = process.env.PORT || config.db.port;


// connexion à notre base de donnée 
mysql.createConnection({
	host: host,
	database: database,
	user: user,
	password: password,
	port: port
}).then((db) => {
    console.log('connecté bdd');
	setInterval(async function () {
		let res = await db.query('SELECT 1');
	}, 10000);
	
	app.get('/', (req, res, next)=>{
		res.json({msg: 'Welcome to your book2life api !', status: 200})
	})

    //appel de nos routes
    userRoutes(app, db)
    adminRoutes(app, db)
    bookRoutes(app, db)
    adminAuthRoutes(app, db)
    userAuthRoutes(app, db)
    conversationRoutes(app, db)
    messageRoutes(app, db)
    
})
.catch(err=>console.log(err))

const PORT = process.env.PORT || 4000;
//const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log('Serveur en écoute sur le port ' + PORT);
});

// Configuration de Socket.IO
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:9000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('message', (datas) => {
        console.log(`Message reçu du client (${socket.id}):`, datas);
        io.emit('messageResponse', datas);
    });

    // Écoutez l'événement 'newConversation' émis par le client
    socket.on('conversation', (conversationData) => {
        console.log('New conversation created:', conversationData);

        // Vérifiez si l'expéditeur est différent de user1_id avant d'émettre l'événement
        if (conversationData.sender_id !== conversationData.user1_id) {
            // Émettez l'événement 'newConversation' uniquement à tous les clients connectés sauf le destinataire
            io.emit('newConversation', conversationData);
        }
    });

    socket.on('typing', () => {
        console.log(`User (${socket.id}) is typing...`);
        io.emit('typing', socket.id); // Émettre un événement 'typing' avec l'ID de l'utilisateur
    });

    socket.on('stopTyping', () => {
        console.log(`User (${socket.id}) stopped typing.`);
        io.emit('stopTyping', socket.id); // Émettre un événement 'stopTyping' avec l'ID de l'utilisateur
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});








