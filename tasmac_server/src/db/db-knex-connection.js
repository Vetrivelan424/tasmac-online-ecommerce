const knex = require('knex');
const config = require('../config/config');

const db = knex({
  client: 'mysql2',
  connection: {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    charset: 'utf8mb4'
  },
  pool: { min: 2, max: 10 }
});

module.exports = db;
