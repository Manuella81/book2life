**BOOK2LIFE**

Bienvenue sur le projet book2life. Il s'agit d'une plateforme de consommation fictive qui met en relation des particuliers, souhaitant donner, vendre, échanger ou acheter des bandes dessinées. Le prix à zéro ou null permet de savoir que c’est un livre gratuit.
Le code respecte l'architecture MVC.
Utilisation de react.js en front et de node.js pour le back.
Connection à une base de données mysql.

**ORGANISATION DU CODE :**

Le dossier api-back gère le backend:
- Le serveur Express est configuré dans le fichier **server.js**. Il permet de démarrer le serveur et configurer les routes et les middlewares nécessaires pour répondre aux requêtes des clients.
- Dans le **dossier public** on a un dossier images qui contient toutes les bds. Ce sont les ressources statiques.
- Le **dossier models** contient les fichiers qui gèrent toutes les interactions avec la base de données. Ces fichiers encapsulent les logiques d'accès aux données. Manipulation des données avec le CRUD (Create, Read, Update, Delete)
- Le **dossier routes** contient toutes les routes qui va permettre à mon API de répondre à mes requêtes HTTP. Ces routes définissent quelles actions doivent être prises en réponse à différentes méthodes HTTP telles que GET, POST, PUT, DELETE, etc. Elles définissent donc les points d'entrée de l'API et spécifient comment les requêtes HTTP entrantes doivent être gérées par le serveur.
- Utilisation des middlewares **withAuth.js** ou **withAuthAdmin.js** pour les routes protégées, c'est à dire lorsque l'utilisateur ou l'administrateur doivent être connecté. Elles permettent donc de définir et gérer les routes liées à la gestion des utilisateurs et administrateurs de l'API.
- Dans **config.js** et **config.exemple** sont stockés les variables de configuration de la base de données.

Le dossier book2life-front gère tout le front:
- **dossier api**: récupération des routes de l'api-back. Permet de communiquer avec le serveur back-end afin d'accéder et de manipuler les données.
- **dossier assets**: les polices, logo et les images d'illustartions du front
- **dossier components**: utilisé pour organiser et regrouper les différents composants réutilisables de l'interface utilisateur. Chaque composant représente généralement une partie de l'interface utilisateur. 
- **dossier containers**: utilisé pour regrouper les composants qui sont chargés de la logique d'interaction avec les données via des appels à l'API ou à un état global (Redux).
- **dossier context**: le fichier **favoriteContext.js** permet de gérer l'état des favoris dans l'application. Ainsi, dans les composants de l'application qui ont besoin d'accéder aux données des favoris, j'utilise le hook useContext de React pour consommer le contexte et accéder aux données des favoris.
- **dossier helpers**: regroupe les fonctions utilitaires qui fournissent des fonctionnalités communes ou des fonctionnalités d'aide à d'autres parties de l'application.
La fonction dans **formValidator.jsx** encapsule la logique de validation des données entrées par l'utilisateur dans les formulaires.
Les fonction dans **Require-auth-admin.jsx** et **require-auth-user.jsx** sont utilisées pour vérifier si un utilisateur est authentifié avant de lui permettre l'accès à certaines parties de l'application. Elles encapsulent donc la logique d'authentification.
- **dossier slices**: regroupe les "slices" ou les tranches de l'état global de l'application géré par Redux et le **store.jsx** qui centralise et gére l'état global de l'application.
**adminSlice.jsx** et **userSlice.jsx** permettent de gérer les informations sur l'utilisateur ou administrateur connecté, y compris les actions pour se connecter, se déconnecter, mettre à jour les informations utilisateur ou administrateur, etc.
**bookSlice.jsx** permet de gérer les produits.
- **config.js**: stocke l'URL de base de l'API et l'URL API pour afficher les images
- **App.js**: c'est le point d'entrée principal de l'application. On y retrouve la structure de base de l'application, y compris les routes.

**ORGANISATION DU SITE :**

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
  

**Espace utilisateur :**

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


**Espace administrateur du site :**  

C'est lui qui va valider ou non les livres que les utilisateur souhaite mettre en ligne. 
Son tableau de bord se trouve dans le footer (connexion via le fontawesome double
engrenage).
Une fois connecté l’administrateur du site peut :
- Valider ou non les BDs enregistrées par les utilisateurs : le statuts des livres passe de
validate «no » à validate « yes » dans la BDD lorsqu’il clique sur le bouton validé. La
BD devient donc visible sur le site.
- Il a accès à l’email de l’utilisateur afin de pouvoir communiquer avec lui.

**ESPACE MESSAGERIE AVEC SOCKET.IO:**

