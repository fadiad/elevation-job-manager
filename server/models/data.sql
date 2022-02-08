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
 
USE jobManagerDB;

select count(*) As NumberOfemployed
        from candidate As c inner join process As p 
        on  c.id = p.UserId 
        where c.isEmployeed = 1 
        GROUP BY p.UserId

    USE jobManagerDB;
     select count(*) As NumberOfemployed
        from candidate As c inner join process As p 
        on  c.id = p.UserId 
        inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 1 
        GROUP BY p.UserId

    USE jobManagerDB;
        select count(*) As NumberOfemployed
        from candidate As c inner join process As p 
        on  c.id = p.UserId 
        inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 1 and i.status = '${req.query.interViewStatus}'
        GROUP BY p.UserId

                    USE jobManagerDB;

        select *
        from candidate As c  inner join process As p 
            on c.id = p.UserId inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 0 and  p.status = 'In progress' and i.status = 'Scheduled'
        GROUP BY p.UserId
            USE jobManagerDB;
        select count(*) As NumberOfemployed
        
         USE jobManagerDB;
        select count(*) As NumberOfemployed
                USE jobManagerDB;
        select count(*) As NumberOfemployed
        from candidate As c
        where c.id In (
        select  c.id
        from candidate As c inner join process As p 
        on  c.id = p.UserId 
        inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 0 and i.status = 'Scheduled'
        GROUP BY  c.id)

         USE jobManagerDB;
        select u.firstName , u.lastName , u.email , i.type , p.companyName , i.status
        from Interview As i inner join process As p on i.processId = p.id
        inner join candidate As c on c.id = p.UserId 
        inner join userproporties As u on u.id = c.id
        where i.id =80

        select count(*) As NumberOfemployed
        from candidate As c inner join process As p 
        on  c.id = p.UserId 
        inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 0 and i.status = 'Scheduled'
        GROUP BY p.UserId
       
     USE jobManagerDB;
     select count(*) As NumberOfemployed
     from candidate AS c
     where  c.id In(
         select  p.UserId
        from candidate As c  inner join process As p 
            on c.id = p.UserId inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 0 and  c.cohort = 'Atidna 4' and i.status = 'Scheduled'
        GROUP BY p.UserId)

      where  c.cohort = 'Atidna 4' and i.status = 'Scheduled'
      GROUP BY p.UserId) 

      select *
        from candidate As c  inner join process As p 
            on c.id = p.UserId 
        where c.isEmployeed = 0 and p.status = 'In progress'  and c.cohort = 'Atidna 4'
        GROUP BY p.UserId

INSERT INTO simulation VALUES(NULL,"2022-10-10 10:00:00",NULL,NULL,1,2)


USE jobManagerDB;

Delete from admin ;

USE jobManagerDB;
DELETE FROM NotificationForAdmin ;
DELETE FROM NotificationType ;
SELECT * 
from questions
    DELETE FROM questions
    WHERE id =3


USE jobManagerDB;
UPDATE userproporties 
SET phone = 0543174067,
    lastName = "Idkeidek",
    firstName = "Fadi",
    email = "admin@gmail.com" 
    WHERE id = 3