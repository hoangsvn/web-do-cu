-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: webtraodoi
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinfo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(200) DEFAULT NULL,
  `datebirth` datetime(6) DEFAULT NULL,
  `fullname` varchar(200) DEFAULT NULL,
  `linkfacebook` varchar(200) DEFAULT NULL,
  `linkinstagram` varchar(200) DEFAULT NULL,
  `linktwitter` varchar(200) DEFAULT NULL,
  `phonenumber` varchar(20) DEFAULT NULL,
  `userid` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKashxpr15fxakhtwfowpdvyuto` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES (1,'Nông Công Thanh Hóa Việt Nam','2022-04-02 00:00:00.000000','Nguyễn Xuân Hoàng','htttps://www.facebook.com/hoangvn','htttps://www.facebook.com/hoangvn','htttps://www.facebook.com/hoangvn','0123654788',1),(2,'Nông Công Thanh Hóa Việt Nam','2022-04-02 00:00:00.000000','Nguyễn Xuân Hoàng','htttps://www.facebook.com/hoangvn1','htttps://www.facebook.com/hoangvn6','htttps://www.facebook.com/hoangvn11','0740258963',2),(3,'Nông Công Thanh Hóa Việt Nam','2022-04-02 00:00:00.000000','Nguyễn Xuân Hoàng','htttps://www.facebook.com/hoangvn2','htttps://www.facebook.com/hoangvn7','htttps://www.facebook.com/hoangvn12','0123654789',3),(4,'Nông Công Thanh Hóa Việt Nam','2022-04-02 00:00:00.000000','Nguyễn Xuân Hoàng','htttps://www.facebook.com/hoangvn3','htttps://www.facebook.com/hoangvn8','htttps://www.facebook.com/hoangvn13','6656448785',4),(5,'Nông Công Thanh Hóa Việt Nam','2022-04-02 00:00:00.000000','Nguyễn Xuân Hoàng','htttps://www.facebook.com/hoangvn4','htttps://www.facebook.com/hoangvn9','htttps://www.facebook.com/hoangvn14','5896321770',5),(6,'Nông Công Thanh Hóa Việt Nam','2022-04-02 00:00:00.000000','Nguyễn Xuân Hoàng','htttps://www.facebook.com/hoangvn5','htttps://www.facebook.com/hoangvn10','htttps://www.facebook.com/hoangvn15','0213646464',6);
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18 20:07:45
