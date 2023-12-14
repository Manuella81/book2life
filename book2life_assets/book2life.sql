-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 07 oct. 2022 à 09:55
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `book2life`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id_admin` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(90) COLLATE utf8_bin NOT NULL,
  `lastname` varchar(90) COLLATE utf8_bin NOT NULL,
  `email` varchar(90) COLLATE utf8_bin NOT NULL,
  `password` varchar(120) COLLATE utf8_bin NOT NULL,
  `key_id` varchar(90) COLLATE utf8_bin NOT NULL,
  `creationTimestamp` datetime NOT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id_admin`, `firstname`, `lastname`, `email`, `password`, `key_id`, `creationTimestamp`) VALUES
(1, 'maya', 'manuella', 'admin@gmail.com', '$2a$10$A3x.DjTEVHZrNq.7aAD5N.kgnVNlBUmuzasWSAgTYDYjWnw783HPS', 'il85kfR1UCkeS0b4SOE6lT9BzKMuK5', '2022-08-13 18:43:42'),
(15, 'MAYA', 'Manuella', 'mayamanuella@gmail.com', '$2a$10$DQqTO7Z1kxjsgDykDnJkJu.5M8CfUuouk5aJgfOL/VdkiNMFnadjG', 'Pzp8hWK94b6pMHZBfwQqrKGh66JCwi', '2022-09-19 14:56:27');

-- --------------------------------------------------------

