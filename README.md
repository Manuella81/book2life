**BOOK2LIFE**

Bienvenue sur le projet book2life. Il s'agit d'un site fictif de vente, d’échange ou de don entre particulier de bandes dessinées
d’occasion. Le prix à zéro ou null permet de savoir que c’est un livre gratuit.
Utilisation de react.js en front et de node.js pour le back.
Connection à une base de données mysql.

**Organisation du code :**

Le dossier api-back gère le backend:
- Le serveur Express est configuré dans le fichier serveur.js
- Dans le dossier public on a un dossier images qui contient toutes les bds
- Le dossier models contient toutes les opération de base de données, toutes les opérations CRUD 
- Le dossier routes contient toutes les routes qui va permettre à mon API de répondre à mes requêtes HTTP.
- Utilisation du middleware userRoutes.js ou adminAuthRoutes.js pour les routes protégées, c'est à dire lorsque l'utilisateur ou l'administrateur doivent être connecté
- Dans config.js et config.exemple sont stockés les informations pour la connection à la bdd.

Le dossier api-back gère tout le front:
- dossier api: récupération des routes de l'api-back
- dossier assets: les polices, logo et les images d'illustartions du front
- dossier components:
- dossier containers
- dossier context:
- dossier helpers:
- dossier slices:
- config.js:
- App.js

**Organisation du site :**

**Page Home :**

- possibilité de chercher une BD par mot clé ou par lieu
- carrousel qui affiche les dernières nouveautés et un lien qui donne la possibilité de voir
toute les nouveautés
- les BDs sont classées par catégorie
  
**BDs par catégorie :**
  
- Un slider qui affiche les BDs et un lien qui donne la possibilité de voir toute les BDs
de la catégorie
- Possibilité de rechercher des BDs en fonction d’un lieu
- Une rubrique qui affiche les BDs gratuites de la catégorie
  

**ESPACE UTILISATEUR :**

Pour pouvoir mettre en ligne ses BDs ou envoyer un message à un autre utilisateur ou pouvoir
mettre des livres en favoris, l’utilisateur doit créer un compte. Une fois le compte crée il reçoit
un mail qui va lui permettre de confirmer son inscription via un lien. Son statut passe donc de
validate « no » à validate « yes ». Pour la correction j’ai mis le statut à validate « yes » par
défaut.
S’il a oublié son mot de passe il peut cliquer sur mot de passe oublié qui lui envoie un mail
afin de réinitialiser son mot de passe (utilisation de oauthplayground de Google pour les tests
mail)
Le tableau de bord de l’utilisateur se trouve dans le header.
Une fois connecté il peut :
- Mettre des BDs dans ses favoris
- Modifier son profil
- Modifier, supprimer ou rajouter une BD
- Envoyer un message par mail à un autre utilisateur (pour la correction j’ai fait en sorte
que le message soit enregistré dans la BDD).


**ESPACE ADMINISTRATEUR DU SITE :**

C'est lui qui va valider ou non les livres que les utilisateur souhaite mettre en ligne. 
Son tableau de bord se trouve dans le footer (connexion via le fontawesome double
engrenage).
Une fois connecté l’administrateur du site peut :
- Valider ou non les BDs enregistrées par les utilisateurs : le statuts des livres passe de
validate «no » à validate « yes » dans la BDD lorsqu’il clique sur le bouton validé. La
BD devient donc visible sur le site.
- Il a accès à l’email de l’utilisateur afin de pouvoir communiquer avec lui.
