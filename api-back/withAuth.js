const jwt = require('jsonwebtoken')
const secret = 'wakapico'

const withAuth = (req, res, next) => {
  //on récupère le token dans le header de la requète HTTP
  const token = req.headers["x-access-token"];
  console.log("Token dans withAuth", token);

  //si le token existe, utilisation de la fonction de vérification de jsonwebtoken
  jwt.verify(token, secret, (err, decode) => {
    console.log(decode);

    if (err) {
      console.log(err);
      res.json({ status: 401, err: err });
    } else {
      //on rajoute une propriété id dans req, qui récupère l'id décodé du token qui servira pour la route d'authentification
      req.id_user = decode.id_user;
      req.email = decode.email;
      //on sort de la fonction, on autorise l'accés à la callback de la route
      next();
    }
  });
};

module.exports = withAuth;
