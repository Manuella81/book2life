module.exports = (_db)=>{
    db = _db
    return MessageModel
}

class MessageModel {
    //récupération des messages d'une conversation
    static getMessages(conversationId){
        let sql = 'SELECT * FROM messages2 WHERE conversation_id = ?';
            return db.query(sql, [conversationId])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
    }

    //enregistrement des messages
    static createMessage(req){
        let sql = "INSERT INTO `messages2`(`conversation_id`, `sender_id`, `id_book`, `bookTitle`, `content`, `timestamp` ) VALUES (?, ?, ?, ?, ?, NOW())"
        return db.query(sql, [ req.body.conversation_id, req.body.sender_id, req.body.id_book, req.body.bookTitle, req.body.content])
            .then((result)=>{
                return result
            })
            .catch((err)=>{
                return err
            })
    }
}
