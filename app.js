const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('patients.Vo2.db');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  db.all('SELECT * FROM Patient', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render('index', { Patient: rows });
    }
  });
});

app.get('/search', (req, res) => {
  const { query } = req.query;
  db.all(`SELECT * FROM Patient WHERE Forename LIKE '%${query}%'`, (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render('index', { Patient: rows });
    }
  });
});

app.get('/edit/:NhsNo', (req, res) => {
  const { NhsNo } = req.params;
  db.get('SELECT * FROM Patient WHERE NhsNo = ?', [NhsNo], (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render('edit', { patient: row });
    }
  });
});

app.post('/edit/:NhsNo', (req, res) => {
  const { NhsNo } = req.params;
  const { Forename, Dob, Gender, MobNo } = req.body;
  db.run('UPDATE Patient SET Forename = ?, Dob = ?, Gender = ?, MobNo = ? WHERE NhsNo = ?', [Forename, Dob, Gender, MobNo, NhsNO], (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.redirect('/');
    }
  });
});

app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});