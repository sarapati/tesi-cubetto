CREATE DATABASE  IF NOT EXISTS `tactcube` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tactcube`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: tactcube
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES ('DA1','smartbulb','action','Turn on the bulb'),('DA1','smartcurtain','action','Turn on the curtain'),('DA1','smartspeaker','action','Turn on the speaker'),('DA2','smartbulb','action','Turn off the light'),('DA2','smartcurtain','action','Turn off the curtain'),('DA2','smartspeaker','action','Turn off the speaker'),('DA3-','smartbulb','action','Stop'),('DA3-','smartcurtain','action','Stop'),('DA3-','smartspeaker','action','Stop'),('DA3+','smartbulb','action','Play'),('DA3+','smartcurtain','action','Play'),('DA3+','smartspeaker','action','Play'),('DF1','smartbulb','feedback','Device announcement'),('DF1','smartcurtain','feedback','Device announcement'),('DF1','smartspeaker','feedback','Device announcement'),('DF2','smartbulb','feedback','Device is not ready'),('DF2','smartcurtain','feedback','Device is not ready'),('DF2','smartspeaker','feedback','Device is not ready'),('DF3','smartbulb','feedback','Device is on'),('DF3','smartcurtain','feedback','Device is on'),('DF3','smartspeaker','feedback','Device is on'),('DF4','smartbulb','feedback','Device is off'),('DF4','smartcurtain','feedback','Device is off'),('DF4','smartspeaker','feedback','Device is off'),('DF5','smartbulb','feedback','Device is loading'),('DF5','smartcurtain','feedback','Device is loading'),('DF5','smartspeaker','feedback','Device is loading'),('DF6','smartbulb','feedback','Action successfully accomplished'),('DF6','smartcurtain','feedback','Action successfully accomplished'),('DF6','smartspeaker','feedback','Action successfully accomplished'),('DF7','smartbulb','feedback','Device generated an error'),('DF7','smartcurtain','feedback','Device generated an error'),('DF7','smartspeaker','feedback','Device generated an error'),('DN1','smartbulb','navigation','Increase the intensity of light'),('DN1','smartcurtain','navigation','Increase the amount of light that can filter'),('DN1','smartspeaker','navigation','Increase the speaker volume'),('DN2','smartbulb','navigation','Decrease the intensity of light'),('DN2','smartcurtain','navigation','Decrease the amount of light that can filter'),('DN2','smartspeaker','navigation','Decrease the speaker volume'),('DN3-','smartbulb','navigation','Change the color of the light (back)'),('DN3-','smartcurtain','navigation','Change fissure preset (close)'),('DN3-','smartspeaker','navigation','Change audio preset (back)'),('DN3+','smartbulb','navigation','Change the color of the light (next)'),('DN3+','smartcurtain','navigation','Change fissure preset (open)'),('DN3+','smartspeaker','navigation','Change audio preset (next)'),('DN4','smartbulb','navigation','Select a behavioural program (the bulb simulates the sunrise, sunset...)'),('DN4','smartcurtain','navigation','Select a behavioural program (the curtain follows the movement of the sunrise, sunset...)'),('DN4','smartspeaker','navigation','Select playlist type (the speaker plays rock, pop, classic...)'),('DN5','smartbulb','navigation','Select switch-on time'),('DN5','smartcurtain','navigation','Select switch-on time'),('DN5','smartspeaker','navigation','Select switch-on time'),('DN6','smartbulb','navigation','Select shutdown time'),('DN6','smartcurtain','navigation','Select shutdown time'),('DN6','smartspeaker','navigation','Select shutdown time'),('EA1','smartbulb','action','Access to the environment'),('EA1','smartcurtain','action','Access to the environment'),('EA1','smartspeaker','action','Access to the environment'),('EF1','smartbulb','feedback','Presence of intelligent environment'),('EF1','smartcurtain','feedback','Presence of intelligent environment'),('EF1','smartspeaker','feedback','Presence of intelligent environment'),('EN1','smartbulb','navigation','Select the light'),('EN1','smartcurtain','navigation','Select the curtain'),('EN1','smartspeaker','navigation','Select the speaker'),('EN2','smartbulb','navigation','Deselect the light'),('EN2','smartcurtain','navigation','Deselect the curtain'),('EN2','smartspeaker','navigation','Deselect the speaker');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('admin','admin','admin',0,'admin','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-14 13:54:38
