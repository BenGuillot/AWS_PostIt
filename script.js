
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

app.listen(process.env.PORT);
/*app.listen(8080,() =>{
  console.log('server started!');
});*/

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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
//******************************************************************************************************************************** */
//HANDLERS

app.all('/',async function(req,res){
  let postit = await knex.select('*').from('postit');
  res.render(__dirname+'/views/postit.html', {"uid" : uid,
                                              "name" : req.session.login,
                                              "postit" : postit
                                              });
});

//********************************************************************************************************************************
//AJOUT D'UN UTILISATEUR
app.get('/signup',function(req,res){
  res.redirect('/s/signup.html');
});

app.post('/signup',async function(req,res){
  if (await testValueExist(req.body.id, req.body.pwd)==false){
    try{
      await knex.raw('INSERT INTO users VALUES (?,?)',
                     [req.body.id, req.body.pwd]);
    }catch(error){
      console.error(error);
      res.redirect('/s/signup.html');
    }    
    let postit = await knex.select('*').from('postit');
    res.render(__dirname+'/views/postit.html', { "uid" : 1,
                                                 "name" : req.body.id,
                                                 "postit" : postit});
  }
  else{
    res.redirect('/s/signup.html');
  }
});

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
    uid = 1;
    response.redirect('/');
  }
  else {
    response.redirect('/');
  }
});

app.post('/logout',function(req,res){
  req.session.login  = null;
  req.session.password = null;
  uid = 0;
  res.redirect('/');
});

//********************************************************************************************************************************
//AJOUT D'UN POST-IT
app.post('/ajouter',async function(req,res){
  //compte le nombre de postit pour l'id
  let id = 1;
  try {
    var rows = await knex.raw('SELECT * FROM postit');
    for (var r of rows) {
      id+=1;
    }
  } catch (err) {
    console.log(err);
  }

  //gestion de shinyPostIt
  let alea = getRandomInt(100); console.log(alea);
  let type = "postIt";
  if(alea < 5){
    type = "ShinyPostIt";
  }
  
  //ajout du post it
  try{
    await knex.raw('INSERT INTO postit VALUES (?,?,?,?,?,?,?)',
                    [id,req.body.data, req.body.date, req.body.px, req.body.py, req.session.login, type]);
  }catch(error){
    console.error(error);
    res.redirect('/');
  } 
  console.log('post it succesfully added');   
  res.redirect('/');
});

//MODIFICATION D'UN POST-IT
app.get('/modifier', async function(req, res){
});

app.post('/modifier', async function(req, res){
  if(req.body.author == req.session.login){
    try{
      await knex.raw('UPDATE postit SET data = (?) WHERE',
                      [req.body.data]);
    }
    catch(error){
      console.error(error);
      res.redirect('/');
    }
    res.redirect('/');
  }
});

//SUPRESSION D'UN POST-IT
app.post('/effacer',async function(req,res){
  if(req.body.author == req.session.login ){
    try{
      await knex('postit').where('id',req.body.id).del();
    }
    catch(error){
      console.error(error);
      res.redirect('/');
    }
    console.log('post it succesfully deleted');
  }
  else{
    console.log('Hun Hun, you can\'t do that little one');
  }
  res.redirect('/');
  
});

//********************************************************************************************************************************
//PAS ENCORE IMPLEMENTE




app.all('/s/list',function(req,res){
  res.send("List!");
});


