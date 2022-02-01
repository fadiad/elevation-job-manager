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

INSERT INTO userproporties (id,companyName,jobTitle,location,foundBy,link,UserId)

USE jobManagerDB;
INSERT INTO userproporties VALUES( Null,Null,"enbal","Halaby","anbalhalabi@gmail.com","0549329890","1234" , false );
USE jobManagerDB;
INSERT INTO userproporties VALUES( Null,Null,"fady","idkeidek","fadi.1997.id@gmail.com","0549329890","1234" , false );
USE jobManagerDB;
INSERT INTO userproporties VALUES( Null,Null,"amir","halaby","amirhh007@gmail.com","0502312673","1234" , false );
USE jobManagerDB;
INSERT INTO userproporties VALUES( Null,Null,"lotem","lotem","elevation744@gmail.com","0507339214","1234" , true );
INSERT INTO Candidate VALUES( Null , 'Student' ,false , 'Atidna 4' , NULL);
INSERT INTO Candidate VALUES( Null , 'Student' ,false , 'Atidna 4' , NULL);
INSERT INTO Candidate VALUES( Null , 'Student' ,false , 'Atidna 4' , NULL);
USE jobManagerDB;
INSERT INTO admin VALUES (10 , true)
USE jobManagerDB;
INSERT INTO userproporties VALUES( Null,Null,"amir","jamal","amirhalaby007@gmail.com","0502215161","1234" , true );
USE jobManagerDB;
INSERT INTO admin VALUES (11 , true)
USE jobManagerDB;
select *
from  userproporties inner join admin
on userproporties.id = admin.id



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




-- INSERT INTO Interview(type , date ,interviewerName,status,processId)
--     VALUES("${req.body.type}", '2022-02-01' ,"${req.body.interviewerName}","${req.body.status}",${req.body.processId});`

-- INSERT INTO Interview(type, date , interviewerName,status,processId)
-- VALUES('Phone' , '2022-02-01',"yosi","Scheduled",1);
-- USE jobManagerDB;


USE jobManagerDB;
DELETE FROM Process
where Process.id = 32
32 34 

USE jobManagerDB;
select *
from Candidate

USE jobManagerDB;
UPDATE Candidate 
SET 
    isEmployeed = 0
WHERE
    id = 2;
INSERT INTO userproporties VALUES(NULL,"Amir","Halaby","amir@gmail.com","050-2312673","1234");
INSERT INTO Candidate VALUES(2,'Student',false,'Atidna 4',NULL);



USE jobManagerDB;
INSERT INTO userproporties VALUES(Null,NULL,"yosef","halaby","yosef@gmail.com","050-24156","1234" , 0);
USE jobManagerDB;
INSERT INTO Candidate VALUES(5,'Student',false,'Atidna 1',NULL);
USE jobManagerDB;
select * 
from userproporties
select *  
from Candidate inner join userproporties on Candidate.id = userproporties.id


select *
        from candidate As c  inner join process As p 
            on c.id = p.UserId inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 0 and ( p.status = 'In progress') and i.status = 'Scheduled'
        GROUP BY p.UserId

 select count(*) As NumberOfStudent
   from  candidate
    where candidate.id In
        (select *
        from candidate As c inner join process As p 
        on  c.id = p.UserId 
        inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 1 and i.status = 'Scheduled'
        GROUP BY p.UserId)

from candidate As c  inner join process As p 
            on c.id = p.UserId inner join Interview As i on i.processId = p.id
        where c.isEmployeed = 0 and  p.status = 'In progress' and c.cohort = ''
        GROUP BY p.UserId

        select count(*) As NumberOfemployed
        from candidate As c inner join process As p 
        on  c.id = p.UserId 
        inner join Interview As i on i.processId = p.id
        where candidate.isEmployeed = 1 and i.status = 'Scheduled'
        GROUP BY p.UserId)

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
