-- Create DATABASE jobManagerDB;
USE jobManagerDB;
Drop TABLE IF EXISTS UserProporties;
Drop TABLE IF EXISTS Candidate;
Drop TABLE IF EXISTS Admin;
Drop TABLE IF EXISTS Interview;
Drop TABLE IF EXISTS Process;

USE jobManagerDB;
CREATE TABLE UserProporties(
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    firstName varchar(15) NOT NULL,
    lastName varchar(15) NOT NULL,
    email varchar(255) NOT NULL unique,
    phone varchar(11) NOT NULL,
    password varchar(25) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Candidate(
    id MEDIUMINT NOT NULL PRIMARY KEY,
    status ENUM('Student','Graduate') DEFAULT 'Student',
    isEmployeed BOOLEAN,
    cohort varchar(10),
    cv BLOB,
    FOREIGN KEY (id) REFERENCES UserProporties(id)
);

CREATE TABLE Admin(
    id MEDIUMINT NOT NULL PRIMARY KEY,
    isNotified Boolean,
    FOREIGN KEY (id) REFERENCES UserProporties(id)
);

CREATE TABLE Process(
    id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    companyName varchar(20),
    jobTitle varchar(30),
    location varchar(15),
    foundBy ENUM('facebook','linkedIn','friend','other'),
    link TEXT,
    status ENUM('In progress','Passed','Failed') DEFAULT 'In progress' NOT NULL,
    UserId MEDIUMINT NOT NULL,
    FOREIGN KEY(UserId) REFERENCES Candidate(id)
);

CREATE TABLE Interview(
    id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type ENUM ('Phone','HR','Technical','Contract'),
    date Date,
    simulationDate Date,
    interviewerName varchar(15),
    status ENUM('Scheduled','Pending','Passed','Failed','No Reply') DEFAULT 'Scheduled',
    processId MEDIUMINT NOT NULL,
    FOREIGN KEY(processId) REFERENCES Process(id)
);


