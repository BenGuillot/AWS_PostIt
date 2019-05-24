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
    await knex.raw(`DROP TABLE IF EXISTS users`);  
    await knex.raw(`CREATE TABLE users 
                      (id VARCHAR(255) PRIMARY KEY,
                      pwd VARCHAR(255) NOT NULL)`);
    
    // await knex('users').columnInfo();
    await knex.raw(`INSERT INTO users (id, pwd)
                          VALUES
                          ('FAHEI','faudraChangerCa'),
                          ('LAU', 'caAussi')`);
  
    console.log(await knex.select('*').from('users'));
  
    await knex.destroy();
  }catch(error){
      console.error(error);
  }
}

async function vue(){
  try{
    await knex.raw(`DROP VIEW IF EXISTS  postitUsers`);
    // PAS UN BON WHERE EN FAIT !!
    await knex.raw(`CREATE VIEW superUser as
                    SELECT *
                    FROM postit p, users u
                    WHERE p.author = u.id`);
    
    await knex.destroy();
  }
  catch(error){
    console.error(error);
  }
}

async function role(){
  try{
    await knex.raw(`DROP ROLE IF EXISTS superUser`);
    await knex.raw(`CREATE ROLE superUser`);
    /// DU COUP CA NE VA PAS MARCHER CA !!
    await knex.raw(`GRANT SELECT INSERT UPDATE DELETE
                    ON postitUsers
                    TO superUser
                    [WITH GRANT OPTIONS] `);
    await knex.raw(`GRANT superUser
                    TO users`);
    
    await knex.destroy();
  }
  catch(error){
    console.error(error);
  }
}



foo();
// vue();
// role();