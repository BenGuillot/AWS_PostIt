//lancer le serveur avec nodejs script.js
var express = require('express');
var app = express();

app.use('/s', express.static('app'));


app.listen(8080,() =>{
  console.log('server started!');
});

//******************************************************************************************************************************** */

app.all('/',function(req,res){
  res.send("Post It!");
});

app.all('/signup',function(req,res){
  res.send("Sign Up!");
});

app.all('/login',function(req,res){
  res.send("Login!");
});

app.all('/logout',function(req,res){
  res.send("Log out!");
});

app.all('/ajouter',function(req,res){
  res.send("Ajouter!");
});

app.all('/effacer',function(req,res){
  res.send("Effacer!");
});

app.all('/s/list',function(req,res){
  res.send("List!");
});

