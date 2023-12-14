//on importe la librairie nodemailer
const nodeMailer = require('nodemailer');
//on importe l'api de google
const { google } = require("googleapis");
//on récupère l'objet d'authentification du propriétaire du gmail à brancher
const OAuth2 = google.auth.OAuth2;

module.exports = (mailTo, subject, title, text) =>{
    
    //on instancie l'authentification qu'on pourra utiliser dans le transport du mail
    const oauth2Client = new OAuth2(
        '802385032858-7clvu8fjurge6dkcq046qtehl73uj552.apps.googleusercontent.com', // client Id
        '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', // client secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    )
    
    //envoi des identifications client.
    oauth2Client.setCredentials({
        refresh_token: '1//04U6TBxQLnoLBCgYIARAAGAQSNwF-L9IrrZb00_MTgfA6OQnWAkIa2QzfSQHtI1xLDJLuO4_kY-Yo3g58v0skfbttjhQMjgs9wsk'
    })
    
    console.log(oauth2Client);
    
    //création du transport du mail pret à partir (préparation)
    let transporter = nodeMailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'mayamanuella@gmail.com',
            clientId: "646217771134-bnfvcnkoc3hqd6s6rds9vlfqmlltrut6.apps.googleusercontent.com", // client Id
            clientSecret: "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",
            refreshToken: '1//04U6TBxQLnoLBCgYIARAAGAQSNwF-L9IrrZb00_MTgfA6OQnWAkIa2QzfSQHtI1xLDJLuO4_kY-Yo3g58v0skfbttjhQMjgs9wsk',
            accessToken: "ya29.a0Aa4xrXOhbyDMlHt-bRyjoIgjksOommEKgvBhKBsaXA8DaBXZOLefDVeAaDcmaF0HWoB4MR_VC7Wx_p1-XKKI0diUPry26u407kPqQWyjI6eTgTj7oNZPr21jcKiDMnOuwpjflm3eUzNrvQzNX5JbkexpXWHWaCgYKATASARMSFQEjDvL96VBWPuJuRwsw_UUitskb2g0163"
        }

      });
      
      //modèle du mail
      let mailOptions = {
          from: '"book2life" <blabla@gmail.com>', // email de l'expéditeur
          to: mailTo, // liste des emails des destinataires
          subject: subject, // Sujet
          text: '', // texte du body
          html: '<b>'+title+'</b><p>'+text+'<p>' // html body
      };
    
        
    //envoi du mail avec une callback pour voir si ça a réussi
    transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log('ça rate');
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              //res.render('index');
    });
    
}