README 


Projet d'AWS - Post It
======================
_Par Benjamin Guillot et Laureline Martin_


**************
 Côté serveur 
--------------
**************

Le coeur du projet se trouve dans le fichier "script.js", le coté serveur de l'application.
Il contient les différentes routes :
- La route '/' représente la page d'accueil. Sur ce page, il est possible de voir l'ensemble des post-it public grâce 
à une reqête SQL si l'utilisateur est déconnecté. Sinon, L'ensmble des post-it public est afficher ainsi que
les post-it privés de l'utilisateurs grâce à une requête SQL.
Les données "uid", "session.login" et le résultat de la requête de sélection en SQL est envoyé à "views/postit.html".
- La route "/signup" permet de de créer un nouveau compte. Elle renvoie vers "/s/signup.html". Elle récupère un 
identifiant et un mot de passe donné par un utilisateur, elle vérifie grâce à la fonction "testValueExist(login, password)"
que cette combinaison identifiant/mot de passe n'existe pas et grâce à une requête d'insertion SQL ajoute ce nouveau compte.
En cas d'erreur ou de compte déjà existant, l'utilisateur est renvoyer vers "/s/signup.html", sinon il est 
renvoyer vers "/".
- La route "/login" : permet de se connecter. Elle récupère l'identifiant et le mot de passe fourni par l'utilisateur,
vérifie grâce à la fonction "testValueExist(login, password)" que la combinaison identifiant/mot de passe existe et
affecte les identifiants et mot de passes réciproquement à session.login et session.password et uid = 1. L'utilisateur
est redirigé vers "/".
- La route "/logout" permet dese déconnecter. Elle affecte à session.login et session.password la valeur null et à uid la 
valeur 0. L'utilisateur est ensuite redirigié vers "/".
- La route "/ajouter" permet d'ajouter un nouveau post-it. Une variable locale "id" est initialisée à 1 puis est 
incrémenté du nombre de post-it existant. Puis un nombre alétoire entre 0 est 100 est utilisé pour déterminer si le post-it 
ajouté sera un simple post-it ou un "shinyPostit" (si le nombre est inférieur à 1 alors c'est un "shinyPostit"). Enfin,
le post-it est ajouté grâce à une requête d'insertion SQL. L'utilisateur est redirigé vers "/".
- La route "/modifier" permet de modifier un post-it personnel existant. Grâce à une requête de mise à jour SQL, le post-it est 
modifié avec le nouveau message donné par l'utilsateur. Il est ensuite renvoyer vers "/".
- La route "/effacer" permet d'effacer un post-it personnel existant. Le post-it indiqué par l'utilisateur est supprimer 
grâce à une requête de suppression SQL. Il est ensuite redirigé vers "/".
- Toutes les routes sont accessibles depuis "/" à partir de formulaires.



*************
 Côté client 
-------------
*************

Les fichiers présents dans le dossier "views" représentent la partie client de l'application. 
Les actions générées par le client sont gérés dans le fichier postit.js. Il contient les fonctions :
- initWindow() permettant de créer une table cliquable pour ajouter nos différents post-it.
- getDate() permettant d'obtenir la date courante sous la forme "AAAA-MM-JJ".
- addpostit(event) permettant l'ajout d'un nouveau post-it sous forme d'une table rectangulaire dont le côté en haut à
gauche est de coordonnées (x, y) fourni lors du double clic de l'utilisateur. Cette fonction permet également d'afficher
le texte à ajouter au post-it, un bouton pour valider ainsi que deux checkbox à choix unique pour déterminer si le post-it
sera privé ou public.
- supp(data) permettant de créer un bouton cliquable pour supprimer un post-it. Le post-it est identifié par data 
(cette variable représente l'identifiant du post-it).
- modif(data) permettant de modifier un post-it en créant un formulaire où l'utilisateur pourra entrer le nouveau 
texte. Le post-it à modifier est identifié par data (cette variable représente l'identifiant du post-it).



**********************
 Côté Base de Données 
----------------------
**********************

Deux tables sont utilisées : la table "users" et la table "postit".
- La table users à pour attributs id (varchar(255)) et pwd (vrachar(255)). Elle permet de stocker l'ensemble des 
comptes utilisateurs. 
* La table postit à pour attribut id(intiger), data (varchar(500)), date(datetime), x (intiger), y (intiger), author 
(varchar(255)), type (varchar(255)) et protect (varchar(6)). Elle permet de stocker l'ensemble des post-it créés par des 
utilisateurs.
