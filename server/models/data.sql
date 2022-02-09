USE jobManagerDB;
            select i.simulationDate , u.firstName , u.lastName , i.type, p.companyName
            from simulation As s inner join interview As i On s.interviewId = i.id
            inner join process As p On p.id = i.processId 
            inner join candidate As c On c.id = p.UserId
            inner join userproporties As u On u.id = c.id
SELECT * 
from userproporties
where email = 'anbalhalabi@gmail.com'
USE jobManagerDB;
INSERT INTO userproporties VALUES( Null ,Null,"lotem","lotem","elevation744@gmail.com","0507339214","1234" , true );
INSERT INTO userproporties VALUES( Null ,Null,"amir","jamal","amirhalaby007@gmail.com","0502215161","1234" , true );
USE jobManagerDB;
INSERT INTO admin VALUES ( 31 , true);
INSERT INTO admin VALUES ( 32 , true);

INSERT INTO userproporties VALUES( Null ,Null,"enbal","Halaby","anbalhalabi@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( Null ,Null,"fady","idkeidek","fadi.1997.id@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( Null ,Null,"amir","halaby","amirhh007@gmail.com","0502312673","1234" , false );
INSERT INTO userproporties VALUES( Null ,Null,"sara","zeada","sziada276@gmail.com","050265164","1234" , false );

INSERT INTO userproporties VALUES( Null ,Null,"osama","osama","osama@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( Null ,Null,"shokry","shokry","shokry@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( Null ,Null,"mohamd","mohamd","mohamd@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( Null ,Null,"ayman","ayman","ayman@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( Null ,Null,"majd","majd","majd@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( Null ,Null,"omar","omar","omar@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( Null ,Null,"neven","neven","neven@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( Null ,Null,"farok","farok","farok@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( Null ,Null,"ryan","ryan","ryan@gmail.com","0549329890","1234" , false );
INSERT INTO userproporties VALUES( Null ,Null,"hady","hady","hady@gmail.com","0549329890","1234" , false );

USE jobManagerDB;
INSERT INTO Candidate VALUES( 16 , 'Graduate' ,false , 'Atidna 4' , NULL);
INSERT INTO Candidate VALUES( 26 , 'Graduate' ,false , 'Atidna 4' , NULL);
INSERT INTO Candidate VALUES( 22 , 'Student' ,false , 'Atidna 4' , NULL);
INSERT INTO Candidate VALUES( 23 , 'Student' ,false , 'Atidna 4' , NULL);
INSERT INTO Candidate VALUES( 26 , 'Student' ,false , 'Atidna 4' , NULL);
INSERT INTO Candidate VALUES( 21 , 'Graduate' ,false , 'Atidna 1' , NULL);
INSERT INTO Candidate VALUES( 27 , 'Graduate' ,false , 'Atidna 1' , NULL);
INSERT INTO Candidate VALUES( 28 , 'Graduate' ,false , 'Atidna 2' , NULL);
INSERT INTO Candidate VALUES( 29 , 'Graduate' ,false , 'Atidna 2' , NULL);
INSERT INTO Candidate VALUES( 30 , 'Graduate' ,false , 'Atidna 2' , NULL);
INSERT INTO Candidate VALUES( 16 , 'Graduate' ,false , 'Atidna 4' , NULL);
INSERT INTO Candidate VALUES( 26 , 'Graduate' ,false , 'Atidna 4' , NULL);
INSERT INTO Candidate VALUES( 22 , 'Student' ,false , 'Atidna 4' , NULL);
INSERT INTO Candidate VALUES( 23 , 'Student' ,false , 'Atidna 4' , NULL);

USE jobManagerDB;
select * 
from userproporties As u inner join Candidate As c On u.id =c.id

USE jobManagerDB;
select u.id
from userproporties As u inner join Candidate As c On u.id =c.id  
  INNER JOIN Process As p On p.UserId=c.id
  where p.status="In progress" 
  group by u.id


USE jobManagerDB;
INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,status,UserId)
VALUES(NULL,"Apple","react Developer","Haifa",'friend',"www.Amdocs.com" , "In progress",30);
USE jobManagerDB;
INSERT INTO Interview(id ,type,date ,simulationDate , interviewerName,status,processId)
VALUES(NULL, "Phone" , "2022-02-05","2022-02-06" ,"mayan","Passed",61);
USE jobManagerDB;
INSERT INTO Interview(id ,type,date  , interviewerName,status,processId)
VALUES(NULL, "Technical" , "2022-02-07","dana","Passed",61);
INSERT INTO Interview(id ,type,date  , interviewerName,status,processId)
VALUES(NULL, "Contract" , "2022-02-08","sheme","Passed",61);


USE jobManagerDB;
INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,status,UserId)
VALUES(NULL,"intel","react Developer","Haifa",'friend',"www.intel.com" , "In progress",15);
INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,status,UserId)
VALUES(NULL,"888","c Developer","Haifa",'friend',"www.888.com" , "In progress",19);
INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,status,UserId)
VALUES(NULL,"+500","c++ Developer","Haifa",'friend',"www.+500.com" , "In progress",20);
INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,status,UserId)
VALUES(NULL,"google","java Developer","Haifa",'friend',"www.google.com" , "In progress",22);
INSERT INTO Process (id,companyName,jobTitle,location,foundBy,link,UserId)
VALUES(NULL,"nvidia","Full Stack Developer","Haifa",'friend',"www.nvidia.com",23);

