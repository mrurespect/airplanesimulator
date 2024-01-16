-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 16 jan. 2024 à 14:00
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `jee_projet`
--

-- --------------------------------------------------------

--
-- Structure de la table `aeroport`
--

CREATE TABLE `aeroport` (
  `id_aeroport` int(11) NOT NULL,
  `acces_piste` int(11) DEFAULT NULL,
  `attente_sol` int(11) DEFAULT NULL,
  `boucle_attente` int(11) DEFAULT NULL,
  `delai_anticollision` int(11) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `nombre_piste` int(11) DEFAULT NULL,
  `localisation` int(11) DEFAULT NULL,
  `localisation_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `aeroport`
--

INSERT INTO `aeroport` (`id_aeroport`, `acces_piste`, `attente_sol`, `boucle_attente`, `delai_anticollision`, `nom`, `nombre_piste`, `localisation`, `localisation_id`) VALUES
(0, 1, -144, 3, 4, 'Dubai', 3, 4, 4),
(1, 0, 79, 0, 4, 'casa', 1, 1, 1),
(2, 1, 28, 3, 4, 'NewYork', 1, 5, 5),
(3, 1, 124, 3, 4, 'CapTown', 1, 3, 3),
(4, 1, 0, 3, 4, 'Brazilia', 3, 6, 6),
(5, 1, 1, 3, 4, 'Cairo', 3, 7, 7),
(9, 1, -62, 3, 4, 'Moscow', 3, 8, 8),
(10, 1, -12, 3, 4, 'Canbera', 3, 9, 9);

-- --------------------------------------------------------

--
-- Structure de la table `avion`
--

CREATE TABLE `avion` (
  `id` int(11) NOT NULL,
  `altitude` double DEFAULT NULL,
  `altitude_mximale` int(11) DEFAULT NULL,
  `capacite_maximale` int(11) DEFAULT NULL,
  `consomation` int(11) DEFAULT NULL,
  `niveau_kerosene` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `vitess` int(11) DEFAULT NULL,
  `vitess_maximale` int(11) DEFAULT NULL,
  `aeroport_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `avion`
--

INSERT INTO `avion` (`id`, `altitude`, `altitude_mximale`, `capacite_maximale`, `consomation`, `niveau_kerosene`, `type`, `vitess`, `vitess_maximale`, `aeroport_id`) VALUES
(1, 1, 1, 1, 1, 1, 'alpha', 220, 1, 1),
(2, 1, 1, 1, 1, 1, 'beta', 100, 1, NULL),
(3, 1, 1, 1, 1, 1, 'gamma', 520, 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `coordonnee`
--

CREATE TABLE `coordonnee` (
  `id` int(11) NOT NULL,
  `x` double DEFAULT NULL,
  `y` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `coordonnee`
--

INSERT INTO `coordonnee` (`id`, `x`, `y`) VALUES
(1, 33.5731, -7.5898),
(2, 28.96, -9.13),
(3, -33.9249, 18.4241),
(4, 25, 55),
(5, 40.7128, -74.006),
(6, -15.7801, -47.9292),
(7, 30.0444, 31.2357),
(8, 55.57, 37.61),
(9, -35.28, 149.12);

-- --------------------------------------------------------

--
-- Structure de la table `trajectoire`
--

CREATE TABLE `trajectoire` (
  `id_tra` int(11) NOT NULL,
  `distance` double DEFAULT NULL,
  `flot` int(11) DEFAULT NULL,
  `aeroport_arrivet_id_aeroport` int(11) DEFAULT NULL,
  `aeroport_depart_id_aeroport` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `trajectoire`
--

INSERT INTO `trajectoire` (`id_tra`, `distance`, `flot`, `aeroport_arrivet_id_aeroport`, `aeroport_depart_id_aeroport`) VALUES
(45, 68.78949184235918, 3, 4, 3),
(46, 62.22095506057425, 3, 2, 4),
(47, 24.293783687396246, 3, 5, 0),
(48, 65.23962321358087, 3, 3, 5),
(49, 62.22095506057425, 3, 4, 2),
(50, 63.74170959897451, 3, 1, 4),
(51, 24.293783687396246, 3, 5, 0),
(52, 26.3094651380449, 3, 9, 5),
(53, 26.3094651380449, 3, 5, 9),
(54, 24.293783687396246, 3, 0, 5),
(55, 62.22095506057425, 3, 4, 2),
(56, 63.74170959897451, 3, 1, 4),
(57, 2, 2, 4, 3),
(58, 2, 2, 1, 2),
(59, 2, 2, 2, 10),
(60, 38.985525184868294, 3, 5, 1),
(62, 2, 2, 2, 10),
(63, 24.293783687396246, 3, 0, 5),
(64, 111.7687469733825, 3, 10, 0);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `password`, `username`) VALUES
(1, '1234', 'mohamed'),
(2, '1234', 'mehdi');

-- --------------------------------------------------------

--
-- Structure de la table `vol`
--

CREATE TABLE `vol` (
  `id` int(11) NOT NULL,
  `heur_depart` datetime(6) DEFAULT NULL,
  `avion_id` int(11) DEFAULT NULL,
  `date_depart` datetime(6) DEFAULT NULL,
  `aeroport_arrivet_id_aeroport` int(11) DEFAULT NULL,
  `aeroport_depart_id_aeroport` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vol`
--

INSERT INTO `vol` (`id`, `heur_depart`, `avion_id`, `date_depart`, `aeroport_arrivet_id_aeroport`, `aeroport_depart_id_aeroport`, `type`) VALUES
(32, NULL, 1, NULL, 2, 3, NULL),
(33, NULL, 2, NULL, 3, 0, NULL),
(36, NULL, 1, NULL, 0, 9, NULL),
(39, NULL, 2, NULL, 1, 2, 'direct'),
(42, NULL, 3, NULL, 2, 10, 'direct'),
(43, NULL, 2, NULL, 10, 5, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `vol_trajectoires`
--

CREATE TABLE `vol_trajectoires` (
  `vol_id` int(11) NOT NULL,
  `trajectoires_id_tra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vol_trajectoires`
--

INSERT INTO `vol_trajectoires` (`vol_id`, `trajectoires_id_tra`) VALUES
(32, 45),
(32, 46),
(33, 47),
(33, 48),
(36, 53),
(36, 54),
(39, 58),
(42, 62),
(43, 63),
(43, 64);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `aeroport`
--
ALTER TABLE `aeroport`
  ADD PRIMARY KEY (`id_aeroport`),
  ADD UNIQUE KEY `UK_7v5u1h3xmng4ouj17oj87j3ut` (`localisation`),
  ADD UNIQUE KEY `UK_s8t2obwf9t8kgrs39xf6qitt6` (`localisation_id`);

--
-- Index pour la table `avion`
--
ALTER TABLE `avion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKj5k021e781nxv6l5c1lof15s4` (`aeroport_id`);

--
-- Index pour la table `coordonnee`
--
ALTER TABLE `coordonnee`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `trajectoire`
--
ALTER TABLE `trajectoire`
  ADD PRIMARY KEY (`id_tra`),
  ADD KEY `FK9e064eyoub2qapsp6k7lkpnt3` (`aeroport_arrivet_id_aeroport`),
  ADD KEY `FKgqml1a6qhousiov31m10bl470` (`aeroport_depart_id_aeroport`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `vol`
--
ALTER TABLE `vol`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKi36u7096ahgjbjwinm85pfwjw` (`avion_id`),
  ADD KEY `FK3hao721cisap25plwnm00ptno` (`aeroport_arrivet_id_aeroport`),
  ADD KEY `FK5dgcj8vc6pvqsxn8sr6wcupia` (`aeroport_depart_id_aeroport`);

--
-- Index pour la table `vol_trajectoires`
--
ALTER TABLE `vol_trajectoires`
  ADD UNIQUE KEY `UK_gn3cv6pv6hbkbpbfwwe1of7o3` (`trajectoires_id_tra`),
  ADD KEY `FK2pkpxiy7axf19lq186r628unq` (`vol_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avion`
--
ALTER TABLE `avion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `coordonnee`
--
ALTER TABLE `coordonnee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `trajectoire`
--
ALTER TABLE `trajectoire`
  MODIFY `id_tra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `vol`
--
ALTER TABLE `vol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `aeroport`
--
ALTER TABLE `aeroport`
  ADD CONSTRAINT `FK17qgrxl0dgb2e34ntcy02o7rm` FOREIGN KEY (`localisation`) REFERENCES `coordonnee` (`id`),
  ADD CONSTRAINT `FKfg35h69b07mxsw4kkmbkoykeu` FOREIGN KEY (`localisation_id`) REFERENCES `coordonnee` (`id`);

--
-- Contraintes pour la table `avion`
--
ALTER TABLE `avion`
  ADD CONSTRAINT `FKj5k021e781nxv6l5c1lof15s4` FOREIGN KEY (`aeroport_id`) REFERENCES `aeroport` (`id_aeroport`);

--
-- Contraintes pour la table `trajectoire`
--
ALTER TABLE `trajectoire`
  ADD CONSTRAINT `FK9e064eyoub2qapsp6k7lkpnt3` FOREIGN KEY (`aeroport_arrivet_id_aeroport`) REFERENCES `aeroport` (`id_aeroport`),
  ADD CONSTRAINT `FKgqml1a6qhousiov31m10bl470` FOREIGN KEY (`aeroport_depart_id_aeroport`) REFERENCES `aeroport` (`id_aeroport`);

--
-- Contraintes pour la table `vol`
--
ALTER TABLE `vol`
  ADD CONSTRAINT `FK3hao721cisap25plwnm00ptno` FOREIGN KEY (`aeroport_arrivet_id_aeroport`) REFERENCES `aeroport` (`id_aeroport`),
  ADD CONSTRAINT `FK5dgcj8vc6pvqsxn8sr6wcupia` FOREIGN KEY (`aeroport_depart_id_aeroport`) REFERENCES `aeroport` (`id_aeroport`),
  ADD CONSTRAINT `FKi36u7096ahgjbjwinm85pfwjw` FOREIGN KEY (`avion_id`) REFERENCES `avion` (`id`);

--
-- Contraintes pour la table `vol_trajectoires`
--
ALTER TABLE `vol_trajectoires`
  ADD CONSTRAINT `FK2pkpxiy7axf19lq186r628unq` FOREIGN KEY (`vol_id`) REFERENCES `vol` (`id`),
  ADD CONSTRAINT `FK8wg9ibb46liy9709vnx8svglv` FOREIGN KEY (`trajectoires_id_tra`) REFERENCES `trajectoire` (`id_tra`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
