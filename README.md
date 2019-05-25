README 


_Projet d'AWS - Post It_

Par Benjamin Guillot et Laureline Martin



* Côté serveur

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
- La route 


Les fichiers présents dans le dossier "views" représentent la partie client de l'application. 

Les actions générées par le client sont gérés dans le fichier postit.js