--
-- Structure de la table `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
  `id_book` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(300) COLLATE utf8_bin NOT NULL,
  `synopsis` text COLLATE utf8_bin NOT NULL,
  `price` int(5) DEFAULT NULL,
  `photo` varchar(90) COLLATE utf8_bin NOT NULL,
  `author` varchar(60) CHARACTER SET utf32 COLLATE utf32_bin NOT NULL,
  `releaseDate` varchar(50) COLLATE utf8_bin NOT NULL,
  `editor` varchar(60) COLLATE utf8_bin NOT NULL,
  `numberOfPages` int(4) NOT NULL,
  `language` varchar(60) COLLATE utf8_bin NOT NULL,
  `creationTimestamp` datetime NOT NULL,
  `id_cat` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_bookState` int(11) NOT NULL,
  `validate` varchar(15) COLLATE utf8_bin NOT NULL,
  `id_tri_humour` int(11) DEFAULT NULL,
  `id_tri_jeunesse` int(11) DEFAULT NULL,
  `id_tri_mangaByGender` int(11) DEFAULT NULL,
  `id_tri_mangaByTheme` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_book`),
  KEY `id_cat` (`id_cat`),
  KEY `id_user` (`id_user`),
  KEY `id_bookState` (`id_bookState`),
  KEY `id` (`id_tri_humour`,`id_tri_jeunesse`,`id_tri_mangaByGender`,`id_tri_mangaByTheme`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `books`
--

INSERT INTO `books` (`id_book`, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, `creationTimestamp`, `id_cat`, `id_user`, `id_bookState`, `validate`, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme`) VALUES
(52, 'Mortelle Adèle - Face de Beurk ! Tome 19 : BD Mortelle Adèle', '« Hey, tu m\'entends ? Oui, toi, celui qui se la raconte, celle qui casse les pieds, celui qui donne tout le temps des ordres, celle qui dit toujours n\'importe quoi... Oui, oui, c\'est à toi que je parle... Tu cherches où est le problème ? Bah regarde dans le miroir ! Face de Beurk ! »  Que ce soit dans la cour de récréation ou à la maison, hors de question pour Adèle de se laisser embêter ou marcher sur les pieds ! N\'en déplaise à ceux qui voudraient qu\'elle se taise, la reine des bêtises compte bien dire tout ce qu\'elle...', NULL, 'mortelle_adele.jpg', 'Mr Tan', '19/10/2022', 'Tourbillon', 80, 'Français', '2022-09-29 13:21:59', 1, 2, 2, 'yes', NULL, 1, NULL, NULL),
(53, 'Les Sisters - A la mode de chez nous Tome 02 : Les Sisters', ': Du rififi chez les filles : découvrez le quotidien savoureux de deux sœurs volcaniques ! Wendy, c\'est ma grande sister. Moi, c\'est Marine et j\'suis la plus petite. Du coup, je ne saurai jamais ce que ça fait d\'avoir une petite sœur qui fait tout pareil que moi, qui essaie par tous les moyens de forcer le cadenas de mon journal intime, qui fait rien qu\'à me piquer mes fringues dès que j\'ai le dos tourné. En fait, ça m\'aurait trop plu d\'être ma propre sister. juste pour avoir la chance de m\'avoir moi comme sister ! ! !. Que ce soit dans la cour de récréation ou à la maison, hors de question pour Adèle de se laisser embêter ou marcher sur les pieds ! N\'en déplaise à ceux qui voudraient qu\'elle se taise, la reine des bêtises compte bien dire tout ce qu\'elle...', 5, 'les_sisters.jpg', 'William', '29/10/2008', 'Bamboo Eds', 80, 'Français', '2022-09-29 13:23:52', 1, 2, 3, 'yes', NULL, 1, NULL, NULL),
(54, 'Les enfants de la résistance - Tome 8 : Les Enfants de la Résistance - Combattre ou mourir  ', 'Les enfants de la Résistance ont maintes fois manqué mourir pour leurs idées. Cette fois, ils devront risquer leur vie pour la libre circulation de l\'information. Ou plutôt la circulation de l\'information libre ! En cet été 1943, la nouvelle mission du Lynx est de livrer un stock de papier qui servira à imprimer les journaux de la Résistance... à 250 km de chez eux. Pour cela, ils vont devoir monter tout un réseau. Ce qui implique de prendre le plus grand des risques : faire confiance...', 0, 'les_enfants _de _la_resistance.jpg', 'Vincent Dugomier', '16/09/2022', 'Le Lombard Eds', 56, 'Français', '2022-09-29 13:26:02', 1, 1, 2, 'yes', NULL, 2, NULL, NULL),
(55, ' Elles - Tome 2 : Elles - Universelle(s)', 'Les récents chocs psychologiques subis par Elle ont permis à Bleue, sa personnalité la mieux enfouie, de prendre le contrôle total, reléguant Elle dans les limbes de son propre subconscient. Bleue est sociable, enjouée, efficace, douée artistiquement... En fait, Bleue est un peu une synthèse de toutes les personnalités d\'Elle. Mais si Bleue est si géniale que cela, alors pourquoi est-ce qu\'Elle a passé sa vie à tenter de la retenir prisonnière au fin fond d\'elle-même...?', 6, 'elles.jpg', 'Kid Toussaint', '29/04/2022', 'Le Lombard Eds', 96, 'Français', '2022-09-29 13:28:23', 1, 1, 3, 'yes', NULL, 2, NULL, NULL),
(56, 'Aya de Yopougon - Tome 7 : Aya de Yopougon', ': À Yopougon, les problèmes vont bon train ! Aya tente de concilier un stage à la Solibra et sa relation compliquée avec Didier... mais surtout, elle s\'engage dans la lutte pour les droits des étudiants de l\'université de Cocody ! De son côté, Albert, rejeté par sa famille, galère pour se loger. Et ce n\'est rien comparé à Bintou, devenue la star détestée de la série \"Gâteuse de foyer\" ! Quant à Inno, exilé en France et sans-papiers, il n\'est pas au bout de ses peines car \"Paris est dur comme caillou\". Mais tous comptent...', 10, 'aya_de_youpugon.jpg', ' Marguerite Abouet, Clément Oubrerie', '14/09/2022', 'Gallimard Bd', 128, 'Français', '2022-09-29 13:30:25', 2, 1, 2, 'yes', NULL, NULL, NULL, NULL),
(57, 'Culottées - Des femmes qui ne font que ce qu\'elles veulent Tome 1 : Culottées', 'Guerrière apache ou sirène hollywoodienne, gardienne de phare ou créatrice de trolls, gynécologue ou impératrice, les Culottées ont fait voler en éclats les préjugés.Quinze portraits de femmes qui ont inventé leur destin.', 0, 'culottes.jpg', 'Pénélope Bagieu', '22/09/2016', 'Gallimard Bd', 144, 'Français', '2022-09-29 13:32:39', 2, 1, 3, 'yes', NULL, NULL, NULL, NULL),
(58, 'Lightfall - L\'Ombre de l\'Oiseau Tome 2 : Lightfall', ': À l\'issue d\'une bataille épique, l\'Oiseau Kest, Destructeur du Soleil, s\'est emparé de la dernière flamme. D\'un jour à l\'autre, les lumières menacent de disparaître de la surface d\'Irpa... Cherchant désespérément une solution pour sauver la planète, la jeune Béa et son ami Galdurien, Cad, partent à la recherche de l\'esprit des eaux, censé leur donner des réponses... Mais ce sont de nouvelles questions qui les attendent. Dans l\'impasse, ils devront faire un choix : arrêter l\'oiseau mythique ou découvrir la vérité. La quête...', 10, 'ligthfall.jpg', 'Tim Probert', '17/08/2022', 'Gallimard Bd', 256, 'Français', '2022-09-29 13:33:53', 2, 1, 2, 'yes', NULL, NULL, NULL, NULL),
(59, '5 mondes - Le guerrier de sable Tome 1 : 5 Mondes', 'Oona Lee est l\'apprentie danseuse de sable la plus maladroite de sa classe. Une vraie calamité en matière de magie. Alors que la guerre est sur le point d\'éclater, elle apprend que les 5 Mondes qui forment son univers courent un grave danger. Le seul moyen de les sauver est de rallumer cinq phares antiques. Une mission a priori impossible... pour qui ne s\'appelle pas Oona Lee ! Aidée d\'un gamin des rues et d\'un athlète superstar, la jeune magicienne va au devant de son destin. Ensemble, parviendront-ils à éviter le pire ?', 9, '5 mondes.jpg', ' Mark Siegel,  Alexis Siegel', '09/03/2017', 'Gallimard Bd', 256, 'Français', '2022-09-29 13:35:04', 2, 1, 2, 'yes', NULL, NULL, NULL, NULL),
(60, 'L\'année de Plantu 2020 - État d\'urgence', 'L\'année de Plantu 2020 est évidemment placée sous le signe de la crise sanitaire qui a ébranlé la planète : Virus, confinement, héroïsme des soignants, pénurie et crise économique, sans oublier l\'actualité politique ou internationale, passés à la moulinette du crayon acéré du dessinateur du journal le monde. À coups de Marianne sous perf et de souris masquées, Plantu immortalise avec humour et acuité cette année très particulière.', 9, 'plantu_2020.jpg', 'Plantu', '28/10/2020', 'Calmann-Levy', 208, 'Français', '2022-09-29 13:38:00', 3, 1, 2, 'yes', 1, NULL, NULL, NULL),
(61, 'La planète des sages - : La Planète des sages - Intégrale', 'Cette intégrale de \"La Planète des sages\" regroupe les deux volumes du best-seller de Jul et Charles Pépin ! Actuelle, décalée, elle propose deux approches : celle, humoristique et irrésistible, de Jul et celle, analytique et pédagogique, de Charles Pépin. Ensemble, les deux auteurs ressuscitent et rendent accessibles les découvertes et les parcours de presque tous les penseurs qui ont fait la philosophie depuis trois mille ans.', 0, 'la_planete_des_sages.jpg', 'Jul, Charles Pépin', '26/11/2021', 'Dargaud', 220, 'Français', '2022-09-29 13:40:35', 3, 1, 3, 'yes', 1, NULL, NULL, NULL),
(62, 'Le Bon Air de la campagne', '\" Un bon croquis vaut mieux qu\'un long discours. \" – Napoléon Certains vont à des concerts ou au spectacle. Moi, j\'assiste à des depuis des années à des meetings politiques de tous bords. Je ne suis ni journaliste, ni analyste, ni polémiste ni militant. Je suis illustrateur. Pendant quelques mois, je me suis promené dans les coulisses de la campagne présidentielle, un carnet à la main : j\'ai écouté, observé, souri et croqué ce qui se passait autour de moi. Voici donc mes reportages dessinés ! Croyez-moi, rien n\'a été inventé. Tout a été entendu, d\'une oreille parfois indiscrète.', 6, 'le_bon_air_de_campagne.jpg', 'Hubert Van Rie', '09/06/2022', 'Presses De La Cite', 96, 'Français', '2022-09-29 13:42:18', 3, 1, 3, 'yes', 2, NULL, NULL, NULL),
(63, 'Les Guides en BD', 'Le guide indispensable à tous les retraités et à ceux qui vont le devenir dans les quarante prochaines années.  Parlons clairement : la vie de l\'homme moderne commence à soixante-cinq ans, au moment où il cueille les fruits bien mérités de longues années de labeur. Habitué au stress et aux multiples pressions, l\'ex-salarié risque d\'être perturbé dans cette nouvelle vie, au point de continuer à se lever à 7h30, de mettre une cravate pour aller chercher les croissants ou pire, d\'oublier de faire la sieste ! Heureusement, Tybo et Goupil sont là pour guider nos premiers pas dans ce monde étrange de la paresse et du repos. Le Guide de la retraite en BD définit les nouvelles obligations et les nouveaux interdits, p ropose des emplois du temps et offre mille et une astuces pour désapprendre à travailler.', 5, 'guide_retraite.jpg', 'Jacky Goupil', 'août 1997', 'Vents D\'ouest', 48, 'Françias', '2022-09-29 13:43:35', 3, 1, 3, 'yes', 3, NULL, NULL, NULL),
(64, 'Samuraï - Dogen est de retour Tome 08 : Samurai Légendes', 'En plein guerre civile, dans un japon médiéval, l\'athlétique Dogen s\'apprête à vivre les instants les plus périlleux de sa longue carrière de rônin. Il a pour mission d\'aider la jeune princesse Yumie à traverser le pays... Un voyage mémorable, et ultra secret dont l\'issue pourrait bien changer la face de l\'Empire.', 0, 'samurai_dogen.jpg', 'Jean-François Di Giorgio', '14/09/2022', 'Soleil', 48, 'Français', '2022-09-29 15:16:28', 4, 1, 4, 'yes', NULL, NULL, NULL, NULL),
(65, 'Burne out', 'Un vent de panique souffle sur la start-up nation ! Voilà que le first minister, Daniel Poutrenbois, est pris dans une chipstor, shwimstrom, schtrim… bref, une bonne grosse tornade de merde. La presse a révélé au grand jour son kiff pour le porno hentai bien nasty et ça, c’est le genre de bad buzz qui impacte grave le gouvernement. Malgré ses apologizes appuyées, la réputation du fonctionnaire est down. Face à la pression médiatique, et bien que Daniel soit méga corporate, son manager, euh, le président de la République, l...', 0, 'burne_outjpg.jpg', 'Bastien Vivès', '19/08/2022', 'Le Monte-En-L\'air', 112, 'Français', '2022-09-29 15:17:38', 5, 1, 3, 'yes', NULL, NULL, NULL, NULL),
(66, 'Adan', 'Jeunes trentenaires, Adèle et Anis aimeraient pimenter leur vie de couple pour échapper à la routine qui s’installe… Un soir, à la sortie d’un restaurant, ils se laissent tenter et emboitent le pas de deux amants. Leur voyeurisme va les conduire jusqu’aux portes d’ADAN, une agence mystérieuse spécialisée dans la conception de fantasmes sur-mesure. Mais une fois sur place, le piège se referme sur eux. Un étrange et sulfureux jeu de piste commence… le couple pourrait bien perdre le sens des réalités au cours de cette enquête qui va les amener à libérer leur sexualité et à repousser leurs limites. On explore la face sombre des fantasmes à travers ce thriller pornographique qui nous invite à emprunter des sentiers inconnus pour goûter aux plaisirs de la chair.', 5, 'adan.jpg', ' Alban Sapin, Clara Néville', '17/08/2022', 'Glénat', 88, 'Français', '2022-09-29 15:18:36', 5, 1, 3, 'yes', NULL, NULL, NULL, NULL),
(67, '	Reign Of X - Tome 19 : Reign of X', 'Les X-Men font connaissance avec le nouveau vilain qui leur donne du fil à retordre ! C\'est l\'heure du combat final pour Abigail Brand et ses troupes, ainsi que pour les Hellions ! Quant à Wolverine et X-Force, ils doivent affronter une nouvelle menace venue par la mer. Et bien sûr, le procès de Magnéto se poursuit !  Avec le démarrage d\'INFERNO en ligne de mire (le mois prochain !), tout s\'accélère pour les séries mutantes. Dans ce numéro, deux séries font leurs adieux : Hellions et S.W.O.R.D. qui nous réservent une salve de rebondissements !', 8, 'reign_of_x19.jpg', ' Gerry Duggan , Al Ewing, Zeb Wells', '14/09/2022', 'Panini Comics', 168, 'Français', '2022-09-29 15:19:52', 6, 1, 2, 'yes', NULL, NULL, NULL, NULL),
(68, 'Reign Of X - Tome 20 : Reign of X', 'Quand l\'Empire Shi\'ar appelle les X-Men à l\'aide, une équipe inattendue est envoyée à la rescousse. Qui sont les X-Men secrets de Solar et Rocket ? Les Maraudeurs tirent leur révérence... avant un nouveau départ ? Kate Pryde doit former une nouvelle équipe de mutants pour voguer sur les mers. De leur côté, les Nouveaux Mutants se remettent de l\'affrontement contre le Roi d\'Ombre, tandis que l\'équipe officielle des X-Men affronte M.O.D.O.K. ! Après DAWN OF X, REIGN OF X referme ses portes, mettant fin à la deuxième grande phase de la nouvelle ère mutante imaginée par Jonathan Hickman. Les séries régulières reviendront dès le mois prochain avec DESTINY OF X, mais dans l\'intervalle, c\'est Wolverine qui sera à l\'honneur avec les deux numéros de WOLVERINE : X LIVES AND DEATHS OF WOLVERINE !', 0, 'reign_of_x20.jpg', ' Tini Howard, Steve Orlando, Gerry Duggan', '02/11/2022', 'Panini Comics', 168, 'Français', '2022-09-29 15:20:56', 6, 1, 3, 'yes', NULL, NULL, NULL, NULL),
(69, 'Maestro - : Maestro : Guerre & Pax', 'Le Maestro a renversé le précédent souverain de Dystopia, mais il ne compte pas s\'arrêter en si bon chemin. Il est temps que la planète entière le reconnaisse comme son unique Dieu ! Mais celui qu\'on appelait autrefois Hulk n\'est pas le seul immortel sur Terre et le Panthéon va se dresser face à lui. Quel vilain bien connu se cache derrière cette équipe ? Il y a près de 20 ans, Peter David a créé un monde apocalyptique dominé par une version terrifiante de Hulk, dans la saga Futur Imparfait. L\'histoire est devenue culte et le personnage a plusieurs fois refait surface dans l\'univers Marvel. Après l\'album MAESTRO paru en 2021, David revient raconter la suite des aventures du terrible tyran.', 6, 'mestro.jpg', 'Peter David', '12/01/2022', 'Panini Comics', 128, 'Français', '2022-09-29 15:23:02', 6, 1, 2, 'yes', NULL, NULL, NULL, NULL),
(70, 'Deadpool - Tome 02 : Deadpool Samurai', 'Deadpool fait maintenant partie de l\'équipe de samouraïs chargé de veiller sur Tokyo. Ayant pris ses aises dans la capitale japonaise, il va rapidement retrouver des visages familiers. Les ennuis s\'enchaînent et le plus déjanté des mercenaires continue de dissiper le chaos. Profitant pleinement de son nouveau quotidien et se présentant comme un membre essentiel du groupe, il va devoir faire face à un adversaire de taille : Loki ! Toujours caché dans l\'ombre, le dieu de la malice est bien décidé à le faire basculer de son...', 3, 'deadpool.jpg', 'Sanshiro Kasama', '28/09/2022', 'Panini Manga', 224, 'Françias', '2022-09-29 15:25:48', 7, 1, 3, 'yes', NULL, NULL, 1, 1),
(71, 'Solo Leveling - Tome 07 : Solo Leveling', 'Lorsque d\'étranges portails sont apparus aux quatre coins du monde, l\'humanité a dû trouver une parade pour ne pas finir massacrée par les griffes des monstres des monstres qui en sortent. Dans le même temps, certaines personnes ont développé des capacités permettant de les chasser. Ces combattants intrépides n\'hésitent pas à foncer au coeur des donjons pour combattre les créatures qu\'ils abritent.', 0, 'solo_leveling.jpg', 'Chugong', '21/09/2022', 'kbooks', 272, 'Français', '2022-09-29 15:27:23', 7, 1, 2, 'yes', NULL, NULL, 3, 3),
(72, 'Les Pokémon - Tome 4 : Pokémon Epée et Bouclier', 'Une aventure étonnante dans l\'univers des jeux Pokémon Épée et Pokémon Bouclier !Épée a accepté de réparer la canne de glace appartenant au M. Glaquette de Lona. Il met du coeur à l\'ouvrage et affronte même Chaz en pleine tempête de neige. Mais un groupe de Bekaglaçon profite de la confusion pour voler la Poké Ball dans laquelle se trouve M. Glaquette ! Quelles sont les motivations de ces Pokémon ? Bouclier va-t-elle enfin retrouver ses compagnons égarés ?  Vous le découvrirez dans ce nouveau tome plein de rebondissements..', 3, 'pokemon.jpg', 'Hidenori Kusaka', '15/09/2022', 'Kurokawa Eds', 176, 'Français', '2022-09-29 15:28:49', 7, 1, 2, 'yes', NULL, NULL, 4, 3),
(73, 'GTO - Tome 17 : GTO Paradise Lost', 'Onizuka continue sa progression dans le Wangan Deathmatch, mais l\'attaque contre les gardiens est découverte et il est fait prisonnier. Alors qu\'il subit de terribles tortures, l\'exécution de son plan avance ! De son côté, Nana a retrouvé un peu de paix au White Swan où elle s\'est réfugiée, mais les hommes de main d\'Araragi rôdent.', 3, 'gto.jpg', 'Tôru Fujisawa', '14/09/2022', 'Pika', 208, 'Français', '2022-09-29 15:30:12', 7, 1, 3, 'yes', NULL, NULL, 1, 5),
(74, 'City Hunter - Tome 01 : City Hunter - Perfect Edition', ': À Shinjuku, les crimes font partie du quotidien. Mais il y a un nom dont la simple évocation fait trembler les plus grands malfrats. City Hunter est une légende qui prend un malin plaisir à interférer dans les affaires de ces individus. Derrière ce nom se cache en réalité un tandem redoutablement efficace  : Ryo Saeba, le nettoyeur et Hideyuki Makimura, un ancien policier. Lorsque ce dernier est tué par une organisation criminelle, son coéquipier promet de veiller sur sa sœur Kaori. De ce serment, naîtra un duo de choc  !...', 8, 'city_hunterjpg.jpg', 'Tsukasa Hojo', '21/09/2022', 'Panini Manga', 218, 'Français', '2022-09-29 15:34:09', 7, 1, 2, 'yes', NULL, NULL, 3, 3),
(75, 'One Piece - : One Piece - Les recettes pirates de Sanji', 'Goûtez aux festins de Sanji !Quel lecteur de One Piece n\'a jamais rêvé de festoyer aux côtés de l\'équipage de Chapeau de paille pour déguster les petits plats de Sanji ? Pour votre plus grand plaisir, le cuisinier du Thousand Sunnyédite là son premier livre de recettes. Barbecue d\'aqua-viande de Water Seven, penne gorgonzola aux rois des mers… des idées originales et succulentes, faciles à réaliser, qui vous feront naviguer dans toutes les mers du monde.', 10, 'one_piece.jpg', 'Sanji', '22/11/2017', 'Glénat', 96, 'Français', '2022-09-29 15:35:21', 7, 1, 2, 'yes', NULL, NULL, 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `bookstate`
--

DROP TABLE IF EXISTS `bookstate`;
CREATE TABLE IF NOT EXISTS `bookstate` (
  `id_bookState` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(60) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id_bookState`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `bookstate`
--

INSERT INTO `bookstate` (`id_bookState`, `state`) VALUES
(1, 'état neuf'),
(2, 'très bon état'),
(3, 'bon état'),
(4, 'passable');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id_cat` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id_cat`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id_cat`, `name`) VALUES
(1, 'BD jeunesse'),
(2, 'Romans graphiques'),
(3, 'Humour'),
(4, 'BD historiques'),
(5, 'BD érotiques'),
(6, 'Comics'),
(7, 'Mangas');

-- --------------------------------------------------------

--
-- Structure de la table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
CREATE TABLE IF NOT EXISTS `favorites` (
  `id_book` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_bin NOT NULL,
  `synopsis` text COLLATE utf8_bin NOT NULL,
  `price` int(5) NOT NULL,
  `photo` varchar(90) COLLATE utf8_bin NOT NULL,
  `author` varchar(60) CHARACTER SET utf32 COLLATE utf32_bin NOT NULL,
  `releaseDate` date NOT NULL,
  `editor` varchar(60) COLLATE utf8_bin NOT NULL,
  `numberOfPages` int(4) NOT NULL,
  `language` varchar(60) COLLATE utf8_bin NOT NULL,
  `creationTimestamp` datetime NOT NULL,
  `id_cat` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_bookState` int(11) NOT NULL,
  `validate` varchar(15) COLLATE utf8_bin NOT NULL,
  `id_tri_humour` int(11) DEFAULT NULL,
  `id_tri_jeunesse` int(11) DEFAULT NULL,
  `id_tri_mangaByGender` int(11) DEFAULT NULL,
  `id_tri_mangaByTheme` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_book`),
  KEY `id_cat` (`id_cat`),
  KEY `id_user` (`id_user`),
  KEY `id_bookState` (`id_bookState`),
  KEY `id` (`id_tri_humour`,`id_tri_jeunesse`,`id_tri_mangaByGender`,`id_tri_mangaByTheme`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `favorites`
--

INSERT INTO `favorites` (`id_book`, `title`, `synopsis`, `price`, `photo`, `author`, `releaseDate`, `editor`, `numberOfPages`, `language`, `creationTimestamp`, `id_cat`, `id_user`, `id_bookState`, `validate`, `id_tri_humour`, `id_tri_jeunesse`, `id_tri_mangaByGender`, `id_tri_mangaByTheme`) VALUES
(8, 'bienvenue chez les foufous', 'Lorem ipsum dolor sit amet. Id debitis consequatur ut voluptatem explicabo et odio nesciunt aut maiores veritatis et repellendus consequatur ea vero deserunt hic ducimus nulla. Aut dolorum voluptates ut facilis excepturi 33 molestiae ullam sit voluptatem numquam aut assumenda natus. Sit perspiciatis quam eum earum perferendis et accusamus dicta hic atque nobis ad ipsa saepe. Est error rerum sit optio provident ut omnis excepturi et voluptatem cumque et quia exercitationem hic neque consequatur.', 20, 'book.jpg', 'moi', '2022-08-22', 'moi', 130, 'françias', '2022-08-25 15:27:22', 2, 1, 3, 'no', 8, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id_message` int(11) NOT NULL AUTO_INCREMENT,
  `buyerName` varchar(150) COLLATE utf8_bin NOT NULL,
  `bookTitle` varchar(150) COLLATE utf8_bin NOT NULL,
  `contents` varchar(300) COLLATE utf8_bin NOT NULL,
  `email` varchar(150) COLLATE utf8_bin NOT NULL,
  `sellerEmail` varchar(150) COLLATE utf8_bin NOT NULL,
  `id_book` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `creationTimestamp` datetime NOT NULL,
  PRIMARY KEY (`id_message`),
  KEY `id_book` (`id_book`),
  KEY `id_user` (`id_user`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id_message`, `buyerName`, `bookTitle`, `contents`, `email`, `sellerEmail`, `id_book`, `id_user`, `creationTimestamp`) VALUES
(27, 'Manu971', 'test addBook22', 'Lorem ipsum dolor sit amet. Ut quod ratione et sint optio qui quia consequatur in omnis possimus. Et veniam omnis cum modi voluptatem et alias odio rem dolores nisi sed facilis modi. Ut saepe consequa', 'mayamanuella@gmail.com', 'mayamanuella@gmail.com', 81, 1, '2022-10-06 15:10:39'),
(7, '', '', 'comment vas tu', '', '', 56, 2, '2022-10-03 15:41:39'),
(8, '', '', 'test send messages', '', '', 54, 1, '2022-10-03 15:53:48'),
(9, '', '', 'test 2 send messages', '', '', 75, 1, '2022-10-03 16:36:44'),
(10, '', '', 'test 3 ', '', '', 75, 1, '2022-10-03 16:38:36'),
(11, '', '', 'test 55', '', '', 75, 1, '2022-10-03 16:39:03'),
(12, '', '', 'test 101', '', '', 75, 1, '2022-10-03 16:39:30'),
(13, '', '', 'fdfsdfgs', '', '', 75, 1, '2022-10-03 16:40:13'),
(14, '', '', 'test again', '', '', 75, 1, '2022-10-03 16:40:44'),
(15, '', '', 'test again', '', '', 75, 1, '2022-10-03 16:40:46'),
(16, '', '', 'test again', '', '', 75, 1, '2022-10-03 16:41:38'),
(17, '', '', 'yo', '', '', 75, 1, '2022-10-03 16:43:09'),
(18, '', '', 'je suis boubou', 'boubou@gmail.com', '', 54, 1, '2022-10-04 10:07:52'),
(19, '', '', 'comment vas tu', 'comment vas tu', 'comment vas tu', 56, 2, '2022-10-04 10:42:48'),
(20, '', '', 'gfdsqgqfg', 'gfqregqrfe', 'params.sellerEmail', 54, 1, '2022-10-04 11:01:20'),
(21, '', '', 'ezdfezfdz', 'edfezfdezfd', 'mayamanuella@gmail.com', 54, 1, '2022-10-04 11:11:39'),
(22, '', 'Les enfants de la résistance - Tome 8 : Les Enfants de la Résistance - Combattre ou mourir  ', 'ggdfghdhdh', 'hgfhghh', 'mayamanuella@gmail.com', 54, 1, '2022-10-04 11:48:22'),
(23, 'Manu971', 'Les enfants de la résistance - Tome 8 : Les Enfants de la Résistance - Combattre ou mourir  ', 'tershgterhtrehtre', 'eshgytrehtrehygytre', 'mayamanuella@gmail.com', 54, 1, '2022-10-04 11:53:19'),
(24, 'Manu971', 'Les enfants de la résistance - Tome 8 : Les Enfants de la Résistance - Combattre ou mourir  ', 'Bonjour, je suis intéressé par votre BD est elle encore disponible?', 'mayamanuella@gmail.com', 'mayamanuella@gmail.com', 54, 1, '2022-10-04 11:55:51'),
(25, 'Manu971', 'Les enfants de la résistance - Tome 8 : Les Enfants de la Résistance - Combattre ou mourir  ', 'je veux ce livre', 'mayamanuella@gmail.com', 'mayamanuella@gmail.com', 54, 1, '2022-10-04 11:59:39'),
(26, 'Manu971', ' Elles - Tome 2 : Elles - Universelle(s)', 'dbgvfdbfdgbhdfhb', 'blabla@gmail.com', 'mayamanuella@gmail.com', 55, 1, '2022-10-04 12:05:22');

-- --------------------------------------------------------

--
-- Structure de la table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
CREATE TABLE IF NOT EXISTS `orderdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `beer_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `totalAmount` double NOT NULL,
  `creationTimestamp` datetime NOT NULL,
  `status` varchar(10) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `sub_categories`
--

DROP TABLE IF EXISTS `sub_categories`;
CREATE TABLE IF NOT EXISTS `sub_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) COLLATE utf8_bin NOT NULL,
  `id_cat` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cat` (`id_cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `tri_humour`
--

DROP TABLE IF EXISTS `tri_humour`;
CREATE TABLE IF NOT EXISTS `tri_humour` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `humourGender` varchar(60) COLLATE utf8_bin NOT NULL,
  `id_cat` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cat` (`id_cat`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `tri_humour`
--

INSERT INTO `tri_humour` (`id`, `humourGender`, `id_cat`) VALUES
(1, 'Dessinateur de presse', 3),
(2, 'BD humour politique', 3),
(3, 'Guide BD humour', 3),
(4, 'BD humour adulte', 3),
(5, 'BD humour jeunesse', 3);

-- --------------------------------------------------------

--
-- Structure de la table `tri_jeunesse`
--

DROP TABLE IF EXISTS `tri_jeunesse`;
CREATE TABLE IF NOT EXISTS `tri_jeunesse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `age` varchar(60) COLLATE utf8_bin NOT NULL,
  `id_cat` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cat` (`id_cat`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `tri_jeunesse`
--

INSERT INTO `tri_jeunesse` (`id`, `age`, `id_cat`) VALUES
(1, '6-9 ans', 1),
(2, '9-13 ans', 1);

-- --------------------------------------------------------

--
-- Structure de la table `tri_mangabygender`
--

DROP TABLE IF EXISTS `tri_mangabygender`;
CREATE TABLE IF NOT EXISTS `tri_mangabygender` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` varchar(60) COLLATE utf8_bin NOT NULL,
  `id_cat` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cat` (`id_cat`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `tri_mangabygender`
--

INSERT INTO `tri_mangabygender` (`id`, `gender`, `id_cat`) VALUES
(1, 'Shonen (garçon)', 7),
(2, 'Shojo (fille)', 7),
(3, 'Seinen public averti (jeune adulte)', 7),
(4, 'Kodomo (manga pour enfants)', 7),
(5, 'Yaoi, yuni (gay et lesbien)', 7),
(6, 'Manga Harem et Ecchi', 7),
(7, 'Hentaï (érotique)', 7);

-- --------------------------------------------------------

--
-- Structure de la table `tri_mangabytheme`
--

DROP TABLE IF EXISTS `tri_mangabytheme`;
CREATE TABLE IF NOT EXISTS `tri_mangabytheme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `theme` varchar(60) COLLATE utf8_bin NOT NULL,
  `id_cat` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cat` (`id_cat`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `tri_mangabytheme`
--

INSERT INTO `tri_mangabytheme` (`id`, `theme`, `id_cat`) VALUES
(1, 'manga Arts Martiaux & Baston', 7),
(2, 'Manga et Gourmets', 7),
(3, 'Manga Fantastique', 7),
(4, 'Manga Héroïc-Fantasy', 7),
(5, 'Manga d\'Humour', 7),
(6, 'Manga Policier, Suspense', 7),
(7, 'Manga Science-Fiction & Cyber-Punk', 7),
(8, 'Manga Sport', 7);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(90) COLLATE utf8_bin NOT NULL,
  `nickName` varchar(90) COLLATE utf8_bin NOT NULL,
  `firstName` varchar(90) COLLATE utf8_bin NOT NULL,
  `lastName` varchar(90) COLLATE utf8_bin NOT NULL,
  `password` varchar(120) COLLATE utf8_bin NOT NULL,
  `address` varchar(60) COLLATE utf8_bin NOT NULL,
  `zip` int(5) NOT NULL,
  `city` varchar(45) COLLATE utf8_bin NOT NULL,
  `lat` varchar(45) COLLATE utf8_bin NOT NULL,
  `lng` varchar(45) COLLATE utf8_bin NOT NULL,
  `validate` varchar(5) COLLATE utf8_bin NOT NULL,
  `creationTimestamp` datetime NOT NULL,
  `phone` varchar(45) COLLATE utf8_bin NOT NULL,
  `role` varchar(10) COLLATE utf8_bin NOT NULL,
  `key_id` varchar(90) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `email`, `nickName`, `firstName`, `lastName`, `password`, `address`, `zip`, `city`, `lat`, `lng`, `validate`, `creationTimestamp`, `phone`, `role`, `key_id`) VALUES
(1, 'mayamanuella@gmail.com', 'Manu971', 'Manuella', 'Maya', '$2a$10$YeULDjne9zQ927py5hKQCuzcrsdefdWGGpruydofgbYBnPuy4U1UO', '49 BIS FAUBOURG SAINT MICHEL', 81800, 'RABASTENS', '43.8264606', '1.7208574', 'yes', '2022-08-30 14:40:53', '0637180517', 'user', 'NF18RhZgt0xqr2EuGmZqZgr1wBFPc5'),
(2, 'client4@gmail.com', 'Manu2', 'Mamuella2', 'MAYA2', '$2a$10$mJuyqwuKFDya7L0houumt.sjcCvP8lbb38BSHMIph89v.USvbLUHG', 'rue des vrais', 31000, 'Toulouse', '1', '2', 'yes', '2022-08-13 17:32:32', '0604060807', 'user', 'l0RhVwasTpXT4vQcRov2w4CqFzZiJY'),
(54, 'maya@gmail.com', 'Manu3', 'Manuella', 'Manuella', '$2a$10$FIo6cz5OFkPv0HLTU5M7u.hy2dnu.9j6uLq0y1S6Ioefb1Zl8Tdp.', '49 BIS FAUBOURG SAINT MICHEL', 81800, 'RABASTENS', '43.8264606', '1.7208574', 'no', '2022-10-03 15:50:06', '0637180517', 'user', 'EaJgtdiiPfRV1hjAgtBxeGDJrZtcrV'),
(55, 'mayamanuella3@gmail.com', 'Manu22', 'Manuella', 'Manuella', '$2a$10$y5cavVG8t9uf5l4/GFNiWu.1V7qnbKvEfes/Gax34WDyUhdAA7b3a', '49 BIS FAUBOURG SAINT MICHEL', 81800, ' RABASTENS', '43.8264606', '1.7208574', 'no', '2022-10-03 15:52:07', '0637180517', 'user', 'HvPxFIprWuT3dfCdZnxI0G3Y5BgvrJ'),
(56, 'testfinal@gmail.com', 'crapule', 'Manuella', 'Manuella', '$2a$10$m2jK88sOHt21EcnWDjoJ1.Ve6bIH5JadBI36HXYy3rTjFM.pLppQG', '49 BIS FAUBOURG SAINT MICHEL', 81800, 'RABASTENS', '43.8264606', '1.7208574', 'no', '2022-10-04 14:45:49', '0637180517', 'user', 'jvaft8zQ0PVwM7OxYG69vEhiK2eXpa');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
