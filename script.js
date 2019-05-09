
//lancer le serveur avec nodejs script.js
var express = require('express');
var app = express();

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
      filename: "mydb.sqlite3"
  },
  useNullAsDefault:true,
  debug: true,
});
const bodyP = require('body-parser');
const cookieP = require('cookie-parser');
const consolidate = require('consolidate');
const expressAsyncErrors = require('express-async-errors');
const session = require('express-session');

/*
import { randomBytes } from "crypto";
*/

/////// Userlist ///////
var connected_users = {};
class users{
  constructor(name) {
    this.name = name;
  }
}

var uid = 0;


app.use('/s', express.static('views'))
  .use(bodyP.urlencoded({ extended: false }))
  .use(cookieP())
  .engine('html', consolidate.nunjucks)
  .set('view engine', 'nunjucks')
  .use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: false,}));


app.listen(8080,() =>{
  console.log('server started!');
});

//********************************************************************************************************************************
//FONCTIONS
async function testValueExist(login, password){
  try {
    var rows = await knex.raw('SELECT * FROM users WHERE id=\"'+login+ '\" AND pwd=\"'+password+'\"');
    var test=false;
    for (var r of rows) {
      test=true;
    }
    return test;
  } catch (err) {
    console.log(err);
  }
}



//******************************************************************************************************************************** */
//HANDLERS

app.all('/',function(req,res){
  res.render(__dirname+'/views/postit.html', {"uid" : 0,
                                "name" : ""});
});

//********************************************************************************************************************************
//AJOUT D'UN UTILISATEUR
app.get('/signup',function(req,res){
  res.redirect('/s/signup.html');
});

app.post('/signup',async function(req,res){
    try{
      await knex.raw('INSERT INTO users VALUES (?,?)',
                     [req.body.id, req.body.pwd]);
    }catch(error){
      console.error(error);
      res.redirect('/s/signup.html');
    }    
    res.render(__dirname+'/views/postit.html', { "uid" : 1,
                                                 "name" : req.body.id});
  }
);

/**AFFICHAGE DE LA BD USER POUR LES TESTS */
app.all('/userlist', async function(req, response) {
  let str2 = await knex.select('*').from('users');
  response.render('userlist.html', {'userlist':str2}); 
});


//********************************************************************************************************************************
//GESTION DE SESSION
app.get('/login', function(request, response) {
  response.redirect('/s/login.html');
});

app.post('/login', async function(request, response) {
  if (await testValueExist(request.body.id, request.body.pwd)==true){
    request.session.login = request.body.id;
    request.session.password = request.body.pwd;
    response.render(__dirname+'/views/postit.html', { "uid" : 1,
                                        "name" : request.body.id});
  }
  else {
    response.redirect('/');
  }
});

app.post('/logout',function(req,res){
  res.redirect('/');
});


/*app.get('/', function(request, response) {
  
  if (request.session.login) {                  
    response.redirect('/userlist');
  } else {
    response.redirect('/login');             
  }
});*/

//********************************************************************************************************************************
//PAS ENCORE IMPLEMENTE
app.get('/login/:user',function(req,res){
  connected_users[req.params] = new User(req.params);
  res.send("Login!");
});

app.all('/ajouter/:user',function(req,res){
  res.send("Ajouter!");
});

app.all('/effacer/:user',function(req,res){
  res.send("Effacer!");
});

app.all('/s/list',function(req,res){
  res.send("List!");
});


