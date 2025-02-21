-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 21. 09:58
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 7.3.29

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
  `id` char(36) COLLATE utf8_hungarian_ci NOT NULL,
  `question_id` char(36) COLLATE utf8_hungarian_ci NOT NULL,
  `answer_text` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
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
  `RoleId` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `ClaimType` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `ClaimValue` longtext COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroles`
--

CREATE TABLE `aspnetroles` (
  `Id` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `Name` varchar(256) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `NormalizedName` varchar(256) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `ConcurrencyStamp` longtext COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `aspnetroles`
--

INSERT INTO `aspnetroles` (`Id`, `Name`, `NormalizedName`, `ConcurrencyStamp`) VALUES
('9552b070-3f93-4921-bebd-ee5d8c8317b8', 'User', 'USER', NULL),
('a480dbc4-6bab-4bdf-9c99-87bcd7d4b4d8', 'Admin', 'ADMIN', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserclaims`
--

CREATE TABLE `aspnetuserclaims` (
  `Id` int(11) NOT NULL,
  `UserId` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `ClaimType` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `ClaimValue` longtext COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserlogins`
--

CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `ProviderKey` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `ProviderDisplayName` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `UserId` varchar(255) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserroles`
--

CREATE TABLE `aspnetuserroles` (
  `UserId` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `RoleId` varchar(255) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `aspnetuserroles`
--

INSERT INTO `aspnetuserroles` (`UserId`, `RoleId`) VALUES
('4e728bb3-329b-48cc-b1b2-3ec0b701b344', 'a480dbc4-6bab-4bdf-9c99-87bcd7d4b4d8'),
('5fe3921d-c391-4843-8305-72ed6b9d86c7', 'a480dbc4-6bab-4bdf-9c99-87bcd7d4b4d8');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusers`
--

CREATE TABLE `aspnetusers` (
  `Id` char(36) COLLATE utf8_hungarian_ci NOT NULL,
  `FullName` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `BirthDate` datetime(6) NOT NULL,
  `UserName` varchar(256) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `NormalizedUserName` varchar(256) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Email` varchar(256) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `NormalizedEmail` varchar(256) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `SecurityStamp` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `ConcurrencyStamp` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `PhoneNumber` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
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
('4e728bb3-329b-48cc-b1b2-3ec0b701b344', NULL, '0001-01-01 00:00:00.000000', 'famarko05', 'FAMARKO05', 'asd@gmail.com', 'ASD@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAEG0EyNAPE2qdZTEPWiBlbw0EZWuEFicZKGvSKYNp7jys+CIXUqHKgySRZQECXUuIAg==', '5ES2HWGMIEAJME73UIBTOYA62TSZE3CH', '83228e98-297d-49a0-b1e1-e29e036b9c31', NULL, 0, 0, NULL, 1, 0),
('5fe3921d-c391-4843-8305-72ed6b9d86c7', NULL, '0001-01-01 00:00:00.000000', 'admin', 'ADMIN', 'admin@gmail.com', 'ADMIN@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAEJsg21RGklN2wePzME+IZ7nz3wXktvvHawsZl1YOR+PlMqqqymmkAG0UnNh1IQng/w==', '6NRFGQDNDYLCMEQWOMNR3YFE45TCJZJG', '4a418373-f10d-44d5-857b-16a589aedfce', NULL, 0, 0, NULL, 1, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusertokens`
--

CREATE TABLE `aspnetusertokens` (
  `UserId` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `LoginProvider` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `Name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `Value` longtext COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `attempts`
--

CREATE TABLE `attempts` (
  `id` char(36) COLLATE utf8_hungarian_ci NOT NULL,
  `user_id` char(36) COLLATE utf8_hungarian_ci NOT NULL,
  `score` int(11) NOT NULL,
  `time_taken` int(11) NOT NULL DEFAULT 0,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(2, 'Földrajz'),
(5, 'Irodalom'),
(3, 'Matematika'),
(4, 'Sport'),
(1, 'Történelem');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `questions`
--

CREATE TABLE `questions` (
  `id` char(36) COLLATE utf8_hungarian_ci NOT NULL,
  `question` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `difficulty` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `questions`
--

INSERT INTO `questions` (`id`, `question`, `category_id`, `difficulty`) VALUES
('e8d0cef4-e9e2-11ef-b055-706655625e18', 'Ki volt Magyarország első királya?', 1, 1),
('e8d0d127-e9e2-11ef-b055-706655625e18', 'Melyik a legnagyobb kontinens?', 1, 1),
('e8d0d1ba-e9e2-11ef-b055-706655625e18', 'Mennyi 5 + 3?', 1, 1),
('e8d0d1e4-e9e2-11ef-b055-706655625e18', 'Melyik sportágban használják a \"szerva\" kifejezést?', 1, 1),
('e8d0d20d-e9e2-11ef-b055-706655625e18', 'Ki írta a „Pál utcai fiúk” című regényt?', 1, 1),
('e8d0d22f-e9e2-11ef-b055-706655625e18', 'Melyik évben volt az 1848-49-es forradalom és szabadságharc?', 1, 2),
('e8d0d24e-e9e2-11ef-b055-706655625e18', 'Melyik ország fővárosa Lima?', 1, 2),
('e8d0d26a-e9e2-11ef-b055-706655625e18', 'Melyik szám prímszám?', 1, 2),
('e8d0d28a-e9e2-11ef-b055-706655625e18', 'Ki nyerte a legtöbb Forma-1 világbajnoki címet?', 1, 2),
('e8d0d2ab-e9e2-11ef-b055-706655625e18', 'Ki írta az „Ember tragédiája” című művet?', 1, 2),
('e8d0d2c9-e9e2-11ef-b055-706655625e18', 'Mikor volt a mohácsi csata?', 1, 3),
('e8d0d2e4-e9e2-11ef-b055-706655625e18', 'Melyik a legmélyebb óceáni árok?', 1, 3),
('e8d0d303-e9e2-11ef-b055-706655625e18', 'Melyik szám négyzete 289?', 1, 3),
('e8d0d31b-e9e2-11ef-b055-706655625e18', 'Melyik évben alapították az olimpiai játékokat?', 1, 3),
('e8d0d33a-e9e2-11ef-b055-706655625e18', 'Ki volt a híres reneszánsz költő, aki a „Divina Commedia”-t írta?', 1, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_answers`
--

CREATE TABLE `user_answers` (
  `id` char(36) COLLATE utf8_hungarian_ci NOT NULL,
  `attempt_id` char(36) COLLATE utf8_hungarian_ci NOT NULL,
  `question_id` char(36) COLLATE utf8_hungarian_ci NOT NULL,
  `answer_id` char(36) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) COLLATE utf8_hungarian_ci NOT NULL,
  `ProductVersion` varchar(32) COLLATE utf8_hungarian_ci NOT NULL
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
  ADD UNIQUE KEY `unique_answers` (`question_id`,`answer_text`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `idx_answers_question_id` (`question_id`),
  ADD KEY `idx_answers_question` (`question_id`);

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
  ADD KEY `uid` (`user_id`),
  ADD KEY `idx_attempts_uid` (`user_id`),
  ADD KEY `idx_attempts_user` (`user_id`);

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- A tábla indexei `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_questions_category` (`category_id`);

--
-- A tábla indexei `user_answers`
--
ALTER TABLE `user_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attempt_id` (`attempt_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `answer_id` (`answer_id`);

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
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- Megkötések a táblához `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `attempts`
--
ALTER TABLE `attempts`
  ADD CONSTRAINT `fk_attempts_user` FOREIGN KEY (`user_id`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `fk_questions_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `user_answers`
--
ALTER TABLE `user_answers`
  ADD CONSTRAINT `user_answers_ibfk_1` FOREIGN KEY (`attempt_id`) REFERENCES `attempts` (`id`),
  ADD CONSTRAINT `user_answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `user_answers_ibfk_3` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
