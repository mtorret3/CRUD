-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 03-10-2023 a las 01:31:11
-- Versión del servidor: 5.7.32
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `PRUEBA`
--
CREATE DATABASE IF NOT EXISTS `PRUEBA` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `PRUEBA`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `STATES`
--

DROP TABLE IF EXISTS `STATES`;
CREATE TABLE `STATES` (
  `id` int(11) NOT NULL,
  `estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `STATES`
--

INSERT INTO `STATES` (`id`, `estado`) VALUES
(1, 'Aguascalientes'),
(2, 'Baja California'),
(3, 'Baja California Sur'),
(4, 'Campeche'),
(5, 'Coahuila de Zaragoza'),
(6, 'Colima'),
(7, 'Chiapas'),
(8, 'Chihuahua'),
(9, 'Ciudad de México'),
(10, 'Durango'),
(11, 'Guanajuato'),
(12, 'Guerrero'),
(13, 'Hidalgo'),
(14, 'Jalisco'),
(15, 'México'),
(16, 'Michoacán de Ocampo'),
(17, 'Morelos'),
(18, 'Nayarit'),
(19, 'Nuevo León'),
(20, 'Oaxaca de Juárez'),
(21, 'Puebla'),
(22, 'Querétaro'),
(23, 'Quintana Roo'),
(24, 'San Luis Potosí'),
(25, 'Sinaloa'),
(26, 'Sonora'),
(27, 'Tabasco'),
(28, 'Tamaulipas'),
(29, 'Tlaxcala'),
(30, 'Veracruz de Ignacio de la Llave'),
(31, 'Yucatán'),
(32, 'Zacatecas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USERS`
--

DROP TABLE IF EXISTS `USERS`;
CREATE TABLE `USERS` (
  `PK_USERS` int(11) NOT NULL,
  `NICKNAME` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `NAME` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `PHONE` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `ADRESS` varchar(300) COLLATE utf8_spanish_ci NOT NULL,
  `CITY` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `STATE` int(11) NOT NULL,
  `PASSWORD` varchar(32) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `USERS`
--

INSERT INTO `USERS` (`PK_USERS`, `NICKNAME`, `NAME`, `PHONE`, `ADRESS`, `CITY`, `STATE`, `PASSWORD`) VALUES
(1, 'mtorre', 'Miguel de la Torre', '8111111111', 'Lomas 222 Col. Las Lomas', 'Monterrey', 19, '579646aad11fae4dd295812fb4526245'),
(5, 'Test', 'Test Gonzalez', '8120000000', 'Las Palmas 323 Col. Las Palmas', 'Monterrey', 19, '25d55ad283aa400af464c76d713c07ad'),
(6, 'Test', 'Test Gonzalez', '8110202222', 'Peñuelas 222 Colonia Callejones', 'Monterrey', 19, '25d55ad283aa400af464c76d713c07ad');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `STATES`
--
ALTER TABLE `STATES`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`PK_USERS`),
  ADD KEY `ESTADOS` (`STATE`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `STATES`
--
ALTER TABLE `STATES`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `USERS`
--
ALTER TABLE `USERS`
  MODIFY `PK_USERS` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `USERS`
--
ALTER TABLE `USERS`
  ADD CONSTRAINT `ESTADOS` FOREIGN KEY (`STATE`) REFERENCES `STATES` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
