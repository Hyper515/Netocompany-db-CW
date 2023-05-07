--
-- File generated with SQLiteStudio v3.4.3 on Tue Apr 11 13:03:31 2023
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Appointment
CREATE TABLE IF NOT EXISTS Appointment (
    RefNo  INTEGER     NOT NULL,
    Date   DATE        NOT NULL,
    Time   VARCHAR (5) NOT NULL,
    Note   TEXT,
    Cost   REAL        NOT NULL,
    Status INTEGER     NOT NULL,
    NhsNo  INTEGER     NOT NULL
                       REFERENCES Patient (NhsNO),
    Id     INTEGER     NOT NULL
                       REFERENCES Staff (Id),
    PRIMARY KEY (
        RefNo
    ),
    FOREIGN KEY (
        NhsNo
    )
    REFERENCES Patient (NhsNO),
    FOREIGN KEY (
        Id
    )
    REFERENCES Staff (Id) 
);

INSERT INTO Appointment (RefNo, Date, Time, Note, Cost, Status, NhsNo, Id) VALUES (1, '2023-04-10', '10:00', 'Poisoning', 100.0, 0, 1234567890, 1);
INSERT INTO Appointment (RefNo, Date, Time, Note, Cost, Status, NhsNo, Id) VALUES (2, '2023-04-11', '11:00', 'Pneumonia', 150.0, 0, 2345678901, 1);
INSERT INTO Appointment (RefNo, Date, Time, Note, Cost, Status, NhsNo, Id) VALUES (3, '2023-04-10', '09:00', 'Flu shot', 35.0, 0, 1234567350, 4);
INSERT INTO Appointment (RefNo, Date, Time, Note, Cost, Status, NhsNo, Id) VALUES (4, '2023-04-11', '11:00', 'Annual checkup', 50.0, 0, 2345678961, 5);
INSERT INTO Appointment (RefNo, Date, Time, Note, Cost, Status, NhsNo, Id) VALUES (5, '2023-04-12', '14:00', 'X-ray', 75.0, 0, 3456789012, 6);
INSERT INTO Appointment (RefNo, Date, Time, Note, Cost, Status, NhsNo, Id) VALUES (6, '2023-04-13', '16:00', 'Intestinal infectious diseases', 100.0, 0, 4567890123, 7);

-- Table: Patient
CREATE TABLE IF NOT EXISTS Patient (
    NhsNo    INTEGER       NOT NULL
                           UNIQUE,
    Forename VARCHAR (255) NOT NULL,
    Surname  VARCHAR (255) NOT NULL,
    Dob      DATE          NOT NULL,
    Gender   VARCHAR (1)   NOT NULL,
    Email    TEXT          NOT NULL
                           UNIQUE,
    MobNo    INTEGER       NOT NULL,
    Address  VARCHAR (255) NOT NULL,
    Postcode VARCHAR (15)  NOT NULL,
    PRIMARY KEY (
        NhsNo
    )
);

INSERT INTO Patient (NhsNo, Forename, Surname, Dob, Gender, Email, MobNo, Address, Postcode) VALUES (1234567350, 'Micheal', 'Bridget', '1980-01-01', 'male', 'john.doe@example.com', 5551234, '123 Main St', 'W1A 1AA');
INSERT INTO Patient (NhsNo, Forename, Surname, Dob, Gender, Email, MobNo, Address, Postcode) VALUES (1234567890, 'Alice', 'Jones', '1980-01-15', 'F', 'alicejones@gmail.com', 5559876, '789 Elm St, Anytown', 'AB1 2CD');
INSERT INTO Patient (NhsNo, Forename, Surname, Dob, Gender, Email, MobNo, Address, Postcode) VALUES (2345678901, 'Bob', 'Brown', '1975-03-10', 'M', 'bobbrown@gmail.com', 5554321, '456 Maple St, Anytown', 'CD3 4EF');
INSERT INTO Patient (NhsNo, Forename, Surname, Dob, Gender, Email, MobNo, Address, Postcode) VALUES (2345678961, 'Jane', 'Smith', '1990-02-02', 'F', 'jane.smith@example.com', 5552345, '456 Oak Ave', 'SW1A 2AA');
INSERT INTO Patient (NhsNo, Forename, Surname, Dob, Gender, Email, MobNo, Address, Postcode) VALUES (3456789012, 'David', 'Brown', '1985-03-03', 'M', 'david.brown@example.com', 5553456, '789 Maple Rd', 'SE1 7PB');
INSERT INTO Patient (NhsNo, Forename, Surname, Dob, Gender, Email, MobNo, Address, Postcode) VALUES (4567890123, 'Emily', 'Johnson', '1995-04-04', 'F', 'emily.johnson@example.com', 5554567, '321 Elm St', 'E1 6QR');

