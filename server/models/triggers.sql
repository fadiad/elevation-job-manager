
USE jobManagerDB;
CREATE TRIGGER before_user_insert
BEFORE INSERT ON UserProporties 
FOR EACH ROW
BEGIN
    IF NEW.email = ""  
        THEN SET new.email = NULL;
    ELSE IF new.password = ""
        THEN SET new.password = NULL;
    END IF; 
END;

select @@sql_mode;


