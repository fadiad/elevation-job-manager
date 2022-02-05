
USE jobManagerDB;
 select u.firstName , u.lastName , c.cohort , p.companyName
 , i.type , i.date , i.status
 from UserProporties As u inner join candidate As c 
    on  u.id = c.id inner join process As p 
    on u.id = p.UserId inner join interview As i
    on p.id = i.processId


USE jobManagerDB;
select p.UserId 
from candidate As c  inner join process As p 
    on c.id = p.UserId inner join interview As i
    on p.id = i.processId 
where i.processId Not In
(
select i.processId
from candidate As c  inner join process As p 
    on c.id = p.UserId inner join interview As i
    on p.id = i.processId 
where c.isEmployeed = 0 and ( i.status = 'Pending' or i.status ='Failed' or i.status = 'No Reply')
GROUP BY i.processId
)
GROUP BY p.UserId


select c.id as "UserID",p.id as "ProcessID",p.companyName,p.jobTitle,i.id as "interviewId",i.type,i.date,i.simulationDate,s.date1,s.date2,s.date3,adminId 
from candidate as c inner join process as p on c.id=p.UserId 
inner join interview as i on p.id=i.processId 
inner join simulation as s on i.id=s.interviewId
where c.id=1;





USE jobManagerDB;
select u.firstName , u.lastName , c.cohort , p.companyName , i.type , i.date , i.status
            from UserProporties As u inner join candidate As c 
            on  u.id = c.id inner join process As p 
            on u.id = p.UserId inner join interview As i
            on p.id = i.processId
            where i.status = 'Passed' 
            
USE jobManagerDB;
select u.firstName , u.lastName , c.cohort , p.companyName , i.type , i.date , i.status
    from UserProporties As u inner join candidate As c 
       on  u.id = c.id inner join process As p 
       on u.id = p.UserId inner join interview As i
       on p.id = i.processId
       where c.cohort = 'Atidna 1' and i.status = 'Passed'


