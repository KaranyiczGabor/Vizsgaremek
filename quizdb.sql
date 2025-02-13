-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 13. 09:18
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `quizdb`
--
CREATE DATABASE IF NOT EXISTS `quizdb` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `quizdb`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `answers`
--

CREATE TABLE `answers` (
  `id` char(36) NOT NULL,
  `question_id` char(36) NOT NULL,
  `answer_text` varchar(60) NOT NULL,
  `correct` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `answer_text`, `correct`) VALUES
('fd6cbe3b-e9e2-11ef-b055-706655625e18', 'e8d0cef4-e9e2-11ef-b055-706655625e18', 'Károly Róbert', 0),
('fd6cc200-e9e2-11ef-b055-706655625e18', 'e8d0cef4-e9e2-11ef-b055-706655625e18', 'Szent István', 1),
('fd6cc335-e9e2-11ef-b055-706655625e18', 'e8d0cef4-e9e2-11ef-b055-706655625e18', 'IV. Béla', 0),
('fd6cc4c1-e9e2-11ef-b055-706655625e18', 'e8d0cef4-e9e2-11ef-b055-706655625e18', 'Mátyás király', 0),
('fd6cc577-e9e2-11ef-b055-706655625e18', 'e8d0d127-e9e2-11ef-b055-706655625e18', 'Afrika', 0),
('fd6cc61b-e9e2-11ef-b055-706655625e18', 'e8d0d127-e9e2-11ef-b055-706655625e18', 'Ázsia', 1),
('fd6cc6d5-e9e2-11ef-b055-706655625e18', 'e8d0d127-e9e2-11ef-b055-706655625e18', 'Európa', 0),
('fd71021a-e9e2-11ef-b055-706655625e18', 'e8d0d127-e9e2-11ef-b055-706655625e18', 'Amerika', 0),
('fd7104e7-e9e2-11ef-b055-706655625e18', 'e8d0d1ba-e9e2-11ef-b055-706655625e18', '6', 0),
('fd710666-e9e2-11ef-b055-706655625e18', 'e8d0d1ba-e9e2-11ef-b055-706655625e18', '7', 0),
('fd7107cb-e9e2-11ef-b055-706655625e18', 'e8d0d1ba-e9e2-11ef-b055-706655625e18', '8', 1),
('fd710922-e9e2-11ef-b055-706655625e18', 'e8d0d1ba-e9e2-11ef-b055-706655625e18', '9', 0),
('fd710a25-e9e2-11ef-b055-706655625e18', 'e8d0d1e4-e9e2-11ef-b055-706655625e18', 'Tenisz', 1),
('fd710adf-e9e2-11ef-b055-706655625e18', 'e8d0d1e4-e9e2-11ef-b055-706655625e18', 'Labdarúgás', 0),
('fd710b97-e9e2-11ef-b055-706655625e18', 'e8d0d1e4-e9e2-11ef-b055-706655625e18', 'Kosárlabda', 0),
('fd710c4a-e9e2-11ef-b055-706655625e18', 'e8d0d1e4-e9e2-11ef-b055-706655625e18', 'Kézilabda', 0),
('fd710cfc-e9e2-11ef-b055-706655625e18', 'e8d0d20d-e9e2-11ef-b055-706655625e18', 'Jókai Mór', 0),
('fd710db3-e9e2-11ef-b055-706655625e18', 'e8d0d20d-e9e2-11ef-b055-706655625e18', 'Gárdonyi Géza', 0),
('fd710e5d-e9e2-11ef-b055-706655625e18', 'e8d0d20d-e9e2-11ef-b055-706655625e18', 'Molnár Ferenc', 1),
('fd710f08-e9e2-11ef-b055-706655625e18', 'e8d0d20d-e9e2-11ef-b055-706655625e18', 'Mikszáth Kálmán', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroleclaims`
--

CREATE TABLE `aspnetroleclaims` (
  `Id` int(11) NOT NULL,
  `RoleId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroles`
--

CREATE TABLE `aspnetroles` (
  `Id` varchar(255) NOT NULL,
  `Name` varchar(256) DEFAULT NULL,
  `NormalizedName` varchar(256) DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserclaims`
--

CREATE TABLE `aspnetuserclaims` (
  `Id` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserlogins`
--

CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(255) NOT NULL,
  `ProviderKey` varchar(255) NOT NULL,
  `ProviderDisplayName` longtext DEFAULT NULL,
  `UserId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserroles`
--

CREATE TABLE `aspnetuserroles` (
  `UserId` varchar(255) NOT NULL,
  `RoleId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusers`
--

CREATE TABLE `aspnetusers` (
  `Id` varchar(255) NOT NULL,
  `FullName` longtext DEFAULT NULL,
  `BirthDate` datetime(6) NOT NULL,
  `UserName` varchar(256) DEFAULT NULL,
  `NormalizedUserName` varchar(256) DEFAULT NULL,
  `Email` varchar(256) DEFAULT NULL,
  `NormalizedEmail` varchar(256) DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext DEFAULT NULL,
  `SecurityStamp` longtext DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL,
  `PhoneNumber` longtext DEFAULT NULL,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `aspnetusers`
--

INSERT INTO `aspnetusers` (`Id`, `FullName`, `BirthDate`, `UserName`, `NormalizedUserName`, `Email`, `NormalizedEmail`, `EmailConfirmed`, `PasswordHash`, `SecurityStamp`, `ConcurrencyStamp`, `PhoneNumber`, `PhoneNumberConfirmed`, `TwoFactorEnabled`, `LockoutEnd`, `LockoutEnabled`, `AccessFailedCount`) VALUES
('a6d0a0dd-7b6d-4208-bfbb-4c78cbbbd4da', NULL, '2025-02-09 11:10:30.398000', 'asdasd', 'ASDASD', 'string@gmail.com', 'STRING@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAEENI1uwTtLT/NPdBosqfCzCXkr5Xbut4Qg7yniohkPBj4fMEBHQJ5QyRtiq0ryJy9A==', 'DAWAGRJQHUU5XGPA5EKAH633BQ3CCUZ3', '98c3db6c-ff99-43cf-8856-e31d37020b6a', NULL, 0, 0, NULL, 1, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusertokens`
--

CREATE TABLE `aspnetusertokens` (
  `UserId` varchar(255) NOT NULL,
  `LoginProvider` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Value` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `attempts`
--

CREATE TABLE `attempts` (
  `id` char(36) NOT NULL,
  `uid` char(36) NOT NULL,
  `score` int(11) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `questions`
--

CREATE TABLE `questions` (
  `id` char(36) NOT NULL,
  `question` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `difficulty` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `questions`
--

INSERT INTO `questions` (`id`, `question`, `category`, `difficulty`) VALUES
('e8d0cef4-e9e2-11ef-b055-706655625e18', 'Ki volt Magyarország első királya?', 'Történelem', 1),
('e8d0d127-e9e2-11ef-b055-706655625e18', 'Melyik a legnagyobb kontinens?', 'Földrajz', 1),
('e8d0d1ba-e9e2-11ef-b055-706655625e18', 'Mennyi 5 + 3?', 'Matematika', 1),
('e8d0d1e4-e9e2-11ef-b055-706655625e18', 'Melyik sportágban használják a \"szerva\" kifejezést?', 'Sport', 1),
('e8d0d20d-e9e2-11ef-b055-706655625e18', 'Ki írta a „Pál utcai fiúk” című regényt?', 'Irodalom', 1),
('e8d0d22f-e9e2-11ef-b055-706655625e18', 'Melyik évben volt az 1848-49-es forradalom és szabadságharc?', 'Történelem', 2),
('e8d0d24e-e9e2-11ef-b055-706655625e18', 'Melyik ország fővárosa Lima?', 'Földrajz', 2),
('e8d0d26a-e9e2-11ef-b055-706655625e18', 'Melyik szám prímszám?', 'Matematika', 2),
('e8d0d28a-e9e2-11ef-b055-706655625e18', 'Ki nyerte a legtöbb Forma-1 világbajnoki címet?', 'Sport', 2),
('e8d0d2ab-e9e2-11ef-b055-706655625e18', 'Ki írta az „Ember tragédiája” című művet?', 'Irodalom', 2),
('e8d0d2c9-e9e2-11ef-b055-706655625e18', 'Mikor volt a mohácsi csata?', 'Történelem', 3),
('e8d0d2e4-e9e2-11ef-b055-706655625e18', 'Melyik a legmélyebb óceáni árok?', 'Földrajz', 3),
('e8d0d303-e9e2-11ef-b055-706655625e18', 'Melyik szám négyzete 289?', 'Matematika', 3),
('e8d0d31b-e9e2-11ef-b055-706655625e18', 'Melyik évben alapították az olimpiai játékokat?', 'Sport', 3),
('e8d0d33a-e9e2-11ef-b055-706655625e18', 'Ki volt a híres reneszánsz költő, aki a „Divina Commedia”-t írta?', 'Irodalom', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` char(36) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20250131091907_AuthDb', '8.0.12');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- A tábla indexei `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`);

--
-- A tábla indexei `aspnetroles`
--
ALTER TABLE `aspnetroles`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `RoleNameIndex` (`NormalizedName`);

--
-- A tábla indexei `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetUserClaims_UserId` (`UserId`);

--
-- A tábla indexei `aspnetuserlogins`
--
ALTER TABLE `aspnetuserlogins`
  ADD PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  ADD KEY `IX_AspNetUserLogins_UserId` (`UserId`);

--
-- A tábla indexei `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD PRIMARY KEY (`UserId`,`RoleId`),
  ADD KEY `IX_AspNetUserRoles_RoleId` (`RoleId`);

--
-- A tábla indexei `aspnetusers`
--
ALTER TABLE `aspnetusers`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  ADD KEY `EmailIndex` (`NormalizedEmail`);

--
-- A tábla indexei `aspnetusertokens`
--
ALTER TABLE `aspnetusertokens`
  ADD PRIMARY KEY (`UserId`,`LoginProvider`,`Name`);

--
-- A tábla indexei `attempts`
--
ALTER TABLE `attempts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`);

--
-- A tábla indexei `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

--
-- Megkötések a táblához `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  ADD CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  ADD CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserlogins`
--
ALTER TABLE `aspnetuserlogins`
  ADD CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetusertokens`
--
ALTER TABLE `aspnetusertokens`
  ADD CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `attempts`
--
ALTER TABLE `attempts`
  ADD CONSTRAINT `attempts_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
