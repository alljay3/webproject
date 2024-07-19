-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 21 2023 г., 14:38
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `ad_site`
--

-- --------------------------------------------------------

--
-- Структура таблицы `listing`
--

CREATE TABLE `listing` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(1200) NOT NULL,
  `price` int(11) NOT NULL,
  `date_created` date NOT NULL,
  `address` varchar(100) NOT NULL,
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `listing`
--

INSERT INTO `listing` (`id`, `user_id`, `title`, `description`, `price`, `date_created`, `address`, `type_id`) VALUES
(12, 1, 'Арендую выпрямитель волос дайсон', 'Арендую выпрямитель волос дайсон на неопределенный срок', 100, '2023-12-17', 'Вологда', 2),
(13, 1, 'Нужен юрист!!!!!', 'Срочно нужен профессиональный юрист в честную компанию', 1000000, '2023-12-17', 'Иркутск, Байкальская 180', 1),
(14, 1, 'Отдам айфон бесплатно', 'Реально бесплатный айфон, пиши сейчас и получишь ещё 5000 рублей на карту', 0, '2023-12-17', 'Улица пушкина, дом калатушкина', 10),
(15, 11, 'Арендую москвич', 'Срочно нужен старый москвич для организации похорон российского автопрома', 15500, '2023-12-18', 'Ангарск', 2),
(19, 14, 'Куплю кулебяку', 'Куплю вкусную и свежую кулебяку', 100, '2023-12-21', 'Бульвар Гагарина 20', 9);

-- --------------------------------------------------------

--
-- Структура таблицы `listing_image`
--

CREATE TABLE `listing_image` (
  `id` int(11) NOT NULL,
  `listing_id` int(11) NOT NULL,
  `link` varchar(200) NOT NULL,
  `mime_type` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `listing_image`
--

INSERT INTO `listing_image` (`id`, `listing_id`, `link`, `mime_type`) VALUES
(47, 19, './files/4ea402fb-879e-42b5-a391-8afbc9ac1004.jpeg', 'image/jpeg'),
(48, 19, './files/0a9c6299-2dc3-4b92-92ea-8e20373926ec.jpeg', 'image/jpeg'),
(49, 19, './files/d7877b24-c3a9-411b-a80d-d6eef818f177.jpeg', 'image/jpeg'),
(50, 13, './files/d62329cc-9329-4469-b3df-e120c1de1353.jpeg', 'image/jpeg'),
(51, 13, './files/f149c783-44b1-4628-93b6-74ed25ae83fb.jpeg', 'image/jpeg'),
(52, 12, './files/d8e251f2-ad8b-4aa4-aec4-b356184c0fd3.webp', 'image/webp'),
(53, 12, './files/4d0c337e-be10-4cce-bf58-aeb8ed6ab808.webp', 'image/webp'),
(54, 14, './files/b49f1a2b-ec34-49b8-8434-af9b18d36a63.jpeg', 'image/jpeg'),
(55, 15, './files/d1eac175-87d6-431f-9f3b-bb67e4bc78e8.jpeg', 'image/jpeg'),
(56, 15, './files/70d70aa9-1ff9-49ea-94c5-2000c1132088.jpeg', 'image/jpeg'),
(57, 15, './files/3a0d812e-6319-45d8-b089-e0e3114fe88f.jpeg', 'image/jpeg'),
(58, 15, './files/ac9feb62-55bb-43e9-9921-f2f38f5e696b.jpeg', 'image/jpeg');

-- --------------------------------------------------------

--
-- Структура таблицы `listing_type`
--

CREATE TABLE `listing_type` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `listing_type`
--

INSERT INTO `listing_type` (`id`, `name`) VALUES
(1, 'Работа'),
(2, 'Аренда'),
(5, 'asd'),
(9, 'Покупка'),
(10, 'Скам');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `role_id`, `profile_id`) VALUES
(1, 'alljay', 'ff@mail.ru', '1234', 1, 1),
(4, 'fdfs', 'asd@1', '$2a$10$JlUmoN5ZRejuUR2RPUXku.xKkPkBWjPoXv/.7kUHuAuq3hRYVg.dG', 1, 4),
(5, 'fdfsdasd', 'asd@1', '$2a$10$78987FIe1knc8bxWgoXC6O/pYM7Utj3E1frFfmlEqvMlnrzMCth7m', 1, 5),
(8, 'da', 'g@mail.ru', '$2a$10$zTs6oGf9mD/bMW3lnLGgiu4CRw4U0Jk7J8ZFTDJn/nX.GSQ.63y7K', 1, 8),
(9, 'dad', 'g@mail.ru', '$2a$10$JdswTYhCCd4hVzU6yFoEJe9mnnvdVKN49zh/7J4j272pXHPRjf.ZO', 1, 9),
(10, 'al', 'g@1', '$2a$10$xO0WpZlL3/W5Mgn8hwmEpeCesMHUXgnECymrDJ5ljpCMzQeNKxSCK', 1, 10),
(11, '1', 'fsdf@f', '$2a$10$aXyypGGqBYvAWHxrurVe3.AJaerqp/fkz/JeYMCFnh0fG4TTfygVu', 2, 11),
(12, '2', 'fas@g', '$2a$10$F/o.QNgB2xg1donxjf7D6OhdhHoy/2GPOoDM.GocKrBU8t.Vogr5S', 1, 12),
(13, 'alljay2', 'miha@ya', '$2a$10$0BozisdM10kNO977FzfrS.c.uYmU7uV2GlRHxMGqyeW9nlPvVltpi', 1, 13),
(14, 'admin', 'admin@mail.ru', '$2a$10$.9o71./kipXqAsDSfglVa.DUYDQDs2n88bWIYeuuln59PGlcUGpd2', 2, 14),
(15, 'polzovatel', 'polzovatel@mail.ru', '$2a$10$N0xNZ2NX/8Iqq1gTksRmG.KXIN18alaK6TRTiEcXJ1O4qpRZKgheK', 1, 15);

