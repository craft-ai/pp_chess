const pg = require('pg');

function initDatabase(pgPool) {
  return pgPool.query(`
    CREATE TABLE chess_game (id UUID PRIMARY KEY, user_id UUID);
    CREATE TABLE move (id UUID, movement TEXT);
  `);
}

function getDatabasePool() {
  const pgPool = new pg.Pool({
    user: 'postgres',
    password: 'verySecuredPasswordWithSpecialCharacter',
    database: 'postgres',
    port: 5432,
    host: 'ahtohallan',
    max: 30,
  });

  return pgPool;
}

module.exports = {
  getDatabasePool,
  initDatabase,
};
