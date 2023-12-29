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
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) DEFAULT NULL,
  `desiption` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `state` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,'2023-08-18 11:53:41.787000','Sách Cũ dài 20 trang','Truyện Cỗ Tích',9999,1,1),(2,'2023-08-18 00:27:45.439000','Điện Thoại cũ','Điện Thoại ',1000,1,1),(3,'2023-08-18 00:28:06.890000','Tivi Cũ','Tivi Sony ',1234,1,1),(4,'2023-08-16 11:26:27.108000','Đồ gia Dụng cũ','Ghế Gỗ ',6541,1,1),(5,'2023-08-18 00:28:53.371000','PC I3 3250','PC Gaming ',3258,1,1),(6,'2023-08-18 00:35:34.907000','Đồng Hô đeo tay : Dồng hồ cơ','Đồng Hồ Cơ ',2578,1,1),(7,'2023-08-18 11:50:40.949000','Xe máy 2 thì trang','Sibo ',6874,1,1),(8,'2023-08-18 00:29:46.228000','Bật Lữa Cũ 1978','Zipo 1978 ',1579,1,1),(9,'2023-08-18 11:44:01.872000','Truyện Hài ','Sách Truyện ',3157,1,1),(10,'2023-08-18 00:30:32.027000','Laptop i5 8250u HDD 1TB','Dell 5570 ',3157,1,1),(15,'2023-08-18 11:55:40.079000','Day là San Pham Test ','San Pham Test ',1,1,0),(16,'2023-08-18 11:57:45.245000','Sãn Phẫm Test 2','Sãn Phẫm Test 2',0,1,1);
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18 20:07:46