-- --------------------------------------------------------

--
-- Структура таблицы `user_data`
--

CREATE TABLE `user_data` (
  `id` int(11) NOT NULL,
  `birthdate` date NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user_data`
--

INSERT INTO `user_data` (`id`, `birthdate`, `first_name`, `last_name`, `address`) VALUES
(1, '2013-12-09', 'Михаил', 'Спивачнко', 'Ангарск, 95-кв'),
(4, '2023-11-28', 'fsfs', 'dsf', 'sdfs'),
(5, '2023-11-28', 'fsfs', 'dsf', 'sdfs'),
(7, '2023-11-30', 'Михаил', 'Спиваченко', '95.05.12'),
(8, '2023-11-30', 'Михаил', 'Спиваченко', '95.05.12'),
(9, '2023-11-30', 'Михаил', 'Спиваченко', '95.05.12'),
(10, '2023-12-08', 'Fff', 'fsdf', '21332'),
(11, '2023-11-30', 'Михаил', 'Спиваченко', 'Иркутскк'),
(12, '2023-11-29', 'ss', 'sss', 'dad'),
(13, '2023-12-06', 'Миха', 'Спива', '95-24-674'),
(14, '2003-05-15', 'Михаил', 'Спиваченко', 'Иркутск, Игу Имит'),
(15, '2010-01-27', 'Даниил', 'Александров', 'Иркутск');

-- --------------------------------------------------------

--
-- Структура таблицы `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user_role`
--

INSERT INTO `user_role` (`id`, `name`) VALUES
(1, 'Пользователь'),
(2, 'Администратор');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `listing`
--
ALTER TABLE `listing`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`) USING BTREE,
  ADD KEY `user_id` (`user_id`) USING BTREE;

--
-- Индексы таблицы `listing_image`
--
ALTER TABLE `listing_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `listing_id` (`listing_id`) USING BTREE;

--
-- Индексы таблицы `listing_type`
--
ALTER TABLE `listing_type`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`) USING BTREE,
  ADD KEY `profile_id` (`profile_id`);

--
-- Индексы таблицы `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `listing`
--
ALTER TABLE `listing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT для таблицы `listing_image`
--
ALTER TABLE `listing_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT для таблицы `listing_type`
--
ALTER TABLE `listing_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `user_data`
--
ALTER TABLE `user_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `listing`
--
ALTER TABLE `listing`
  ADD CONSTRAINT `listing_ibfk_133` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listing_ibfk_134` FOREIGN KEY (`type_id`) REFERENCES `listing_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `listing_image`
--
ALTER TABLE `listing_image`
  ADD CONSTRAINT `listing_image_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_133` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_134` FOREIGN KEY (`profile_id`) REFERENCES `user_data` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