-- Table: Staff
CREATE TABLE IF NOT EXISTS Staff (
    Id         INTEGER       NOT NULL
                             UNIQUE,
    Forename    VARCHAR (255) NOT NULL,
    Surname    VARCHAR (255) NOT NULL,
    Dob        DATE          NOT NULL,
    Gender     VARCHAR (1)   NOT NULL,
    Email      VARCHAR (255) NOT NULL
                             UNIQUE,
    MobNo      INTEGER,
    Address    INTEGER,
    Profession VARCHAR (255) NOT NULL,
    PRIMARY KEY (
        Id,
        Forename
    )
);

INSERT INTO Staff (Id, Forename, Surname, Dob, Gender, Email, MobNo, Address, Profession) VALUES (1, 'John', 'Raymin', '1985-05-20', 'M', 'johnraymin@hospital.com', 5551234, '123 Main St, Anytown', 'Cardiologist');
INSERT INTO Staff (Id, Forename, Surname, Dob, Gender, Email, MobNo, Address, Profession) VALUES (2, 'Jane', 'Smith', '1990-07-15', 'F', 'janesmith@hospital.com', 5555678, '456 High St, Anytown', 'Gynecologist');
INSERT INTO Staff (Id, Forename, Surname, Dob, Gender, Email, MobNo, Address, Profession) VALUES (4, 'Maria', 'Gonzalez', '1985-06-02', 'F', 'maria.gonzalez@example.com', 5551234, '123 Main St', 'Oncologist');
INSERT INTO Staff (Id, Forename, Surname, Dob, Gender, Email, MobNo, Address, Profession) VALUES (5, 'John', 'Smith', '1978-08-11', 'M', 'john.smith@example.com', 5552345, '456 Oak Ave', 'Urologist');
INSERT INTO Staff (Id, Forename, Surname, Dob, Gender, Email, MobNo, Address, Profession) VALUES (6, 'Sara', 'Lee', '1990-01-22', 'F', 'sara.lee@example.com', 5553456, '789 Maple Rd', 'Neurologist');
INSERT INTO Staff (Id, Forename, Surname, Dob, Gender, Email, MobNo, Address, Profession) VALUES (7, 'Robert', 'Johnson', '1982-04-15', 'M', 'robert.johnson@example.com', 5554567, '321 Elm St', 'Dentist');
INSERT INTO Staff (Id, Forename, Surname, Dob, Gender, Email, MobNo, Address, Profession) VALUES (8, 'Alfie', 'Lux', 19800101, 'M', 'alfie.lux@neto.com', 1234567890, '123 Main St', 'Admin');
INSERT INTO Staff (Id, Forename, Surname, Dob, Gender, Email, MobNo, Address, Profession) VALUES (9, 'Margret', 'Newman', 19750115, 'F', 'margret.newman@neto.com', 987654321, '456 High St', 'Pediatrician');
INSERT INTO Staff (Id, Forename, Surname, Dob, Gender, Email, MobNo, Address, Profession) VALUES (10, 'Bob', 'Smith', 19850403, 'M', 'bob.smith@neto.com', 1112223333, '789 Low St', 'Admin');
INSERT INTO Staff (Id, Forename, Surname, Dob, Gender, Email, MobNo, Address, Profession) VALUES (11, 'Mary', 'Johnson', 19901122, 'F', 'mary.johnson@neto.com', 4445556666, '987 High St', 'Radiologist');
INSERT INTO Staff (Id, Forename, Surname, Dob, Gender, Email, MobNo, Address, Profession) VALUES (12, 'David', 'Lee', 19820910, 'M', 'david.lee@neto.com', 7778889999, '246 Main St', 'Surgeon');
INSERT INTO Staff (Id, Forename, Surname, Dob, Gender, Email, MobNo, Address, Profession) VALUES (13, 'Linda', 'Garcia', 19790807, 'F', 'linda.garcia@neto.com', 2223334444, '135 High St', 'Admin');
INSERT INTO Staff (Id, Forename, Surname, Dob, Gender, Email, MobNo, Address, Profession) VALUES (14, 'Jason', 'Kim', 19881119, 'M', 'jason.kim@neto.com', 5556667777, '789 Main St', 'Admin');
INSERT INTO Staff (Id, Forename, Surname, Dob, Gender, Email, MobNo, Address, Profession) VALUES (15, 'Karen', 'Nguyen', 19940214, 'F', 'karen.nguyen@neto.com', 8889990000, '456 Low St', 'Haematologists');

