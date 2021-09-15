create database pms;
use pms;
CREATE TABLE Employee(
 Employee_Id Int(6),
 First_Name VARCHAR(25),
 Last_Name VARCHAR(25),
 Mobile_No Int(9),
 DOB Date,
 Designation varchar(30),
 Department_ID Int(6),
 Employee_Role Varchar(20),
 Hire_Date DATE,
 City VARCHAR(25),
 State VARCHAR(25),
 PRIMARY KEY (Employee_Id));
 use pms;
 CREATE TABLE Department(
 Department_Id Int(6),
 Department_Name VARCHAR(30),
 PRIMARY KEY (Department_Id)
 );
 CREATE TABLE Account_Details(
 Account_Id Int(6),
 Bank_Name VARCHAR(50),
 Account_Number VARCHAR(50),
 Employee_Id INT(6),
 PRIMARY KEY (Account_Id),
 FOREIGN KEY (Employee_Id)
 REFERENCES Employee(Employee_Id)
 );
 CREATE TABLE Salary(
 Salary_Id Int(6),
 Gross_Salary Int(10),
 Hourly_Pay Int(10),
 Account_Id Int(6),
 PRIMARY KEY (Salary_Id),
 FOREIGN KEY (Account_Id)
 REFERENCES Account_Details(Account_Id)
 );
 -- CREATE TABLE Employee_Attendance(
--  Employee_Id Int(6),
--  Attendance_Id Int(6),
--  PRIMARY KEY (Employee_Id,Attendance_Id),
--  FOREIGN KEY (Employee_Id)
--  REFERENCES Employee(Employee_Id),
--  FOREIGN KEY (Attendance_Id)
--  REFERENCES Attendance(Attendance_Id)
--  );
CREATE TABLE Attendance(
 Attendance_Id Int(6),
 Employee_Id INT(6),
 Worked_For varchar(1),
 PRIMARY KEY (Attendance_Id),
 FOREIGN KEY (Employee_Id)
 REFERENCES Employee(Employee_Id)
);
CREATE TABLE Leave_Details(
 Leave_Id Int(6),
 Employee_Id Int(6),
 Leave_date DATE,
 Leave_Type varchar(10),
 Available_Leave int,
 PRIMARY KEY (Leave_Id),
 FOREIGN KEY (Employee_Id)
 REFERENCES Employee(Employee_Id)
 );
 use pms;
CREATE TABLE Login_Details(
 Username varchar(20),
 Passw varchar(150) ,
 Employee_Id Int(6),
 FOREIGN KEY (Employee_Id)
 REFERENCES Employee(Employee_Id)
 );
