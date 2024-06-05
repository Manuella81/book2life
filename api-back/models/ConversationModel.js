module.exports = (_db)=>{
    db = _db
    return ConversationModel
}

/*class ConversationModel {
    //récupération des conversations d'un utilisateur
    static getConversations(userId, bookId){
        let sql = 'SELECT * FROM conversations WHERE (user1_id = ? OR user2_id = ?) AND id_book = ?';
            return db.query(sql, [userId, userId, bookId])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
    }
}*/

class ConversationModel {
    //récupération des conversations d'un utilisateur
    static getConversations(userId){
        let sql = 'SELECT * FROM conversations WHERE user1_id = ? OR user2_id = ? ';
            return db.query(sql, [userId, userId])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
    }

    //récupération d'une conversation
    static getOneConversation(conversationId){
        let sql = 'SELECT * FROM conversations WHERE id = ? ';
            return db.query(sql, [conversationId])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
    }

    //suavegarde d'une nouvelle conversation
    static saveConversation(req){
        let sql = "INSERT INTO conversations(user1_id, user2_id, user2_nickname, user1_nickname, id_book, bookTitle, newChat) VALUES (?, ?, ?, ?, ?, ?, 'true')"
        return db.query(sql, [ req.body.user1_id, req.body.user2_id, req.body.user2_nickname, req.body.user1_nickname, req.body.id_book,req.body.bookTitle, req.body.newChat])
            .then((result)=>{
                return result
            })
            .catch((err)=>{
                return err
            })
    }

    //mise à jour du champs newChat
    static async updateFisrtMessge (conversationId){
        let sql = "UPDATE `conversations` SET `newChat`= 'true' WHERE id = ?"
        return db.query(sql, [conversationId])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    static async updateFalse (conversationId){
        let sql = "UPDATE `conversations` SET `newChat`= 'false' WHERE id = ?"
        return db.query(sql, [conversationId])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    //suppression d'une conversation
    static deleteOneConversation(conversationId) {
        let sqlMessages = "DELETE FROM `messages2` WHERE conversation_id=?";
        let sqlConversation = "DELETE FROM `conversations` WHERE id=?";
        
        return db.query(sqlMessages, [conversationId])
            .then(() => {
                return db.query(sqlConversation, [conversationId]);
            })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                console.error("Erreur lors de la suppression de la conversation et des messages :", err);
                throw err; 
            });
    }
}