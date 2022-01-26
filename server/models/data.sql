USE jobManagerDB;

INSERT INTO userproporties VALUES(NULL,"Sara","Ziada","sziada276@gmail.com","050-7339214","1234");
INSERT INTO Candidate VALUES(1,'Student',false,'Atidna 1',NULL);

DELETE FROM Admin;

INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
VALUES(NULL,"Intel","Full Stack Developer","Haifa",'linkedIn',"h://..",1);

INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
VALUES(NULL,"Amdocs","Full Stack","Nazareth",'friend',"h://..",1);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Phone',"Avi","Passed",1);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('HR',"Avi","Pending",1);

USE jobManagerDB;

INSERT INTO userproporties VALUES(NULL,Null,"Ameer","","admin@gmail.com","","1234",true);
INSERT INTO Admin VALUES(2,true);


