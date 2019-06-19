const env = {
  database: 'test',
  username: 'root',
  password: 'netcat2025',
  host: 'localhost',
  dialect: 'mariadb',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  force: false
};
  
module.exports = env;