-- Table: Vaccines
CREATE TABLE IF NOT EXISTS Vaccines (
    DoseNo          INTEGER       NOT NULL
                                  UNIQUE,
    Date            INTEGER       NOT NULL,
    Manufacturer    TEXT          NOT NULL,
    DiseaseTargeted TEXT          NOT NULL,
    Product         TEXT          NOT NULL,
    BatchNo         VARCHAR (255) NOT NULL,
    Country         TEXT          NOT NULL,
    Authority       TEXT          NOT NULL,
    Site            VARCHAR (255) NOT NULL,
    Doses           NUMERIC       NOT NULL,
    DisplayName     TEXT          NOT NULL,
    SnomedCode      VARCHAR (255) NOT NULL,
    DateEntered     TEXT          NOT NULL,
    ProducereCode   VARCHAR (255) NOT NULL,
    Booster         VARCHAR (255) NOT NULL,
    NhsNo           INTEGER       REFERENCES Patient (NhsNo),
    Type            TEXT          NOT NULL,
    PRIMARY KEY (
        DoseNo
    ),
    FOREIGN KEY (
        NhsNo
    )
    REFERENCES Patient
);

INSERT INTO Vaccines (DoseNo, Date, Manufacturer, DiseaseTargeted, Product, BatchNo, Country, Authority, Site, Doses, DisplayName, SnomedCode, DateEntered, ProducereCode, Booster, NhsNo, Type) VALUES (1, '2023-03-30', 'Pfizer-BioNTech', 'COVID-19', 'Comirnaty', 'ABC123', 'USA', 'FDA', 'Anytown Hospital', 1, 'COVID-19 vaccine, mRNA, LNP-S, 30�g/0.3mL dose', '1234567890123456', '2023-03-30', '987654321', '', 1234567890, 'COVID-19');
INSERT INTO Vaccines (DoseNo, Date, Manufacturer, DiseaseTargeted, Product, BatchNo, Country, Authority, Site, Doses, DisplayName, SnomedCode, DateEntered, ProducereCode, Booster, NhsNo, Type) VALUES (2, '2023-03-31', 'Moderna', 'COVID-19', 'Spikevax', 'XYZ789', 'USA', 'FDA', 'Anytown Hospital', 1, 'COVID-19 vaccine, mRNA, LNP-S, 30�g/0.3mL dose', '2345678901234567', '2023-03-31', '987654321', '', 2345678901, 'COVID-19');
INSERT INTO Vaccines (DoseNo, Date, Manufacturer, DiseaseTargeted, Product, BatchNo, Country, Authority, Site, Doses, DisplayName, SnomedCode, DateEntered, ProducereCode, Booster, NhsNo, Type) VALUES (3, '2022-01-01', 'Pfizer', 'COVID-19', 'Comirnaty', 'ABC123', 'USA', 'FDA', 'Hospital', 1, 'COVID-19 vaccine dose 1', '840533007', '2022-01-01', '987654321', '', 1234567350, 'MRNA');
INSERT INTO Vaccines (DoseNo, Date, Manufacturer, DiseaseTargeted, Product, BatchNo, Country, Authority, Site, Doses, DisplayName, SnomedCode, DateEntered, ProducereCode, Booster, NhsNo, Type) VALUES (4, '2022-01-15', 'Pfizer', 'COVID-19', 'Comirnaty', 'DEF456', 'USA', 'FDA', 'Clinic', 2, 'COVID-19 vaccine dose 2', '840533007', '2022-01-15', '987654321', '', 2345678961, 'MRNA');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