Mise en place d'un interface de communication en temps réel sur mon site web Book2life. Mon application de messagerie utilise Socket.IO pour permettre une communication en temps réel entre les utilisateurs. Socket.IO est une bibliothèque JavaScript qui permet la communication bidirectionnelle en temps réel entre le client et le serveur. Dans mon application, cela nous permet d'afficher instantanément les nouveaux messages et de notifier les utilisateurs lorsqu'ils reçoivent un nouveau message.

*Configuration*:
Pour commencer, j'ai intégré la bibliothèque Socket.IO côté client et côté serveur. Cela m'a permis d'établir une connexion WebSocket entre le navigateur des utilisateurs et notre serveur Node.js.

*Base de données*:
J'ai rajouté deux tables dans ma base de données pour pouvoirs manipuler les conversations et les messages dans mon applications

**Utilisation de Socket.IO dans back-end**

**Modèles: conversationModel.js et messageModel.js**:
Ensuite, j'ai créé des modèles pour interagir avec la base de données et manipuler les conversations et les messages.

**Routes: conversationRoute.js et messageRoute.js**:
Pour les routes, j'ai créé des points de terminaison API pour récupérer les conversations, les messages, enregistrer de nouvelles conversations et messages, mettre à jour le statut des conversations, et supprimer les conversations et les messages associés. 
Ces routes sont sécurisées avec un middleware appelé withAuth, qui assure que seuls les utilisateurs authentifiés peuvent accéder à ces ressources.

