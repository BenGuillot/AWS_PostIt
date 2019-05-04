
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




app.use('/s', express.static('views'))
  .use(bodyP.urlencoded({ extended: false }))
  .use(cookieP())
  .engine('html', consolidate.nunjucks)
  .set('view engine', 'nunjucks');


app.listen(8080,() =>{
  console.log('server started!');
});

//******************************************************************************************************************************** */

app.all('/',function(req,res){
  res.redirect('/views/postit.html');
});

app.get('/signup',function(req,res){
  res.redirect('/views/signup.html');
});

app.post('/signup',async function(req,res){
    try{
      await knex.raw('INSERT INTO users VALUES (?,?)',
                     [req.body.id, req.body.pwd]);
    }catch(error){
      console.error(error);
      res.redirect('/s/signup.html');
    }    
    res.redirect('/userlist');
  }
);

/**AFFICHAGE DE LA BD USER POUR LES TESTS */
app.all('/userlist', async function(req, response) {
  let str2 = await knex.select('*').from('users');
  response.render('userlist.html', {'userlist':str2}); 
});

app.get('/login/:user',function(req,res){
  connected_users[req.params] = new User(req.params);
  res.send("Login!");
});

app.post('/logout/:user',function(req,res){
  res.send("Log out!");
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

