--
-- File generated with SQLiteStudio v3.4.3 on Tue Apr 11 13:04:48 2023
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
    NhsNo           INTEGER       REFERENCES Patient (NhsNO),
    Type            TEXT          NOT NULL,
    PRIMARY KEY (
        DoseNo
    ),
    FOREIGN KEY (
        NhsNo
    )
    REFERENCES Patient
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
