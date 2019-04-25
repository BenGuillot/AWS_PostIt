const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./mydb.sqlite3"
    },
    useNullAsDefault:true,
    debug: true,
});

async function foo() {
  try{
    await knex.raw(`DROP TABLE IF EXISTS postit`);  
  
    await knex.raw(`CREATE TABLE postit 
                      (id VARCHAR(255) PRIMARY KEY,
                      data VARCHAR(500),
                      date datetime,
                      x INT(16),
                      y INT(16),
                      author VARCHAR(255))`);
    
    await knex('postit').columnInfo();
  
    console.log(await knex.select('*').from('postit'));
  
    await knex.destroy();
  }catch(error){
      console.error(error);
  }
    
}



foo();