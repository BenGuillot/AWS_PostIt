const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./PostIt.sqlite3"
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
                      author VARCHAR(255))`);
                    
    console.log('ca bug ici');
    await knex('postit').columnInfo();
    await knex.raw(`INSERT INTO postit (data,author, x, y)
                          VALUES
                          ('Original Post It', 'Fahei','50','50')`);
  
    console.log(await knex.select('*').from('postit'));
  
    await knex.destroy();
  }catch(error){
      console.error(error);
  }
}

/*async function insertPostIt() {
  try{
    await knex(postit).insert([
                              {data: },
                              {date: },
                              {x: },
                              {y: },
                              {author: },
      ]);
    }
    console.log(await knex.select('*').from('postit'));
    await knex.destroy();
  }catch(error){
      console.error(error);
  }
}*/


createPostIt();