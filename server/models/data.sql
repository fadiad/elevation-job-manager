USE jobManagerDB;

INSERT INTO userproporties VALUES( 1000 ,Null,"enbal","Halaby","anbalhalabi@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( 2000 ,Null,"fady","idkeidek","fadi.1997.id@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( 3000 ,Null,"amir","halaby","amirhh007@gmail.com","0502312673","1234" , false );
INSERT INTO userproporties VALUES( 4000 ,Null,"lotem","lotem","elevation744@gmail.com","0507339214","1234" , true );
INSERT INTO userproporties VALUES( 5000 ,Null,"amir","jamal","amirhalaby007@gmail.com","0502215161","1234" , true );

INSERT INTO Candidate VALUES( 1000 , 'Student' ,false , 'Atidna 4' , NULL);
INSERT INTO Candidate VALUES( 2000, 'Student' ,false , 'Atidna 4' , NULL);
INSERT INTO Candidate VALUES( 3000 , 'Student' ,false , 'Atidna 4' , NULL);
INSERT INTO admin VALUES (4000 , true)
INSERT INTO admin VALUES (5000, true)

INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
VALUES(NULL,"Amdocs","react Developer","Nazareth",'friend',"h://..",1000);

INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
VALUES(NULL,"apply","Full Stack Developer","Haifa",'linkedIn',"www.Intel.com",1000);

INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
VALUES(NULL,"Intel","C++ Developer","Haifa",'friend',"h://..",2000);

INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
VALUES(NULL,"Amdocs","JAVA Developer","Haifa",'linkedIn',"h://..",2000);

INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
VALUES(NULL,"nvidia","Full Stack Developer","Haifa",'friend',"h://..",3000);

INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
VALUES(NULL,"sisco","back end Developer","Haifa",'linkedIn',"h://..",3000);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Phone',"mayan","Scheduled",1000);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('HR',"Avi","Scheduled",1000);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Phone',"dana","Scheduled",2000);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Technical',"MAYA","Scheduled",2000);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Phone',"maya","Scheduled",3000);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Technical',"yosi","Scheduled",3000);

INSERT INTO simulation VALUES(NULL,"2022-02-10 10:00:00",NULL,NULL,1000,4000)
INSERT INTO simulation VALUES(NULL,"2022-02-15 10:00:00",NULL,NULL,1000,5000)