**Server.js: Connexion au serveur Socket.IO**: 
    - Importation du module Socket.IO et Configuration du Serveur:
    - J'ai passé deux arguments à la fonction require('socket.io'). Le premier est le serveur HTTP sur lequel j'utilise Socket.IO. Le second est un objet de configuration, où je spécifie les paramètres CORS pour permettre les connexions depuis l'origine spécifiée 
    (http://localhost:9000) et autoriser les méthodes GET et POST.
    - Lorsque le composant principal de l'application est monté, nous établissons une connexion au serveur Socket.IO à l'aide de la fonction io(). Cette connexion utilise l'URL de notre serveur WebSocket, qui est configurée pour écouter sur le port 4000 dans notre 
    environnement de développement.

**Gestion des Connexions Clients**:
  - Une fois que la connexion est établie entre le client et le serveur via Socket.IO, on peut écouter différents événements côté serveur.
  - J'ai mis en place  un  évènement 'connection', qui est déclenché à chaque fois qu'un client se connecte au serveur. À l'intérieur de cette fonction de rappel, j'ai défini la logique pour gérer les différents événements, comme l'envoi et la réception de messages, la   gestion des conversations, etc.
  - Pour la gestion des messages: mise en place d'une logique pour écouter l'événement 'message' côté serveur, qui est déclenché lorsque le client envoie un message. Le serveur reçoit le message et le transmet ensuite à tous les clients connectés en émettant un événement   'messageResponse'.


**Utilisation de Socket.IO dans mon front-end**

**Interaction avec l'api back: conversation.js et messages.js**:
  - Ces fichiers définissent les fonctions qui interagissent avec l'API backend pour gérer les conversations et les messages.
  - Ces fonction envoie des requête GET, POST, PUT ou DELETE à l'API backend pour charger des données, envoyer des données, mettre à jour des données ou supprimer des données..
  - Ces deux fonctions utilisent la bibliothèque Axios pour effectuer des requêtes HTTP asynchrones vers l'API backend, ce qui leur permet d'être exécutées de manière non bloquante. Elles suivent également les principes de la gestion des erreurs en utilisant la méthode 
  catch pour récupérer les erreurs éventuelles et les renvoyer pour une gestion ultérieure.

**Gestion de l'envoi des messages: composant React SectionBooks**:
  - Dans ce composant j'ai ajouté une fonction handleSendMessage pour gérer l'envoi de messages. Dans cette fonction, je récupére les informations nécessaires telles que l'ID de l'utilisateur, l'ID du livre, etc. J'ai également dispatché des actions Redux pour            sélectionner le livre et charger les conversations de l'utilisateur.
  - En fonction des conversations chargées, je vérifie s'il existe une conversation existante entre l'utilisateur actuel et le destinataire du message concernant le livre. Si une conversation existe déjà, je charge les messages de cette conversation. Sinon, je créé une   nouvelle conversation en sauvegardant les détails de la conversation.
  - J'ai également implémenté une fonction displayConversationMessage pour charger les messages d'une conversation donnée.
  - Enfin, dans le rendu du composant SectionBooks, j'affiche les détails du livre ainsi qu'un bouton "Envoyer un message" pour permettre aux utilisateurs d'initier ou de continuer une conversation si elle existe déjà.

**Gestion de l'interface de la messagerie: composant React Messenger**:
  Dans mon composant Messenger, j'ai utilisé Socket.IO pour permettre une communication en temps réel entre les utilisateurs. Cette intégration nous permet d'afficher instantanément les nouveaux messages et d'indiquer lorsque les utilisateurs sont en train de taper un message.

  - Intégration la bibliothèque Socket.IO à mon application en important la bibliothèque côté client via import io from 'socket.io-client'.
  - Ensuite, dans la fonction principale du composant, j'ai établi une connexion au serveur Socket.IO en utilisant useEffect() avec une dépendance vide pour s'assurer que la connexion est établie une seule fois lors du montage du composant.
  - J'ai également configuré des écouteurs d'événements pour gérer la réception de nouveaux messages, la saisie en cours, etc. Par exemple, lorsqu'un nouveau message est reçu, nous le mettons à jour dans l'état des messages pour l'afficher à l'utilisateur.
  - J'ai utilisé plusieurs hooks useEffect pour charger les conversations de l'utilisateur, les détails de la conversation sélectionnée, les messages de la conversation sélectionnée, etc.
  - J'ai implémenté des fonctions pour gérer le clic sur une conversation, la saisie de nouveaux messages, l'envoi de messages, la réception de nouveaux messages, etc. Pour envoyer un message par exemple, nous utilisons une fonction onSubmitForm() qui émet un événement   'message' avec les données du message vers le serveur via Socket.IO.
  - J'ai utilisé des toast pour informer l'utilisateur de la réception de nouveaux messages.
  - J'ai mis en place la fonctionnalité de suppression des conversations. Si un des deux interlocuteur supprime la conversation, celle-ci est effacé que chez lui. Si les deux interlocuteurs ont effacé la conversation elle est supprimé définitivement dans la bdd.
  - J'ai rendu les conversations et les messages dans le DOM en fonction de leur état respectif.

**Conclusion**:

  Grâce à Socket.IO, notre composant Messenger offre une expérience de messagerie en temps réel, permettant aux utilisateurs d'interagir instantanément les uns avec les autres. L'utilisation de WebSockets via Socket.IO simplifie considérablement la gestion des communications en temps réel dans notre application, offrant ainsi une expérience utilisateur fluide et réactive.


**QUELQUES CAPTURES D'ECRAN**

HOMEPAGE
![home](https://github.com/Manuella81/book2life/assets/101250152/7a7739c3-91ec-4144-8483-454d232e008a)

LISTE DES BDS PAR LIEU
![liste_lieu](https://github.com/Manuella81/book2life/assets/101250152/7003fe96-f475-46ef-8a37-a3208de3cae0)

LISTE DES BDS PAR MOT CLE
![liste_mots_cles](https://github.com/Manuella81/book2life/assets/101250152/5142edbb-e031-4176-ae10-a7f9b4a590d4)

LES DIFFERENTES CATEGORIES
![categories](https://github.com/Manuella81/book2life/assets/101250152/257817fb-8b6a-484d-b691-df3ae1674298)

CATEGORIE JEUNESSE
![bd_jeunesse](https://github.com/Manuella81/book2life/assets/101250152/10691eea-5f10-454d-85de-1cc4ace8d040)

LISTE DES FAVORIS(utilisateur connecté)
![favoris](https://github.com/Manuella81/book2life/assets/101250152/55df50d3-1ca4-4b48-a73d-ed0fa9c8a903)

ESPACE UTILISATEUR(utilisateur connecté)
![admin](https://github.com/Manuella81/book2life/assets/101250152/01595b74-c435-48b8-b05c-b7ecd168f089)

MODIFIER UNE BD(utilisateur connecté)
![modifier](https://github.com/Manuella81/book2life/assets/101250152/db90d080-bf37-41ab-8a6c-9d7532ee9648)

ESPACE ADMINISTRATEUR(administrateur connecté)
![espace_admin](https://github.com/Manuella81/book2life/assets/101250152/ef307ff6-47c1-462c-a304-98358ef02604)

VALIDER OU NON UNE BD RAJOUTE PAR UN UTILISATEUR(utilisateur connecté)
![admin_validate](https://github.com/Manuella81/book2life/assets/101250152/cdc62798-57da-4d4f-82c7-6cde31ee5885)

A PROPOS
![a_propos](https://github.com/Manuella81/book2life/assets/101250152/51c105b8-229f-49e9-95e6-13517280c017)


