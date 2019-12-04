CREATE DATABASE  IF NOT EXISTS `airVisuals` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `airVisuals`;
-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: airVisuals
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'jetblue'),(2,'alaska airlines'),(3,'delta');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keywords`
--

DROP TABLE IF EXISTS `keywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keywords` (
  `keyword` varchar(255) NOT NULL,
  `review_id` int(11) NOT NULL,
  `sentiment` double(3,1) NOT NULL,
  PRIMARY KEY (`keyword`,`review_id`),
  KEY `keywords_review_id_fk` (`review_id`),
  CONSTRAINT `keywords_review_id_fk` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`review_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keywords`
--

LOCK TABLES `keywords` WRITE;
/*!40000 ALTER TABLE `keywords` DISABLE KEYS */;
INSERT INTO `keywords` VALUES ('@AlaskaAir',1,-0.5),('Alaska Airlines',2,0.8),('attendants',3,0.7),('Baggage manager',1,-0.5),('best',2,0.8),('class',3,0.7),('Delta',3,0.7),('dlfjasdkfjaslfjk',5,0.0),('Flight Attendants',2,0.8),('flight crews',3,0.7),('flights',2,0.8),('flights',3,0.7),('idk',4,-0.1),('MKE',3,0.7),('paul rhee',7,0.7),('policy',1,-0.5),('test review',8,0.0),('things',1,-0.5),('trip',3,0.7),('trips',3,0.7);
/*!40000 ALTER TABLE `keywords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `poster_username` varchar(255) NOT NULL,
  `company_id` int(11) NOT NULL,
  `review_site_id` int(11) NOT NULL,
  `review_sentiment` double(3,1) NOT NULL,
  `review_date` date NOT NULL,
  `review_content` mediumtext NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `review_site_fk` (`review_site_id`),
  KEY `company_id_fk` (`company_id`),
  CONSTRAINT `company_id_fk` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON UPDATE CASCADE,
  CONSTRAINT `review_site_fk` FOREIGN KEY (`review_site_id`) REFERENCES `sites` (`site_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'mintyfreshbrent',2,2,-0.5,'2019-11-20','The days continue to add up since the @AlaskaAir Baggage manager said she\'d be calling me back. It\'s time to make things right after she acknowledged they\'d failed on this policy.'),(2,'Jerilynne Gallup',2,1,0.8,'2019-11-25','Love Alaska Airlines’s flights and all Flight Attendants! They are the best!'),(3,'LarryfromGa2014',3,3,0.7,'2019-11-01','Took two recent trips to MKE, both 1st class on Delta and we enjoyed all four flights. They departed either early or on time and arrived early on each trip. The attendants were courteous and professional. Great flight crews'),(4,'airVisualsUser',1,2,-0.1,'2019-12-04','idk'),(5,'airVisualsUser',1,4,0.0,'2019-12-04','dlfjasdkfjaslfjk'),(7,'airVisualsUser',1,4,0.7,'2019-12-04','paul rhee is the great king'),(8,'airVisualsUser',1,4,0.0,'2019-12-04','test review');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savedReviews`
--

DROP TABLE IF EXISTS `savedReviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `savedReviews` (
  `username` varchar(100) NOT NULL,
  `review_id` int(11) NOT NULL,
  PRIMARY KEY (`username`,`review_id`),
  KEY `savedReviews_review_id_fk` (`review_id`),
  CONSTRAINT `savedReviews_review_id_fk` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`review_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `savedReviews_username_fk` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savedReviews`
--

LOCK TABLES `savedReviews` WRITE;
/*!40000 ALTER TABLE `savedReviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `savedReviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sites`
--

DROP TABLE IF EXISTS `sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sites` (
  `site_id` int(11) NOT NULL AUTO_INCREMENT,
  `site_name` varchar(100) NOT NULL,
  `site_url` varchar(255) NOT NULL,
  PRIMARY KEY (`site_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sites`
--

LOCK TABLES `sites` WRITE;
/*!40000 ALTER TABLE `sites` DISABLE KEYS */;
INSERT INTO `sites` VALUES (1,'facebook','www.facebook.com'),(2,'twitter','www.twitter.com'),(3,'tripadvisor','www.tripadvisor.com'),(4,'AirVisuals','www.airvisuals.com');
/*!40000 ALTER TABLE `sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(100) NOT NULL,
  `user_password` varchar(20) NOT NULL,
  `user_firstname` varchar(255) NOT NULL,
  `user_lastname` varchar(255) NOT NULL,
  `account_created` date NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('ahoi','pw123','aryton','hoi','2019-12-03'),('andyballs','jenny','Andrew','Leung','2019-12-04'),('bobthegreatking','123','Paul','Rhee','2019-12-04'),('cyan','idk123','celine','yan','2019-12-03'),('cyan2','idk123','celine','yan','2019-12-03'),('prhee','idk','paul','rhee','2018-12-01'),('rchueng','asdf','ryan','cheung','2019-12-03');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'airVisuals'
--
/*!50003 DROP PROCEDURE IF EXISTS `test_procedure` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `test_procedure`(
	in id int
)
begin
start transaction;
	select company_name
    from companies
    where company_id = id;
    commit;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-04 17:55:01
