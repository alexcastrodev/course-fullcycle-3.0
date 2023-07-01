import express from 'express';
import mysql from 'mysql';
const app = express();

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(config);

const create = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`;
connection.query(create);

const sql = `INSERT INTO people(name) values('Alekinho')`;
connection.query(sql);

connection.end();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server on port 3000');
});