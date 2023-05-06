const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('patients.Vo2.db');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

// Render main start page on start up
app.get('/', (req, res) => {
  res.render('StartPage');
});

// ------------------------------------------------------------------------------------
// Show the Staff Login Page
app.get('/loginStaff', (req, res) => {
  // needs to render "AdminLoginPage" instead of redirecting to "/Admins" below. 
  // use PatientLoginPage.pug as a template
  // AdminLoginPage is also used in the /loginStaff route  

  // res.render('AdminLoginPage');
  res.redirect('/Admins');
});

// Staff Login validation
app.post('/loginStaff', (req, res) => {
  const forename = req.body.forename;
  const surname = req.body.surname;
  const Id = req.body.password;

  // Check if staff credentials are correct
  db.all('SELECT * FROM Staff WHERE Forename = ? AND Surname = ? AND Id = ?', [forename, surname, Id], function(err, rows) {
    if (err) throw err;

    if (rows.length == 1) {
      // Staff login successful, render AdminRecordsPage.pug
      res.redirect(`/AdminRecords/${Id}`);
    } else {
      // Staff login failed, render login.pug with error message
      res.render('AdminLoginPage', { message: 'Invalid credentials' });
    }
  });
});

// ------------------------------------------------------------------------------------

// Show the Patient Login Page
app.get('/loginPatient', (req, res) => {
  res.render('PatientLoginPage');
});

// Patient Login validation
app.post('/loginPatient', (req, res) => {
  var forename = req.body.forename;
  var surname = req.body.surname;
  var NhsNo = req.body.password;

  // perform authentication check with database
  db.all('SELECT * FROM Patient WHERE Forename = ? AND Surname = ? AND NhsNo = ?', [forename, surname, NhsNo], function(err, rows) {
    if (err) throw err;

    //Checks that only one row comes back from the database
    if (rows.length == 1) {
      // login successful
      res.redirect(`/PatientRecords/${NhsNo}`);
    } else {
      // login failed
      res.render('PatientLoginPage', { message: 'Invalid login details' });
    }
  });
});
// ------------------------------------------------------------------------------------

app.get('/Admins', (req, res) => {
  db.all(`SELECT * FROM Staff WHERE Profession != 'Admin'`, (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('StaffIndexPage', { staffs: rows });
  });
});

app.get('/AdminRecords/:id', (req, res) => {
  const id = req.params.id;

  db.get('SELECT * FROM Staff WHERE Id = ?', id, (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      res.render('AdminRecordsPage', { staff: row });
    }
  });
});

// Get route for the edit page
app.get('/AdminEditPage/:id', (req, res) => {
  const staffId = req.params.id;

  // Retrieve the staff member from the database
  db.get('SELECT * FROM Staff WHERE Id = ?', [staffId], (error, row) => {
    if (error) throw error;

    // Render the edit page with the staff member's data
    res.render('AdminEditPage', { staff: row });
  });
});

// Post route for updating a staff member's data
app.post('/AdminSaveToDB/:Id', (req, res) => {
  const staffId = req.params.Id;
  const { forename, surname, dob, gender, email, mobNo, address, profession } = req.body;

  // Update the staff member's data in the database
  db.run(
    'UPDATE Staff SET Forename = ?, Surname = ?, Dob = ?, Gender = ?, Email = ?, MobNo = ?, Address = ?, Profession = ? WHERE Id = ?',
    [forename, surname, dob, gender, email, mobNo, address, profession, staffId],
    (error, results) => {
      if (error) throw error;

      // Redirect to the staff member's view page
      res.redirect(`/AdminRecords/${staffId}`);
    }
  );
});

// Render Patient Index page
app.get('/patients', (req, res) => {
  db.all('SELECT * FROM Patient', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render('PatientIndexPage', { Patient: rows });
    }
  });
});

// Render the Patient index page with only the matching name and surnames
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

// Render Patient records page
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

// Render the patient edit form 
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

// Save changes of a patient
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


app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});