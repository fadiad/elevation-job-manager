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

USE jobManagerDB;
CREATE TABLE Candidate(
    id MEDIUMINT NOT NULL PRIMARY KEY,
    status ENUM('Student','Graduate') DEFAULT 'Student',
    isEmployeed BOOLEAN,
    cohort varchar(10),
    cv BLOB,
    FOREIGN KEY (id) REFERENCES UserProporties(id)
);

USE jobManagerDB;
CREATE TABLE Admin(
    id MEDIUMINT NOT NULL PRIMARY KEY,
    isNotified Boolean,
    FOREIGN KEY (id) REFERENCES UserProporties(id)
);

USE jobManagerDB;
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


USE jobManagerDB;
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

Use jobmanagerdb;

ALTER TABLE UserProporties
  ADD isAdmin boolean DEFAULT false
    AFTER password;

ALTER TABLE UserProporties
  ADD session_id varchar(50) 
    AFTER id;

Use jobManagerDB;
Create TABLE simulation(
        id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date1 Date NOT NULL,
    date2 Date,
    date3 Date,
    InterviewId MEDIUMINT,
    adminId MEDIUMINT,
    FOREIGN Key(InterviewId) REFERENCES Interview(id),
    FOREIGN Key(adminId) REFERENCES Admin(id)
);


Use jobManagerDB;
Drop TABLE IF EXISTS Questions;

Use jobManagerDB;
Create TABLE Questions(
    id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(300) NOT NULL ,
    question VARCHAR(5000) NOT NULL,
    solution VARCHAR(5000),
    InterviewId MEDIUMINT,
    FOREIGN Key(InterviewId) REFERENCES Interview(id)
)COLLATION = utf8_unicode_ci & CHARACTER SET = utf8
ALTER TABLE Interview MODIFY simulationDate datetime;

ALTER TABLE simulation MODIFY date1 datetime;
ALTER TABLE simulation MODIFY date2 datetime;
ALTER TABLE simulation MODIFY date3 datetime;

CREATE table cohort(
    name varchar(10) NOT NULL PRIMARY KEY,
    start_date datetime,
    end_date datetime,
    deadline datetime
)

insert into cohort (name)values("Atidna 1")
insert into cohort (name)values("Atidna 2")
insert into cohort (name)values("Atidna 3")
insert into cohort (name)values("Atidna 4")

ALTER TABLE Candidate ADD FOREIGN KEY (cohort) REFERENCES cohort(name);