USE jobManagerDB;
INSERT INTO Interview(id ,type,date , interviewerName,status,processId)
VALUES(NULL, "Phone" , "2022-02-02" ,"mayan","Passed",62);
INSERT INTO Interview(id ,type,date ,simulationDate , interviewerName,status,processId)
VALUES(NULL, "Technical" , "2022-02-15","2022-02-10" ,"lotem","Scheduled",62);

USE jobManagerDB;
INSERT INTO Interview(id , type , date  , interviewerName , status , processId)
VALUES(NULL, "Phone" , "2022-02-07","dana","Passed",63);
INSERT INTO Interview(id , type , date , interviewerName , status , processId)
VALUES(NULL, "Technical" , "2022-02-10","sheme","Scheduled",63);


USE jobManagerDB;
INSERT INTO Interview(id , type , date  , interviewerName , status , processId)
VALUES(NULL, "Phone" , "2022-02-01","dana","Passed",64);
INSERT INTO Interview(id , type , date , interviewerName , status , processId)
VALUES(NULL, "Technical" , "2022-02-13","sheme","Scheduled",64);


USE jobManagerDB;
INSERT INTO Interview(id , type , date  , interviewerName , status , processId)
VALUES(NULL, "Phone" , "2022-02-01","dana","Passed",65);
INSERT INTO Interview(id , type , date , interviewerName , status , processId)
VALUES(NULL, "Technical" , "2022-02-13","sheme","Scheduled",65);



USE jobManagerDB;
select * 
from userproporties As u inner join Candidate As c On u.id = c.id
from  Process As p inner join  Interview As i  On i.processId=p.id

USE jobManagerDB;
INSERT INTO Interview(id ,type,date  , interviewerName,status,processId)
VALUES(NULL, "Technical" , "2022-02-07","dana","Passed",61);
INSERT INTO Interview(id ,type,date  , interviewerName,status,processId)
VALUES(NULL, "Contract" , "2022-02-08","sheme","Passed",61);



USE jobManagerDB;
INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Phone',"mayan","Scheduled",55);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('HR',"Avi","Scheduled",55);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Phone',"dana","Scheduled",56);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Technical',"MAYA","Scheduled",2000);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Phone',"maya","Scheduled",3000);

INSERT INTO Interview(type,interviewerName,status,processId)
VALUES('Technical',"yosi","Scheduled",3000);

INSERT INTO simulation VALUES(NULL,"2022-02-10 10:00:00",NULL,NULL,1000,4000);
INSERT INTO simulation VALUES(NULL,"2022-02-15 10:00:00",NULL,NULL,1000,5000);

USE jobManagerDB;
INSERT INTO questions VALUES(NULL , "array list questions" , 
            "create new array list" , "", 145)

USE jobManagerDB;
INSERT INTO questions VALUES(NULL , "array list questions" , 
            "create new array list" , "", 146)

USE jobManagerDB;
          select *
        from Interview As i 
        where i.processId = '${processId}' && i.status != "Passed"

        where i.processId = '${processId}' && i.status != "Passed"
  from Process As P INNER JOIN Interview As i On p.id = i.processId
  where p.id = 68
INSERT INTO questions VALUES(NULL , "about my self" , 
            "tel me about my self" , "", 146)

USE jobManagerDB;
        select  nfa.isNotified
        from admin As a inner join userproporties As u  on a.id = u.id
        inner join notificationforadmin As nfa On nfa.adminId = u.id 
        inner join notificationtype As nt On nt.id = nfa.notificationId
        where  a.id =31 && nt.type1 = 'newInterview' && nt.type2= '${interviewType}'
USE jobManagerDB;
Delete from  Process
where Process.id = 79 ;
-- nfa.isNotified
USE jobManagerDB;
SELECT *
FROM Candidate 
where interview.processId = 79
USE jobManagerDB;
  select *
    FROM simulation As s inner join interview As i On s.InterviewId = i.id

USE jobManagerDB;
Update Candidate SET isEmployeed=0 WHERE id=33 AND processId=${processId};
USE jobManagerDB;
select *
from Candidate As c inner join userproporties As u On c.id = u.id

USE jobManagerDB;
    select *
    from Interview As i 
        select  nt.type1 ,nt.type2
        from admin As a inner join userproporties As u  on a.id = u.id
        inner join notificationforadmin As nfa On nfa.adminId = u.id 
        inner join notificationtype As nt On nt.id = nfa.notificationId
        where  a.id ='31' && nt.type1 = 'newInterview' && nt.type2= 'Phone'

                            userproporties           cohort
                    Candidate             admin
        progress         |                /
  Interview          JobOffer     <-   job
questions
              
                  