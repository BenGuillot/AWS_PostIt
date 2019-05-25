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
que cette combinaison identifiant/mot de passe n'existe pas et


Les fichiers présents dans le dossier "views" représentent la partie client de l'application. 

Les actions générées par le client sont gérés dans le fichier postit.js