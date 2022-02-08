USE jobManagerDB;

INSERT INTO userproporties VALUES( 1000 ,Null,"enbal","Halaby","anbalhalabi@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( 2000 ,Null,"fady","idkeidek","fadi.1997.id@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( 3000 ,Null,"amir","halaby","amirhh007@gmail.com","0502312673","1234" , false );
INSERT INTO userproporties VALUES( 4000 ,Null,"lotem","lotem","elevation744@gmail.com","0507339214","1234" , true );
INSERT INTO userproporties VALUES( 5000 ,Null,"amir","jamal","amirhalaby007@gmail.com","0502215161","1234" , true );

INSERT INTO Candidate VALUES( 1000 , 'Student' ,false , 'Atidna 4' , NULL);
INSERT INTO Candidate VALUES( 2000, 'Student' ,false , 'Atidna 4' , NULL);
INSERT INTO Candidate VALUES( 3000 , 'Student' ,false , 'Atidna 4' , NULL);
INSERT INTO admin VALUES (4000 , true);
INSERT INTO admin VALUES (5000, true);

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

INSERT INTO simulation VALUES(NULL,"2022-02-10 10:00:00",NULL,NULL,1000,4000);
INSERT INTO simulation VALUES(NULL,"2022-02-15 10:00:00",NULL,NULL,1000,5000);

            -- this.interviewId = interviewId ,
            -- this.jobTitle = jobTitle ,
            -- this.companyName = companyName ,
            -- this.interviewType = interviewType ,
            -- this.interviewDate = interviewDate ,
            -- this.firstName = firstName ,
            -- this.lastName = lastName ,
            -- this.idQustion = idQustion,
            -- this.title = title,
            -- this.qustion = qustio,
            -- this.solution = solution,
USE jobManagerDB;
    SELECT q.id As questionId ,q.InterviewId ,q.title, q.question , q.solution , i.type , p.jobTitle , p.companyName , i.date ,u.firstName , u.lastName 
    FROM Questions As q inner join Interview As i On q.InterviewId = i.id
                        inner join Process As p On i.processId = p.id 
                        inner join Candidate As c On c.id = p.UserId 
                        inner join userproporties As u On c.id = u.id 
                        ORDER BY i.id
SELECT q.id As questionId ,q.InterviewId ,q.title, q.question , q.solution , i.type , p.jobTitle , p.companyName , i.date ,u.firstName , u.lastName 
        FROM Questions As q inner join Interview As i On q.InterviewId = i.id
                            inner join Process As p On i.processId = p.id 
                            inner join Candidate As c On c.id = p.UserId 
                            inner join userproporties As u On c.id = u.id 
                            group by i.id

SELECT q.id ,q.InterviewId, q.question , q.solution , i.type , p.jobTitle , p.companyName , i.date
FROM Questions As q inner join Interview As i On q.InterviewId = i.id
                    inner join Process As p On i.processId = p.id
USE jobManagerDB;
SELECT *
from questions
USE jobManagerDB;
  UPDATE questions 
    SET         
        title = "new question",
        question = "the first question edit ",
            solution = "dot write solution"

    WHERE
        id = 3
 

SELECT * 
from questions
    DELETE FROM questions
    WHERE id =3

USE jobManagerDB;
  DELETE FROM questions
    WHERE InterviewId = 82


USE jobManagerDB;
  DELETE FROM interview
  WHERE processId = 30

USE jobManagerDB;
  DELETE FROM process
  WHERE id = 30

 
USE jobManagerDB;
  DELETE FROM  Candidate
  WHERE id = 4

USE jobManagerDB;
  DELETE FROM  job
  WHERE  id = 14
   
USE jobManagerDB;
SELECT *
from joboffer As jOffer  inner join job As j On jOffer.candidateId =j.id 
WHERE jOffer.candidateId =5
     INSERT INTO joboffer(jobId ,adminId, candidateId , date)
            VALUES(16,3,1 , "2022-01-15");

USE jobManagerDB;
ALTER TABLE NotificationType 
RENAME COLUMN type1 TO typeOfAction varchar(15); 
USE jobManagerDB;
ALTER TABLE notificationtype RENAME COLUMN type1 TO typeOfAction;

USE jobManagerDB;
select  a.id , u.email , nfa.isNotified , nt.type1 , nt.type2
    from admin As a inner join userproporties As u  on a.id = u.id
    inner join notificationforadmin As nfa On nfa.adminId = u.id 
    inner join notificationtype As nt On nt.id = nfa.notificationId
    where a.id = 3 and nt.type1 = 'Pass/Fail' && nt.type2= 'HR'

    select  a.id , u.email
    from admin As a inner join userproporties As u  on a.id = u.id
    inner join notificationforadmin As nfa On nfa.adminId = u.id 
    inner join notificationtype As nt On nt.id = nfa.notificationId
    where  nt.type1 = 'Pass/Fail' && nt.type2= 'HR'
    group BY a.id

    where a.isNotified = 1
 
USE jobManagerDB;
select *
from userproporties inner join admin On userproporties.id = admin.id


USE jobManagerDB;
            select  *
            from admin As a inner join userproporties As u  on a.id = u.id
            inner join notificationforadmin As nfa On nfa.adminId = u.id 
            inner join notificationtype As nt On nt.id = nfa.notificationId
            where  a.id =3 && nt.type1 = 'Contract' && nt.type2= 'General'
            LIMIT 1;

USE jobManagerDB;
SELECT p.jobTitle , p.companyName ,  i.type 
FROM questions As q inner join interview As i On q.interviewId = i.id
                    inner join process As p On p.id = i.processId
                    where q.InterviewId = 123
--  nfa.isNotified
    USE jobManagerDB;
select u.firstName , u.lastName
from interview As i inner join process As p On i.processId = p.id
                    inner join candidate As c  On c.id = p.UserId
                    inner join userproporties As u On u.id = c.id
                    where i.id = 123