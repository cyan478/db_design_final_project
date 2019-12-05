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
INSERT INTO `keywords` VALUES ('@AlaskaAir',1,-0.5),('@FAANews',14,0.0),('@fly_BUR',14,0.0),('alaska',11,0.8),('Alaska',12,0.3),('Alaska',16,-0.1),('Alaska Airlines',2,0.8),('Alaska Airlines',12,0.3),('Alaska Airlines',17,0.8),('attendants',3,0.7),('Baggage manager',1,-0.5),('best',2,0.8),('beverages',15,0.0),('blessing',12,0.3),('board',15,0.0),('Caroll',25,0.5),('change fees',24,-0.5),('children',16,-0.1),('class',3,0.7),('client',20,0.5),('couple eagles',12,0.3),('crew',27,0.6),('Customer care',17,0.8),('customer service',12,0.3),('Delta',3,0.7),('Denver',24,-0.5),('destination',27,0.6),('dispersal solution',14,0.0),('dlfjasdkfjaslfjk',5,0.0),('employees',20,0.5),('entertainment',13,-0.1),('experience',17,0.8),('experience',26,-0.9),('families',16,-0.1),('flight',15,0.0),('flight',24,-0.5),('flight',27,0.6),('Flight Attendants',2,0.8),('flight attendants',20,0.5),('flight crews',3,0.7),('flight paths',14,0.0),('flights',2,0.8),('flights',3,0.7),('flights',20,0.5),('food',15,0.0),('home',15,0.0),('hospital',12,0.3),('hue',13,-0.1),('idk',4,-0.1),('Jet Blue',13,-0.1),('jetblue',10,-0.8),('JetBlue',27,0.6),('job',27,0.6),('lake',12,0.3),('life',26,-0.9),('lot',16,-0.1),('Mateó',27,0.6),('mechanic',15,0.0),('MKE',3,0.7),('name',27,0.6),('OGG',15,0.0),('passengers',27,0.6),('paul rhee',7,0.7),('pictures',12,0.3),('Pilot',27,0.6),('plane',26,-0.9),('policy',1,-0.5),('RDU',25,0.5),('service',20,0.5),('shout',25,0.5),('shout-out',27,0.6),('sister',12,0.3),('sunset',12,0.3),('surgery',12,0.3),('team',12,0.3),('test',9,0.0),('test review',8,0.0),('things',1,-0.5),('times',27,0.6),('toes',28,0.3),('trees',12,0.3),('trip',3,0.7),('trips',3,0.7),('video choices',20,0.5),('Virgin America',13,-0.1),('way',12,0.3),('way',17,0.8),('weather warning',24,-0.5);
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'mintyfreshbrent',2,2,-0.5,'2019-11-20','The days continue to add up since the @AlaskaAir Baggage manager said she\'d be calling me back. It\'s time to make things right after she acknowledged they\'d failed on this policy.'),(2,'Jerilynne Gallup',2,1,0.8,'2019-11-25','Love Alaska Airlines’s flights and all Flight Attendants! They are the best!'),(3,'LarryfromGa2014',3,3,0.7,'2019-11-01','Took two recent trips to MKE, both 1st class on Delta and we enjoyed all four flights. They departed either early or on time and arrived early on each trip. The attendants were courteous and professional. Great flight crews'),(4,'airVisualsUser',1,2,-0.1,'2019-12-04','idk'),(5,'airVisualsUser',1,4,0.0,'2019-12-04','dlfjasdkfjaslfjk'),(7,'airVisualsUser',1,4,0.7,'2019-12-04','paul rhee is the great king'),(8,'airVisualsUser',1,4,0.0,'2019-12-04','test review'),(9,'ahoi',1,4,0.0,'2019-12-04','test'),(10,'ahoi',1,4,-0.8,'2019-12-04','jetblue is horrible'),(11,'ahoi',2,4,0.8,'2019-12-04','alaska is awesome'),(12,'Alice Marie Mattsen',2,1,0.3,'2019-11-01','This trip to Alaska was a blessing to spend two weeks with my sister while she is recovering from surgery. On the way to the hospital each day I took pictures and last night I took this one at a frozen lake watching the sunset with a couple eagles in trees. If it wasn’t for Alaska Airlines I wouldn’t have made it here on time to be with my sister as she underwent surgery in Anchorage. God bless you, especially your team in customer service. I have more even to be grateful for this Thanksgiving!'),(13,'Nate Amick',2,1,-0.1,'2019-11-01','3 hours with no inflight entertainment, there goes the purple hue of Virgin America. I guess it’s Jet Blue from here on out seeing as you ruined Virgin America.'),(14,'burisabadneigh1',2,2,0.0,'2019-11-21','PLEASE fix the flight paths at @fly_BUR. We need you to push BUR and @FAANews for a dispersal solution NOW. Thank you.'),(15,'karimaltzman',2,2,0.0,'2019-11-19','Hey sitting on flight 940. We are over an hour late leaving OGG. I hope you can at least comp us food and adult beverages. We won’t be getting home until 1:30 am at least. Now there’s a mechanic on board?'),(16,'Travel Expert',2,3,-0.1,'2019-11-19','We travel a lot. We won’t fly Alaska again because they don’t keep families together. My two young children had to sit on their own. Not good. Don’t recommend.'),(17,'Ketan',2,3,0.8,'2019-10-01','Alaska Airlines Customer care is very generous and helpful. I have experienced twice that they were incredibly friendly and made my experience really great. They go out of their way to make you happy and more than satisfied.'),(18,'karkeys0326',3,3,-0.4,'2019-11-01','5 hour delay due to airplane issues in LA. Gate attendant was honest about what was going on, if not for her they wouldn\'t even get a 1. There was 5 delays before finally leaving. Had to pay for extra day on my car storage due to the delay, and I got a $100 voucher, a three inch sub and mini crackers for this nightmare.'),(19,'karkeys0326',3,3,-0.4,'2019-11-01','5 hour delay due to airplane issues in LA. Gate attendant was honest about what was going on, if not for her they wouldn\'t even get a 1. There was 5 delays before finally leaving. Had to pay for extra day on my car storage due to the delay, and I got a $100 voucher, a three inch sub and mini crackers for this nightmare.'),(20,'DonaldDux1',3,3,0.5,'2019-11-01','Both flights on time, great service, friendly flight attendants, good video choices. The employees make you feel like you are a preferred client.'),(21,'Ryan Murphy',3,3,-0.3,'2019-11-25','So the email I got said that I could rebook as long as travel was \"within the guidelines\" but it\'s asking me to pay $170 extra to fly to MSP tonight (ie before the snow) instead of tomorrow. Is that not within the guidelines? I can\'t find a clear answer in the guidelines.'),(22,'Jenni Bramble',3,3,-0.5,'2019-11-14','My service dog and I would love to join you, but you won\'t let my service dog fly solely because of his breed!'),(23,'Lyn Cullen',3,1,0.0,'2019-11-14','We were on hold for an hour last night trying to re-route my daughter tomorrow before we gave up and left a message. I can\'t even imagine the mess you folks have on your hands trying to take care of everyone. Take good care of your customer service people, their stress levels must be through the roof right now!'),(24,'@TomLyons',3,2,-0.5,'2019-11-14','What’s up with Denver i changed my flight from weds to Friday per the weather warning and got whacked $200 in change fees.'),(25,'Maria Cristina',1,1,0.5,'2019-11-21','We would like to give a shout out to Caroll from RDU yesterday for being so accommodating. Thank you so much!'),(26,'@11PatRyan',1,2,-0.9,'2019-11-21','I used to love you and now you suck and are just “plane” rude but seriously worst flying experience of my life tonight'),(27,'C00kie909',1,3,0.6,'2019-11-21','I have flown many times before, but I must say that flight #846 with JetBlue was awesome. What a friendly crew! Pilot did an outstanding job getting us to our destination safely and early. Big shout-out to Mateó. I like that you took the time to greet the passengers by name while you asked what would they like to drink. COOL!'),(28,'aryman9000',2,4,0.3,'2019-12-04','i like toes');
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
INSERT INTO `savedReviews` VALUES ('aryman9000',1),('aryman9000',2),('ahoi',4),('ahoi',5),('ahoi',7),('ahoi',8),('aryman9000',11),('aryman9000',12),('aryman9000',13);
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
INSERT INTO `users` VALUES ('ahoi','test','aryton','hoi','2019-12-03'),('andyballs','jenny','Andrew','Leung','2019-12-04'),('aryman9000','iliketoes','Aryton','Hoi','2019-12-04'),('bobthegreatking','123','Paul','Rhee','2019-12-04'),('cyan','idk123','celine','yan','2019-12-03'),('cyan2','idk123','celine','yan','2019-12-03'),('prhee','idk','paul','rhee','2018-12-01'),('rchueng','asdf','ryan','cheung','2019-12-03');
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

-- Dump completed on 2019-12-04 22:47:47
