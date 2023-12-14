const nodeMailer = require('nodemailer');

//module d'envoi de mail grace à la librairie nodeMailer
module.exports =  (mailTo, subject, title, text) =>{
      
    //on crée le chemin de connexion au serveur mail
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: '',
              pass: ''
          }
      });

      let mailOptions = {
          from: '"3wa Medic" <blabla@gmail.com>', // sender address
          to: mailTo, // list of receivers
          subject: subject, // Subject line
          text: '', // plain text body
          html: '<b>'+title+'</b><p>'+text+'<p>' // html body
      };
    //chemin d'envoi du mail
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log('merde');
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
             
          });


//https://myaccount.google.com/lesssecureapps
}