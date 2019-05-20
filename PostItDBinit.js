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
                      z INT(16),
                      author VARCHAR(255),
                      type VARCHAR(255))`);
                    
    console.log('ca bug ici');
    await knex('postit').columnInfo();
    await knex.raw(`INSERT INTO postit (data,author, x, y, type)
                          VALUES
                          ('Original Post It, post enough and you may find a shiny post it !', 'FAHEI','150','150','ShinyPostIt')`);
  
    console.log(await knex.select('*').from('postit'));
  
    await knex.destroy();
  }catch(error){
      console.error(error);
  }
}

createPostIt();