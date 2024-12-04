-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: localhost
-- Létrehozás ideje: 2024. Dec 04. 08:28
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `13a_szallasfoglalo`
--
CREATE DATABASE IF NOT EXISTS `13a_szallasfoglalo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `13a_szallasfoglalo`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `accomodations`
--

CREATE TABLE `accomodations` (
  `id` varchar(40) NOT NULL,
  `title` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `price` double NOT NULL DEFAULT 0,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `rating` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `accomodations`
--

INSERT INTO `accomodations` (`id`, `title`, `address`, `price`, `phone`, `email`, `description`, `rating`) VALUES
('adewqerewqerwqerewqrqesdf', 'Elizabeth Hotel', '6500 Baja, Bokodi út 17-21.', 6890, '34534543', 'hotelelizabet@gmail.com', NULL, 5),
('werwqererfasdfadsfsadfasdfasdf', 'Duna Hotel', '6500 Baja, Szentháromság tér 1.', 8900, '34543545', 'dunahotel@gmail.com', NULL, 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookings`
--

CREATE TABLE `bookings` (
  `id` varchar(40) NOT NULL,
  `userID` varchar(40) NOT NULL,
  `accomID` varchar(40) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` varchar(40) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `passwd` varchar(40) NOT NULL,
  `role` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `passwd`, `role`) VALUES
('08438f73-9d61-4427-a88c-38da2d4ac504', 'Teszt Felhasználó 1', 'teszt1@gamil.com', '5ea345ab330cf29f81d8de9bf5466f508fe351e1', 'user'),
('98438f73-9d61-4427-a88c-38da2d4ac50f', 'Adminisztrátor', 'admin@admin.hu', '5ea345ab330cf29f81d8de9bf5466f508fe351e1', 'admin');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `accomodations`
--
ALTER TABLE `accomodations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `accomID` (`accomID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
