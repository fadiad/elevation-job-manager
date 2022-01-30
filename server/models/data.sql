USE jobManagerDB;
select * 
from Interview

-- INSERT INTO userproporties VALUES(NULL,"Sara","Ziada","sziada276@gmail.com","050-7339214","1234");
-- INSERT INTO Candidate VALUES(1,'Student',false,'Atidna 1',NULL);

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

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Phone',"smir","Passed",2);


INSERT INTO userproporties VALUES(NULL,"Amir","Halaby","amir@gmail.com","050-2312673","1234");
INSERT INTO Candidate VALUES(2,'Student',false,'Atidna 4',NULL);

INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
VALUES(3,"Apple","C++ Developer","Tel Aviv",'linkedIn',"h://..",2);

INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
VALUES(4,"philips","Full Stack","caesarea",'friend',"h://..",2);




-- USE jobManagerDB;
-- INSERT INTO userproporties VALUES(NULL,NULL,"fadi","idkeidek","fadi@gmail.com","050-2312673","1234",0);
-- INSERT INTO Candidate VALUES(2,'Student',false,'Atidna 4',NULL);

-- INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
-- VALUES(3,"Apple","C++ Developer","Tel Aviv",'linkedIn',"h://..",3);

-- INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
-- VALUES(4,"philips","Full Stack","caesarea",'friend',"h://..",3);







INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Phone',"Avi","Passed",3);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('HR',"Avi","Pending",3);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Phone',"smir","Passed",4);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('HR',"MAYA","Passed",4);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Technical',"yosi","Scheduled",4);



    select * 
    from userproporties inner join Candidate on userproporties.id = Candidate.id
    where userproporties.email = "amir@gmail.com"

    USE jobManagerDB;
    SELECT *
    FROM Process AS p , Interview AS i
INSERT INTO userproporties VALUES(NULL,Null,"Ameer","","admin@gmail.com","","1234",true);
INSERT INTO Admin VALUES(3,true);




INSERT INTO Interview(type , date ,interviewerName,status,processId)
    VALUES("${req.body.type}", '2022-02-01' ,"${req.body.interviewerName}","${req.body.status}",${req.body.processId});`

INSERT INTO Interview(type, date , interviewerName,status,processId)
VALUES('Phone' , '2022-02-01',"yosi","Scheduled",1);
USE jobManagerDB;
