const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('patients.Vo2.db');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('StartPage');
});

app.get('/patients', (req, res) => {
  db.all('SELECT * FROM Patient', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render('PatientIndexPage', { Patient: rows });
    }
  });
});

app.get('/Patient', (req, res) => {
  const { txtForename, txtSurname } = req.query;
  db.all(`SELECT * FROM Patient WHERE Forename LIKE '%${txtForename}%' AND Surname LIKE '%${txtSurname}%'`, (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render('PatientIndexPage', { Patient: rows });
    }
  });
});

app.get('/PatientRecords/:NhsNo', (req, res) => {
  const { NhsNo } = req.params;
  db.get('SELECT * FROM Patient WHERE NhsNo = ?', [NhsNo], (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render('PatientPersonalRecordsPage', { patient: row });
    }
  });
});

app.get('/PatientEditPage/:NhsNo', (req, res) => {
  const { NhsNo } = req.params;
  db.get('SELECT * FROM Patient WHERE NhsNo = ?', [NhsNo], (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render('PatientEditPage', { patient: row });
    }
  });
});

app.post('/PatientSaveToDB/:NhsNo', (req, res) => {
  const { NhsNo } = req.params;
  const { txtForename, txtSurname, txtDob, txtGender, txtAddress, txtPostcode, txtMobNo } = req.body;
  db.run('UPDATE Patient SET Forename = ?, Surname = ?, Dob = ?, Gender = ?, Address = ?, Postcode = ?, MobNo = ? WHERE NhsNo = ?', [txtForename, txtSurname, txtDob, txtGender, txtAddress, txtPostcode, txtMobNo, NhsNo], (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.redirect(`/PatientRecords/${NhsNo}`);
    }
  });
});

app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});