import mysql from 'mysql';

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

class Database {
  constructor() {
    this.connection = mysql.createConnection(config);
  }

  query(sql, values) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  close() {
    this.connection.end();
  }
}

class People {
  constructor() {
    this.db = new Database();
    this.createTable();
  }

  async createTable() {
    try {
      const create = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`;
      await this.db.query(create);
    } catch (err) {
      console.error('Error creating table:', err);
    }
  }

  async all() {
    try {
      const result = await this.db.query('SELECT * FROM people');
      return result;
    } catch (err) {
      console.error('Error retrieving data:', err);
      return [];
    }
  }

  async create(name) {
    try {
      const result = await this.db.query('INSERT INTO people(name) VALUES(?)', [name]);
      return result;
    } catch (err) {
      console.error('Error creating person:', err);
      return null;
    }
  }

  close() {
    this.db.close();
  }
}

export default People;
