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
-- Table structure for table `sanpham_danhmuc`
--

DROP TABLE IF EXISTS `sanpham_danhmuc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham_danhmuc` (
  `san_pham_id` bigint NOT NULL,
  `listdanhmuc_id` bigint NOT NULL,
  KEY `FKqbb9uajd3k1d1tck4watf1hmu` (`listdanhmuc_id`),
  KEY `FKeaklgomdt6al2k8td1vv97ich` (`san_pham_id`),
  CONSTRAINT `FKeaklgomdt6al2k8td1vv97ich` FOREIGN KEY (`san_pham_id`) REFERENCES `sanpham` (`id`),
  CONSTRAINT `FKqbb9uajd3k1d1tck4watf1hmu` FOREIGN KEY (`listdanhmuc_id`) REFERENCES `danhmuc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham_danhmuc`
--

LOCK TABLES `sanpham_danhmuc` WRITE;
/*!40000 ALTER TABLE `sanpham_danhmuc` DISABLE KEYS */;
INSERT INTO `sanpham_danhmuc` VALUES (4,4),(2,1),(3,11),(5,3),(8,4),(10,2),(6,6),(9,6),(7,10),(1,6);
/*!40000 ALTER TABLE `sanpham_danhmuc` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18 20:07:44
