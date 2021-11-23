-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2021 at 06:28 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `classroom_db`
--
CREATE DATABASE IF NOT EXISTS `classroom_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `classroom_db`;

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE IF NOT EXISTS `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `className` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `classSection` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `room` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `studentJoinCode` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `teacherJoinCode` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `className`, `classSection`, `subject`, `room`, `studentJoinCode`, `teacherJoinCode`, `createdAt`, `updatedAt`) VALUES
(1, 'Phát triển ứng dụng web', 'PTUDW', NULL, 'dummy room value', '6e3cda44-1dd8-4c8e-8e25-d86c5b0ef6cc', '150a9129-fd49-4d5a-9f90-8df86938830f', '2021-11-20 09:46:28', '2021-11-20 09:46:28'),
(2, 'Phát triển ứng dụng web nâng cao', 'PTUDWNC', NULL, 'dummy room value', '320f80cd-47d9-4357-ac56-c9680eba95be', '31720437-b570-46a2-bfb3-5f84e276f5d4', '2021-11-20 09:46:28', '2021-11-20 09:46:28'),
(3, 'Kiến trúc phần mềm', 'KTPM', '', 'dummy room value', '78b27dd1-7a33-43c8-b242-e6ac00ae2811', '039519fa-ea7a-4865-9653-fe5a475b7d31', '2021-11-20 09:46:28', '2021-11-20 09:46:28'),
(4, 'Mẫu thiết kế hướng đối tượng', 'MTKHDT', '', 'dummy room value', '27e7fb63-e1e7-420a-ab4e-d3cb3329ef45', 'fb99464a-f3ac-447d-b81b-24fa72eed446', '2021-11-20 09:46:28', '2021-11-20 09:46:28'),
(5, 'Lập trình Windows', 'LTWD', 'Windows', 'Test dummy room value', '32e01201-be63-4b0a-be75-d4170b50311a', '31e1a620-3686-4533-9db2-289f8bfb4415', '2021-11-20 09:46:28', '2021-11-20 09:46:28'),
(6, 'Lập trình ứng dụng di động', 'LTUDDD', 'Mobile', '', '952aa1e2-05b6-440d-9a62-324e076cc367', '5d028a12-963b-4a16-ab34-527a1b128fba', '2021-11-20 09:46:28', '2021-11-20 09:46:28'),
(7, 'Cơ sở dữ liệu', 'CSDL', 'Database', '', '204f61e6-7805-4fa0-8b30-1034831e6929', '151df0d5-f310-482e-957e-18a23fec7f6b', '2021-11-20 09:46:28', '2021-11-20 09:46:28'),
(8, 'Cấu trúc dữ liệu và giải thuật', 'CTDL&GT', '', '', '4f45a0f7-0b54-4992-88ea-f87056c36e15', 'b1bd4de2-e3e2-4ae4-a473-5c50e1e230b6', '2021-11-20 09:46:28', '2021-11-20 09:46:28'),
(9, 'Hệ điều hành', 'HDH', 'Operating System', '', '39af5339-ace8-4240-a05b-5d38863c8d81', 'c895209c-06c5-45b2-8897-03eb70f4eaa4', '2021-11-20 09:46:28', '2021-11-20 09:46:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `student_id` int(11) DEFAULT NULL,
  `image` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `isLock` tinyint(1) DEFAULT 0,
  `isVerify` tinyint(1) DEFAULT 0,
  `mailSecretCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registerType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `student_id`, `image`, `password`, `email`, `phone`, `isLock`, `isVerify`, `mailSecretCode`, `registerType`, `createdAt`, `updatedAt`) VALUES
(1, 'Bao Tien Nguyễn', NULL, 'https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=12b3be&_nc_ohc=iaSSiD4IA5cAX9pYIEl&_nc_ht=scontent.fsgn5-11.fna&edm=AP4hL3IEAAAA&oh=a2a0753078b90dcaacf04f49ed05045f&oe=61B6CBB8', '', 'baotien11355@gmail.com', '', 0, 0, NULL, 'socialLinked', '2021-11-14 08:46:53', '2021-11-14 08:46:53'),
(2, 'Tien Nguyen', NULL, 'https://lh3.googleusercontent.com/a/AATXAJwWTnApMspP9g0ymtVhUktPkM7JN1uYQBXYaF4P=s96-c', '', 'nguyenphubaotien@gmail.com', '', 0, 0, NULL, 'socialLinked', '2021-11-14 08:47:24', '2021-11-14 08:47:24'),
(3, 'Bluth George', 18120500, 'https://reqres.in/img/faces/1-image.jpg', '$2b$10$aAYikAHqVO/VAOlqYg8UHeoMRJkr.DY4mh4zN5RreQmI2ULJaR//K', 'george.bluth@reqres.in', '0247367688', 0, 1, 'q1pWBWdoqJgdT8jc9kwb9Ig8IB', 'registered', '2021-11-22 14:19:26', '2021-11-22 14:19:26'),
(4, 'Weaver Janet', 18120501, 'https://reqres.in/img/faces/2-image.jpg', '$2b$10$LnBeVNHYr2bCW6c72vrRVeASaLqR7.Y3zXjPqkoSAwwvaZ/UGJSRa', 'janet.weaver@reqres.in', '0199190050', 0, 1, 'L41JBd8R5b1yIMxDI6Hyz2I130', 'registered', '2021-11-22 14:19:26', '2021-11-22 14:19:26'),
(5, 'Wong Emma', 18120502, 'https://reqres.in/img/faces/3-image.jpg', '$2b$10$xePjpDGivb5FlbRZl.9IA.SHKiqAm7dwtDPpcb1Lxh5ooZ2l3g4/y', 'emma.wong@reqres.in', '0463017975', 0, 1, 'XcS9TDi0Eah2je9NS8TgpF5wFY', 'registered', '2021-11-22 14:19:26', '2021-11-22 14:19:26'),
(6, 'Holt Eve', 18120503, 'https://reqres.in/img/faces/4-image.jpg', '$2b$10$C5wKR9A4Nh5qjZEIm3OQ3uH.eqVNyEYG9tIYWYm45Etes8i0sfNT6', 'eve.holt@reqres.in', '0761096795', 0, 1, '9f0iAH1ZtbmXi81gViZxcdRl0o', 'registered', '2021-11-22 14:19:26', '2021-11-22 14:19:26'),
(7, 'Morris Charles', 18120504, 'https://reqres.in/img/faces/5-image.jpg', '$2b$10$/mg/G2c6Tgpv1PU0lIOA0ey2iW8vj4wNkINsagD8X.Zui80KouOne', 'charles.morris@reqres.in', '0665756808', 0, 1, 'LMuHKgeseDqEeL3qwL2JNqXqyw', 'registered', '2021-11-22 14:19:26', '2021-11-22 14:19:26'),
(8, 'Ramos Tracey', 18120505, 'https://reqres.in/img/faces/6-image.jpg', '$2b$10$4r3.NhJ42YwI.A6eTiv5GeSxu273rAecJg4Bh4UMQ.pnOQP3XSMfC', 'tracey.ramos@reqres.in', '0561589389', 0, 1, 'NOUf3WejS9TtqGoY2RWyvjZZSw', 'registered', '2021-11-22 14:19:26', '2021-11-22 14:19:26'),
(9, 'Lawson Michael', 18120506, 'https://reqres.in/img/faces/7-image.jpg', '$2b$10$/nejlq4ClkSrb2v0XcuPQ.WxhPAdY5KMKHkCE.Roc5mtGEZNJgzjy', 'michael.lawson@reqres.in', '0040982983', 0, 1, '4PHlZP1Qh6SIoIcrU7tyhN6qCF', 'registered', '2021-11-22 14:19:26', '2021-11-22 14:19:26'),
(10, 'Ferguson Lindsay', 18120507, 'https://reqres.in/img/faces/8-image.jpg', '$2b$10$bPk/FZnQw0fZldoamWEj.eR8CkyGRIg2Xq9NQikmwAGQiZtGlYmoy', 'lindsay.ferguson@reqres.in', '0651331638', 0, 1, 'LHy4mc22cNybvHuWJ9Be4odEoH', 'registered', '2021-11-22 14:19:26', '2021-11-22 14:19:26'),
(11, 'Funke Tobias', 18120508, 'https://reqres.in/img/faces/9-image.jpg', '$2b$10$xZ2WmAE.64mgbFexKSjrlecNkmtyyl9vvj8FJOl1RAcwPvNMWfo9S', 'tobias.funke@reqres.in', '0036779651', 0, 1, 'i4R5hb8Ye8VrJ8expjUk1LV8Wq', 'registered', '2021-11-22 14:19:26', '2021-11-22 14:19:26'),
(12, 'Fields Byron', 18120509, 'https://reqres.in/img/faces/10-image.jpg', '$2b$10$Ym.ebl0qwNuv93HhtgpUK.jEtVc5FDwIzssZd3cs3siap8ZSrLyhS', 'byron.fields@reqres.in', '0629114524', 0, 1, 'AwVKH4DERe7beScxZCUQn0MNQQ', 'registered', '2021-11-22 14:19:26', '2021-11-22 14:19:26'),
(13, 'Edwards George', 18120510, 'https://reqres.in/img/faces/11-image.jpg', '$2b$10$qhtv5Kue3lfov9BaMukvyOQMZAdtEjBi2Qs36AAgldvm3ZgkAnPEy', 'george.edwards@reqres.in', '0422274372', 0, 1, 'uhQwe9AUyAsJNbNY9UHbR5x7Pg', 'registered', '2021-11-22 14:19:26', '2021-11-22 14:19:26'),
(14, 'Howell Rachel', 18120511, 'https://reqres.in/img/faces/12-image.jpg', '$2b$10$/MAedzn3M5f00eHq9bcFzeaW1fospVL2o4Rs3cSUg4IIWkfapNFEW', 'rachel.howell@reqres.in', '0195651237', 0, 1, 'HmisZKmDd6IPRx8c0G6EsfCDWR', 'registered', '2021-11-22 14:19:26', '2021-11-22 14:19:26'),
(15, 'Nguyen Van A', 18120512, 'https://randomuser.me/api/portraits/men/17.jpg', '$2b$10$4KBMIBWon7WCTMTPNp3p/eKygZ.K.EUG2vOQrosY9Y/KN4UmE8dIO', 'user123@gmail.com', '0622219088', 0, 1, 'MafEIQZCeAm70IWHm1zTjfHyGF', 'registered', '2021-11-22 14:19:26', '2021-11-22 14:19:26'),
(16, 'Triet Nguyen', NULL, 'https://randomuser.me/api/portraits/men/64.jpg', '$2b$10$U8BtSg8P5wRQbo30GFHaC.NwnD7qjfWcsqQU4UKPEEY8U0aHYnLQ6', 'teacher123@gmail.com', '011-962-7516', 0, 1, 'T3okVv1jp6iyyjHZXschT5tIh6', 'registered', '2021-11-22 16:05:26', '2021-11-22 16:05:26');

-- --------------------------------------------------------

--
-- Table structure for table `usersclasses`
--

CREATE TABLE IF NOT EXISTS `usersclasses` (
  `ClassId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ClassId`,`UserId`),
  UNIQUE KEY `UsersClasses_UserId_ClassId_unique` (`ClassId`,`UserId`),
  KEY `UserId` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `usersclasses`
--

INSERT INTO `usersclasses` (`ClassId`, `UserId`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'student', '2021-11-22 17:06:43', '2021-11-22 17:06:43'),
(1, 2, 'student', '2021-11-22 17:10:13', '2021-11-22 17:10:13'),
(1, 3, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(1, 4, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(1, 5, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(1, 6, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(1, 7, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(1, 8, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(1, 9, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(1, 10, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(1, 11, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(1, 12, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(1, 13, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(1, 14, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(1, 15, 'student', '2021-11-22 17:02:45', '2021-11-22 17:02:45'),
(1, 16, 'teacher', '2021-11-22 16:17:11', '2021-11-22 16:17:11'),
(2, 1, 'student', '2021-11-22 17:06:43', '2021-11-22 17:06:43'),
(2, 2, 'student', '2021-11-22 17:10:13', '2021-11-22 17:10:13'),
(2, 3, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(2, 4, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(2, 5, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(2, 6, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(2, 7, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(2, 8, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(2, 9, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(2, 10, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(2, 11, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(2, 12, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(2, 13, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(2, 14, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(2, 15, 'student', '2021-11-22 17:02:45', '2021-11-22 17:02:45'),
(2, 16, 'teacher', '2021-11-22 16:17:11', '2021-11-22 16:17:11'),
(3, 1, 'teacher', '2021-11-16 18:07:08', '2021-11-16 18:26:37'),
(3, 2, 'teacher', '2021-11-14 17:49:15', '2021-11-16 18:35:35'),
(3, 3, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(3, 4, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(3, 5, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(3, 6, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(3, 7, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(3, 8, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(3, 9, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(3, 10, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(3, 11, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(3, 12, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(3, 13, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(3, 14, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(3, 15, 'student', '2021-11-22 17:02:45', '2021-11-22 17:02:45'),
(3, 16, 'teacher', '2021-11-22 16:17:11', '2021-11-22 16:17:11'),
(4, 1, 'student', '2021-11-22 17:06:43', '2021-11-22 17:06:43'),
(4, 2, 'student', '2021-11-17 08:23:51', '2021-11-17 08:23:51'),
(4, 3, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(4, 4, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(4, 5, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(4, 6, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(4, 7, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(4, 8, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(4, 9, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(4, 10, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(4, 11, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(4, 12, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(4, 13, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(4, 14, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(4, 15, 'student', '2021-11-22 17:02:45', '2021-11-22 17:02:45'),
(4, 16, 'teacher', '2021-11-22 16:17:11', '2021-11-22 16:17:11'),
(5, 1, 'student', '2021-11-22 17:06:43', '2021-11-22 17:06:43'),
(5, 2, 'student', '2021-11-22 17:10:13', '2021-11-22 17:10:13'),
(5, 3, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(5, 4, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(5, 5, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(5, 6, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(5, 7, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(5, 8, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(5, 9, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(5, 10, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(5, 11, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(5, 12, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(5, 13, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(5, 14, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(5, 15, 'teacher', '2021-11-22 17:02:45', '2021-11-22 17:02:45'),
(5, 16, 'teacher', '2021-11-22 16:17:11', '2021-11-22 16:17:11'),
(6, 1, 'teacher', '0000-00-00 00:00:00', '2021-11-20 10:26:18'),
(6, 2, 'teacher', '2021-11-16 19:45:33', '2021-11-17 09:49:18'),
(6, 3, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(6, 4, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(6, 5, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(6, 6, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(6, 7, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(6, 8, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(6, 9, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(6, 10, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(6, 11, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(6, 12, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(6, 13, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(6, 14, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(6, 15, 'teacher', '2021-11-22 17:02:45', '2021-11-22 17:02:45'),
(6, 16, 'teacher', '2021-11-22 16:17:11', '2021-11-22 16:17:11'),
(7, 1, 'student', '2021-11-22 17:06:43', '2021-11-22 17:06:43'),
(7, 2, 'student', '2021-11-22 17:10:13', '2021-11-22 17:10:13'),
(7, 3, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(7, 4, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(7, 5, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(7, 6, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(7, 7, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(7, 8, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(7, 9, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(7, 10, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(7, 11, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(7, 12, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(7, 13, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(7, 14, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(7, 15, 'student', '2021-11-22 17:02:45', '2021-11-22 17:02:45'),
(7, 16, 'teacher', '2021-11-22 16:17:11', '2021-11-22 16:17:11'),
(8, 1, 'student', '2021-11-22 17:06:43', '2021-11-22 17:06:43'),
(8, 2, 'student', '2021-11-17 08:00:46', '2021-11-17 08:03:41'),
(8, 3, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(8, 4, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(8, 5, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(8, 6, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(8, 7, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(8, 8, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(8, 9, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(8, 10, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(8, 11, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(8, 12, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(8, 13, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(8, 14, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(8, 15, 'student', '2021-11-22 17:02:45', '2021-11-22 17:02:45'),
(8, 16, 'teacher', '2021-11-22 16:17:11', '2021-11-22 16:17:11'),
(9, 1, 'teacher', '2021-11-22 17:06:43', '2021-11-22 17:06:43'),
(9, 2, 'student', '2021-11-22 17:10:13', '2021-11-22 17:10:13'),
(9, 3, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(9, 4, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(9, 5, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(9, 6, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(9, 7, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(9, 8, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(9, 9, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(9, 10, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(9, 11, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(9, 12, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(9, 13, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(9, 14, 'student', '2021-11-22 16:49:38', '2021-11-22 16:49:38'),
(9, 15, 'teacher', '2021-11-22 17:02:45', '2021-11-22 17:02:45'),
(9, 16, 'teacher', '2021-11-22 16:17:11', '2021-11-22 16:17:11');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `usersclasses`
--
ALTER TABLE `usersclasses`
  ADD CONSTRAINT `usersclasses_ibfk_1` FOREIGN KEY (`ClassId`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usersclasses_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
