create database pms;
use pms;
CREATE TABLE `department` (
  `Department_Id` int NOT NULL,
  `Department_Name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`Department_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `employee` (
  `Employee_Id` int NOT NULL,
  `First_Name` varchar(25) DEFAULT NULL,
  `Last_Name` varchar(25) DEFAULT NULL,
  `Mobile_No` varchar(10) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Designation` varchar(30) DEFAULT NULL,
  `Department_ID` int DEFAULT NULL,
  `Employee_Role` varchar(20) DEFAULT NULL,
  `Hire_Date` date DEFAULT NULL,
  `City` varchar(25) DEFAULT NULL,
  `State` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`Employee_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `leave_details` (
  `Leave_Id` int NOT NULL AUTO_INCREMENT,
  `Employee_Id` int DEFAULT NULL,
  `Leave_Type` varchar(50) DEFAULT NULL,
  `Day_Type` varchar(10) DEFAULT NULL,
  `from_date` date DEFAULT NULL,
  `To_date` date DEFAULT NULL,
  `Reason` mediumtext,
  `Available_Leave` int DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Leave_Id`),
  KEY `Employee_Id` (`Employee_Id`),
  CONSTRAINT `leave_details_ibfk_1` FOREIGN KEY (`Employee_Id`) REFERENCES `employee` (`Employee_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
CREATE TABLE `login_details` (
  `Username` varchar(20) NOT NULL,
  `Passw` varchar(150) NOT NULL,
  `Employee_Id` int NOT NULL,
  `is_admin` tinyint NOT NULL,
  `salt` varchar(100) NOT NULL,
  PRIMARY KEY (`Employee_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `pay` (
  `Employee_Id` int NOT NULL,
  `pay_status` tinyint NOT NULL,
  PRIMARY KEY (`Employee_Id`)
) /*!50100 TABLESPACE `innodb_system` */ ENGINE=InnoDB DEFAULT CHARSET=latin1;
CREATE TABLE `salary` (
  `Salary_Id` int NOT NULL,
  `Employee_Id` int DEFAULT NULL,
  `month` varchar(10) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `salary_am` int DEFAULT NULL,
  PRIMARY KEY (`Salary_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--views
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `pms`.`accrejleave` AS select `pms`.`leave_details`.`Leave_Id` AS `Leave_Id`,`pms`.`leave_details`.`Employee_Id` AS `Employee_Id`,`pms`.`employee`.`First_Name` AS `first_name`,`pms`.`employee`.`Last_Name` AS `last_name`,`pms`.`leave_details`.`from_date` AS `from_date`,`pms`.`leave_details`.`To_date` AS `To_date`,`pms`.`leave_details`.`Leave_Type` AS `leave_type`,`pms`.`leave_details`.`Day_Type` AS `day_type`,`pms`.`leave_details`.`Reason` AS `Reason`,`pms`.`leave_details`.`Available_Leave` AS `available_leave`,`pms`.`leave_details`.`Status` AS `status` from (`pms`.`employee` join `pms`.`leave_details` on((`pms`.`leave_details`.`Employee_Id` = `pms`.`employee`.`Employee_Id`)));
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `pms`.`payment` AS select `salary_d`.`Employee_Id` AS `Employee_Id`,`salary_d`.`first_name` AS `first_name`,`salary_d`.`last_name` AS `last_name`,`salary_d`.`salary` AS `salary`,`pms`.`pay`.`pay_status` AS `pay_status` from (`pms`.`salary_d` join `pms`.`pay`) where ((`pms`.`pay`.`pay_status` <> 1) and (`pms`.`pay`.`Employee_Id` = `salary_d`.`Employee_Id`));
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `pms`.`salary_d` AS select `pms`.`salary`.`Salary_Id` AS `Salary_Id`,`pms`.`salary`.`Employee_Id` AS `Employee_Id`,`pms`.`employee`.`First_Name` AS `first_name`,`pms`.`employee`.`Last_Name` AS `last_name`,`pms`.`employee`.`Designation` AS `designation`,`pms`.`salary`.`month` AS `month`,`pms`.`salary`.`year` AS `year`,`pms`.`salary`.`salary_am` AS `salary` from (`pms`.`employee` join `pms`.`salary` on((`pms`.`salary`.`Employee_Id` = `pms`.`employee`.`Employee_Id`)));
--procedures
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `INSERT_LEAVE`(IN empid INT, IN lType varchar(50), IN DType  varchar(10), IN fDate date, IN tDate date, IN res MEDIUMTEXT)
BEGIN
declare aleave int;
SELECT Available_Leave INTO aleave FROM leave_details WHERE Employee_Id = empid ORDER BY Available_Leave ASC LIMIT 1;
IF aleave IS NULL THEN
SET aleave = 10;
END IF;
INSERT INTO leave_details (`Employee_Id`,
`Leave_Type`,
`Day_Type`,
`from_date`,
`To_date`,
`Reason`,
`Available_Leave`,
`Status` ) VALUES (empid, lType, DType, fDate, tDate, res, aleave, 'Pending');
END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_SALARY`(IN lid INT, IN status varchar(20))
BEGIN
DECLARE empid INT DEFAULT 0;
DECLARE sal INT DEFAULT 0;
DECLARE aleave INT;
SELECT Employee_Id INTO empid FROM leave_details WHERE Leave_Id = lid;
SELECT salary_am INTO sal FROM salary WHERE Employee_Id = empid;
SELECT available_leave INTO aleave FROM leave_details WHERE Employee_Id = empid order by available_leave asc limit 1;
IF status = 'Approved' THEN
	UPDATE leave_details SET status = 'Approved',available_leave = aleave-1  WHERE Leave_Id = lid;
    UPDATE salary SET salary_am = sal - 100 WHERE Employee_Id = empid;
ELSEIF status = 'Reject' THEN
	UPDATE leave_details SET status = 'Reject' WHERE Leave_Id = lid;
END IF;
END$$
DELIMITER ;
--triggers
DROP TRIGGER IF EXISTS `pms`.`CREATE_LOGIN`;

DELIMITER $$
USE `pms`$$
CREATE DEFINER = CURRENT_USER TRIGGER `pms`.`CREATE_LOGIN` AFTER INSERT ON `employee` FOR EACH ROW
BEGIN
INSERT INTO login_details VALUES (CONCAT(NEW.First_Name,'.',NEW.Last_Name),'c9c06f73fca47864ae8e41336167bcf32f92402a12c7d6f0afaf08a41af13062cf55c4068d6a6c22d59502e8479e3b92c84a794399c2dd4c870b2d639d315e76',NEW.Employee_Id,0,'823af80c42f048fc8cd05205ddd28d26');
END$$
DELIMITER ;



