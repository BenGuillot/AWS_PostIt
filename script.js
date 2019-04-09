var express = require('express');
var app = express();

app.use('/s', express.static('truc'));


app.listen(8080,() =>{
  console.log('server started!');
});

//******************************************************************************************************************************** */
/*
app.get('/',function(req,res){
  res.send("Post It!");
});

app.get('/signup',function(req,res){
  res.send("Sign Up!");
});

app.get('/login',function(req,res){
  res.send("Login!");
});

app.get('/logout',function(req,res){
  res.send("Log out!");
});

app.get('/ajouter',function(req,res){
  res.send("Ajouter!");
});

app.get('/effacer',function(req,res){
  res.send("Effacer!");
});

app.get('/list',function(req,res){
  res.send("List!");
});
*/
