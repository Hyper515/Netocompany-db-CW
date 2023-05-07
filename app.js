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
  const { txtForename, txtSurname} = req.query;
  console.log(txtForename)
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

// Save changes to an appointment
app.post('/appointment/:refNo/save', (req, res) => {
  const refNo = req.params.refNo;
  const { txtDate, txtTime, txtNote, txtCost, txtStatus, txtNhsNo, txtId, txtReason } = req.body;
  db.run(`UPDATE Appointment SET Date = ?, Time = ?, Note = ?, Cost = ?, Status = ?, NhsNo = ?, Id = ?, Reason = ? WHERE RefNo = ?`,
    [txtDate, txtTime, txtNote, txtCost, txtStatus, txtNhsNo, txtId, txtReason, refNo], (err) => {
      if (err) {
        console.error(err.message);
      }
      res.redirect('/appointments');
    });
});

// Render the appointment edit form
app.get('/Appointment/:refNo/edit', (req, res) => {
  const refNo = req.params.refNo;
  db.get(`SELECT * FROM Appointment WHERE RefNo = ?`, [refNo], (err, row) => {
    if (err) {
      console.error(err.message);
    }
    db.all(`SELECT Id, Forename, Surname, Profession FROM Staff WHERE Profession != 'Admin'`, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.render('AppointmentEditPage', { title: 'Edit Appointment', appointment: row, doctors: rows });
    });
  });
});

// Save changes to an appointment
app.post('/appointment/:refNo/save', (req, res) => {
  const refNo = req.params.refNo;
  const { txtDate, txtTime, txtNote, txtCost, txtStatus, txtNhsNo, txtId } = req.body;
  db.run(`UPDATE Appointment SET Date = ?, Time = ?, Note = ?, Cost = ?, Status = ?, NhsNo = ?, Id = ? WHERE RefNo = ?`,
    [date, time, note, cost, status, nhsNo, id, refNo], (err) => {
      if (err) {
        console.error(err.message);
      }
      res.redirect('/appointments');
    });
});

// Ivan's Work

app.get('/Vaccines', (req, res) => {
  const { NhsNo } = req.query;
  db.all('SELECT * FROM Vaccines WHERE NhsNo = ?', [NhsNo], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render('VaccineRecordsPage', { Vaccines: rows});
    }
  });
});

app.get('/appointment', (req, res) => {
  db.all('SELECT * FROM Appointment', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render('DoctorBookedAppointments', { Appointment: rows });
    }
  });
});

// _______________________________________________________________


app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});