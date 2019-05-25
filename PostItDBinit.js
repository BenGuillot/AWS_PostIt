const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./mydb.sqlite3"
    },
    useNullAsDefault:true,
    debug: true,
});

async function createPostIt() {
  try{
    await knex.raw(`DROP TABLE IF EXISTS postit`);  
    await knex.raw(`CREATE TABLE postit 
                      (id INTEGER PRIMARY KEY AUTOINCREMENT,
                      data VARCHAR(500),
                      date datetime,
                      x INT(16),
                      y INT(16),
                      author VARCHAR(255),
                      type VARCHAR(255),
                      protect VARCHAR(255))`);
                    
    await knex('postit').columnInfo();
    await knex.raw(`INSERT INTO postit (data, author, x, y, type, protect)
                          VALUES
                          ('Double click to post, post enough and you may find a shiny post it !', 'FAHEI','150','150','ShinyPostIt', 'public')`);
  
    console.log(await knex.select('*').from('postit').where('protect', 'public'));
  
    await knex.destroy();
  }catch(error){
      console.error(error);
  }
}

createPostIt();