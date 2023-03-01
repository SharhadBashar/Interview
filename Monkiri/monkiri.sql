-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2019 at 02:36 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `monkiri`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_language`
--

CREATE TABLE `app_language` (
  `code` char(2) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `app_language`
--

INSERT INTO `app_language` (`code`, `name`) VALUES
('en', 'English'),
('my', 'Burmese');

-- --------------------------------------------------------

--
-- Table structure for table `challenges`
--

CREATE TABLE `challenges` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(256) NOT NULL,
  `timeStart` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `timeEnd` datetime NOT NULL,
  `enabled` tinyint(1) DEFAULT '0',
  `sponsorId` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`id`, `name`, `description`, `timeStart`, `timeEnd`, `enabled`, `sponsorId`) VALUES
(1, 'Hot Streak', 'Complete a lesson 5 days in a row', '2019-04-14 16:45:14', '2019-04-14 16:45:14', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(10) UNSIGNED NOT NULL,
  `image_link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `image_link`) VALUES
(1, 'ic_investment.png'),
(2, 'ic_debt.png'),
(3, 'ic_taxes.png'),
(4, 'ic_internationalmoney.png'),
(5, 'ic_mobilewallet.png'),
(6, 'ic_savings.png'),
(7, 'ic_insurance.png'),
(8, 'ic_interest.png'),
(9, 'ic_coins.png'),
(10, 'icons/budgeting.png'),
(11, 'icons/business.png'),
(12, 'icons/debt.png'),
(13, 'icons/insurance.png'),
(14, 'icons/internationmoney.png'),
(15, 'icons/investment.png'),
(16, 'icons/mobilewallet.png'),
(17, 'icons/saving.png'),
(18, 'icons/taxes.png'),
(19, 'icons/inflation.png'),
(20, 'icons/financial_lifecycle_needs.png'),
(21, 'icons/interest.png'),
(22, 'icons/saving_level2.png');

-- --------------------------------------------------------

--
-- Table structure for table `lessoncategories`
--

CREATE TABLE `lessoncategories` (
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `color` varchar(7) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id` int(10) UNSIGNED NOT NULL,
  `image_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lessoncategories`
--

INSERT INTO `lessoncategories` (`name`, `description`, `color`, `created_at`, `updated_at`, `id`, `image_id`) VALUES
('Inflation', NULL, '#f05b72', '2019-03-14 00:17:17', '2019-07-21 02:15:56', 2, 19),
('Financial Lifecycle Needs', NULL, '#4db3b3', '2019-03-14 00:17:17', '2019-07-21 02:16:19', 3, 20),
('Interest', NULL, '#0071bc', '2019-03-14 00:24:22', '2019-07-21 02:17:44', 5, 21),
('Savings Level 1', NULL, '#88c25d', '2019-04-14 18:49:21', '2019-07-11 15:19:05', 6, 17),
('Savings Level 2', NULL, '#f2c249', '2019-04-14 18:49:53', '2019-07-21 02:17:07', 7, 22),
('Mobile Wallet', NULL, '#c74676', '2019-05-27 10:42:45', '2019-07-05 11:15:12', 8, 16),
('test', NULL, '#33A0C7', '2019-08-04 15:14:20', '2019-08-04 11:14:20', 10, 1);

--
-- Triggers `lessoncategories`
--
DELIMITER $$
CREATE TRIGGER `lessons_created_at_trg` BEFORE INSERT ON `lessoncategories` FOR EACH ROW BEGIN
        SET NEW.created_at = UTC_TIMESTAMP();
    END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `lessoncategories_translation`
--

CREATE TABLE `lessoncategories_translation` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL DEFAULT '0',
  `language_code` char(2) NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lessoncategories_translation`
--

INSERT INTO `lessoncategories_translation` (`id`, `category_id`, `language_code`, `name`, `description`) VALUES
(1, 2, 'en', 'Inflation', ''),
(2, 3, 'en', 'Financial Lifecycle Needs', ''),
(3, 5, 'en', 'Interest', ''),
(4, 6, 'en', 'Savings Level 1', ''),
(5, 7, 'en', 'Savings Level 2', ''),
(6, 8, 'en', 'Mobile Wallet', '');

-- --------------------------------------------------------

--
-- Table structure for table `lessonquestions`
--

CREATE TABLE `lessonquestions` (
  `id` int(10) UNSIGNED NOT NULL,
  `lessonId` int(10) UNSIGNED NOT NULL,
  `type` enum('text','input','multiplechoice','truefalse','word','wordimage','warn') NOT NULL,
  `name` varchar(50) NOT NULL,
  `question` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lessonquestions`
--

INSERT INTO `lessonquestions` (`id`, `lessonId`, `type`, `name`, `question`) VALUES
(1, 1, 'wordimage', 'Introduction', 'What is Interest?'),
(2, 1, 'multiplechoice', 'Introduction', 'Who Pays for a Loan?'),
(3, 1, 'wordimage', 'Introduction', 'Interest Example.'),
(5, 1, 'multiplechoice', 'Introduction', 'We borrow $50 today and in one year we need to repay $60. How much is the principal? How much is the Total Interest? '),
(6, 1, 'wordimage', 'Introduction', 'Finding Total Interest'),
(7, 1, 'text', 'Introduction', 'Sarah gives Lin $100 today. In one year, Line repays $105.'),
(9, 1, 'wordimage', 'Introduction', 'Interest Rate.'),
(10, 2, 'wordimage', 'Simple Interest', 'Calculating Simple Interest Video.'),
(11, 2, 'wordimage', 'Simple Interest', 'Simple Interest.'),
(12, 2, 'wordimage', 'Simple Interest', 'Parts that go into Simple Interest. '),
(13, 2, 'wordimage', 'Simple Interest', 'Simple Interest Math.'),
(14, 2, 'input', 'Simple Interest', 'If we need to repay $60 after borrowing $50. What was the interest rate?'),
(16, 2, 'wordimage', 'Simple Interest', 'Calculating the Total Amount with Simple Interest Formula.'),
(17, 2, 'input', 'Simple Interest', 'How much will we owe if we borrow $80 at 5% interest? '),
(18, 3, 'wordimage', 'Compound Interest', 'Compound Interest.'),
(19, 3, 'wordimage', 'Compound Interest', 'Compound Interest VS Simple Interest.'),
(20, 3, 'wordimage', 'Compound Interest', 'Time.'),
(21, 3, 'wordimage', 'Compound Interest', 'Growth.'),
(22, 3, 'wordimage', 'Compound Interest', 'How Compound Interest Works.'),
(23, 3, 'truefalse', 'Compound Interest', 'A loan with compound interest will be larger than the same loan with simple interest.'),
(24, 3, 'wordimage', 'Compound Interest', 'Compounding Periods.'),
(25, 3, 'wordimage', 'Compound Interest', 'Different Compounding Periods.'),
(26, 3, 'wordimage', 'Compound Interest', '4 Key Parts.'),
(27, 3, 'wordimage', 'Compound Interest', 'Math.'),
(28, 3, 'wordimage', 'Compound Interest', 'Summary.'),
(29, 5, 'word', 'Simple Interest', 'Calculating Simple Interest TF.'),
(30, 4, 'truefalse', 'Simple Interest', 'Calculating Simple Interest TF.'),
(31, 4, 'wordimage', 'Simple Interest', 'Calculating Simple Interest Video.'),
(32, 1, 'warn', 'Interest rates can be tricky', 'Compounding periods have a big impact!  \r\nInterest Level 3 covers this in more detail.'),
(33, 1, 'multiplechoice', 'Introduction', 'You borrow $20 and in one year we need to repay $25. What is the principal?'),
(34, 1, 'multiplechoice', 'Introduction', 'What is the more common way to describe a loan?'),
(35, 2, 'wordimage', 'Simple Interest', 'Limitations'),
(106, 12, 'input', 'This is a title', 'Is this a questions?'),
(109, 23, 'wordimage', 'This is a title', 'Is this a questions?'),
(110, 23, 'truefalse', 'This is a title', 'Is this a questions?'),
(122, 3, 'multiplechoice', 'This is a title', 'Is this a questions?'),
(123, 24, 'wordimage', 'Introduction', 'What is Saving?'),
(125, 25, 'wordimage', 'Test ', 'test Q 1'),
(127, 25, 'multiplechoice', 'This is a title', 'Is this a questions?'),
(128, 25, 'truefalse', 'This is a title', 'Is this a questions?'),
(138, 12, 'input', 'This is a title', 'Is this a questions?'),
(139, 12, 'wordimage', 'This is a title', 'Is this a questions?'),
(140, 25, 'input', 'This is a title', 'Is this a questions?'),
(141, 27, 'wordimage', 'Introduction', 'Financial Life Cycle Needs'),
(142, 28, 'wordimage', 'Introduction', 'Financial Life Cycle Needs Intro'),
(143, 29, 'wordimage', 'The Story of Sophal', 'Meet the Family'),
(144, 29, 'wordimage', 'The Story of Sophal', 'Financial Needs'),
(145, 29, 'wordimage', 'The Story of Sophal', 'Future Planning'),
(146, 29, 'wordimage', 'The Story of Sophal', 'Place the events in order for Sophal'),
(148, 30, 'wordimage', 'Personal Financial Life Cycle', 'Common Stages in Life'),
(149, 30, 'wordimage', 'Personal Financial Life Cycle', 'Identify your stage in Life'),
(150, 30, 'wordimage', 'Personal Financial Life Cycle', 'Make your own financial life cycle plan'),
(151, 18, 'wordimage', 'Introduction', 'What is Inflation?'),
(152, 18, 'wordimage', 'Introduction', 'What is Inflation?'),
(153, 18, 'wordimage', 'Introduction', 'Affects of Inflation'),
(154, 18, 'truefalse', 'Introduction', 'When inflation is at 2% and your saving rate is 1.5% your savings are increasing in value over time.'),
(155, 18, 'multiplechoice', 'Introduction', 'What situation will make you the most money.'),
(156, 18, 'wordimage', 'Introduction', 'Inflation and Borrowing'),
(157, 18, 'multiplechoice', 'Introduction', 'What is the best scenario for the borrower?'),
(158, 18, 'truefalse', 'Introduction', 'A lender has ways of protecting them self from inflation increases. '),
(159, 18, 'wordimage', 'Introduction', 'Inflation and Cash'),
(160, 18, 'truefalse', 'Introduction', 'Inflation does not effect cash'),
(161, 18, 'truefalse', 'Introduction', '$20 today will be worth $20 in 10 years'),
(162, 18, 'wordimage', 'Introduction', 'Summary'),
(163, 31, 'wordimage', 'Review', 'Question 1'),
(164, 31, 'wordimage', 'Review', 'Question 2'),
(165, 31, 'wordimage', 'Review', 'Question 3'),
(166, 31, 'wordimage', 'Review', 'Question 4'),
(167, 31, 'wordimage', 'Review', 'Question 5'),
(168, 31, 'wordimage', 'Review', 'Question 6'),
(169, 31, 'wordimage', 'Review', 'Inflation Rate'),
(170, 14, 'wordimage', 'Debt Title', 'Debt Question'),
(171, 24, 'wordimage', 'Introduction', 'Types of Saving'),
(172, 24, 'wordimage', 'Introduction', 'Urgent Savings'),
(173, 24, 'wordimage', 'Introduction', 'Short term goals'),
(174, 24, 'wordimage', 'Introduction', 'Long term goals'),
(175, 24, 'wordimage', 'Introduction', 'Separate the items into urgent, short term and long term saving goals'),
(176, 24, 'wordimage', 'Introduction', 'Necessity vs Luxury Savings'),
(177, 24, 'wordimage', 'Introduction', 'Necessity Goods'),
(178, 24, 'wordimage', 'Introduction', 'Luxury Goods'),
(179, 24, 'wordimage', 'Introduction', 'Separate the goods between necessity and luxury. '),
(180, 24, 'wordimage', 'Introduction', 'Exceptions '),
(181, 24, 'wordimage', 'Introduction', 'Why Savings'),
(182, 36, 'wordimage', 'Introduction', 'Ways to Save'),
(183, 36, 'wordimage', 'Ways to Save', 'Banks'),
(184, 36, 'wordimage', 'Ways to Save', 'Saving Group'),
(185, 36, 'wordimage', 'Ways to Save', 'Gold'),
(186, 36, 'wordimage', 'Ways to Save', 'Investments'),
(187, 36, 'wordimage', 'Ways to Save', 'Cash'),
(188, 36, 'wordimage', 'Ways to Save', 'Mobile Wallet'),
(189, 36, 'wordimage', 'Ways to Save', 'Summary'),
(190, 37, 'wordimage', 'Liquidity', 'Liquidity Video'),
(191, 37, 'wordimage', 'Liquidity', 'What is Liquidity'),
(192, 37, 'wordimage', 'Liquidity ', 'Order the savings type from most liquid to least liquid '),
(193, 35, 'wordimage', 'This is a title', 'Is this a questions?'),
(194, 38, 'wordimage', 'This is a title', 'Is this a questions?'),
(195, 39, 'wordimage', 'Introduction', 'Pros and Cons of Saving Types'),
(197, 39, 'wordimage', 'Pros and Cons', 'Bank - Positives'),
(198, 39, 'wordimage', 'Pros and Cons', 'Bank Negatives'),
(199, 39, 'wordimage', 'Pros and Cons', 'Saving Groups Positives'),
(200, 39, 'wordimage', 'Pros and Cons', 'Saving Groups Negatives'),
(201, 39, 'wordimage', 'Pros and Cons', 'Gold Positives'),
(202, 39, 'wordimage', 'Pros and Cons', 'Gold Negatives'),
(203, 39, 'wordimage', 'Pros and Cons', 'Cash Positives'),
(204, 39, 'wordimage', 'Pros and Cons', 'Cash Negatives'),
(205, 40, 'wordimage', 'Recap', 'Overview'),
(207, 41, 'multiplechoice', 'This is a title', 'Is this a questions?'),
(208, 41, 'input', 'This is a title', 'Is this a questions?'),
(209, 41, 'input', 'This is a title', 'Is this a questions?'),
(210, 42, 'wordimage', 'This is a title', 'Is this a questions?'),
(211, 43, 'wordimage', 'This is a title', 'Is this a questions?'),
(212, 44, 'wordimage', 'Ana Video', 'Ana\'s Saving');

-- --------------------------------------------------------

--
-- Table structure for table `lessonquestions_translation`
--

CREATE TABLE `lessonquestions_translation` (
  `id` int(11) NOT NULL,
  `lessonquestions_id` int(11) NOT NULL DEFAULT '0',
  `language_code` char(2) NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `question` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lessonquestions_translation`
--

INSERT INTO `lessonquestions_translation` (`id`, `lessonquestions_id`, `language_code`, `name`, `question`) VALUES
(1, 1, 'en', 'Introduction', 'What is Interest?'),
(2, 2, 'en', 'Introduction', 'Who Pays for a Loan?'),
(3, 3, 'en', 'Introduction', 'Interest Example.'),
(4, 5, 'en', 'Introduction', 'We borrow $50 today and in one year we need to repay $60. How much is the principal? How much is the Total Interest? '),
(5, 6, 'en', 'Introduction', 'Finding Total Interest'),
(6, 7, 'en', 'Introduction', 'Sarah gives Lin $100 today. In one year, Line repays $105.'),
(7, 9, 'en', 'Introduction', 'Interest Rate.'),
(8, 10, 'en', 'Simple Interest', 'Calculating Simple Interest Video.'),
(9, 11, 'en', 'Simple Interest', 'Simple Interest.'),
(10, 12, 'en', 'Simple Interest', 'Parts that go into Simple Interest. '),
(11, 13, 'en', 'Simple Interest', 'Simple Interest Math.'),
(12, 14, 'en', 'Simple Interest', 'If we need to repay $60 after borrowing $50. What was the interest rate?'),
(13, 15, 'en', 'Simple Interest', 'Calculating the Total Amount with Simple Interest Video. '),
(14, 16, 'en', 'Simple Interest', 'Calculating the Total Amount with Simple Interest Formula.'),
(15, 17, 'en', 'Simple Interest', 'How much will we owe if we borrow $80 at 5% interest? '),
(16, 18, 'en', 'Compound Interest', 'Compound Interest.'),
(17, 19, 'en', 'Compound Interest', 'Compound Interest VS Simple Interest.'),
(18, 20, 'en', 'Compound Interest', 'Time.'),
(19, 21, 'en', 'Compound Interest', 'Growth.'),
(20, 22, 'en', 'Compound Interest', 'How Compound Interest Works.'),
(21, 23, 'en', 'Compound Interest', 'A loan with compound interest will be larger than the same loan with simple interest.'),
(22, 24, 'en', 'Compound Interest', 'Compounding Periods.'),
(23, 25, 'en', 'Compound Interest', 'Different Compounding Periods.'),
(24, 26, 'en', 'Compound Interest', '4 Key Parts.'),
(25, 27, 'en', 'Compound Interest', 'Math.'),
(26, 28, 'en', 'Compound Interest', 'Summary.'),
(27, 29, 'en', 'Simple Interest', 'Calculating Simple Interest TF.'),
(28, 30, 'en', 'Simple Interest', 'Calculating Simple Interest TF.'),
(29, 31, 'en', 'Simple Interest', 'Calculating Simple Interest Video.'),
(30, 32, 'en', 'Interest rates can be tricky', 'Compounding periods have a big impact!  \r\nInterest Level 3 covers this in more detail.'),
(31, 33, 'en', 'Introduction', 'You borrow $20 and in one year we need to repay $25. What is the principal?'),
(32, 34, 'en', 'Introduction', 'What is the more common way to describe a loan?'),
(33, 35, 'en', 'Simple Interest', 'Limitations'),
(34, 106, 'en', 'This is a title', 'Is this a questions?'),
(35, 109, 'en', 'This is a title', 'Is this a questions?'),
(36, 110, 'en', 'This is a title', 'Is this a questions?'),
(37, 122, 'en', 'This is a title', 'Is this a questions?'),
(38, 123, 'en', 'Introduction', 'What is Saving?'),
(39, 125, 'en', 'Test ', 'test Q 1'),
(40, 127, 'en', 'This is a title', 'Is this a questions?'),
(41, 128, 'en', 'This is a title', 'Is this a questions?'),
(42, 138, 'en', 'This is a title', 'Is this a questions?'),
(43, 139, 'en', 'This is a title', 'Is this a questions?'),
(44, 140, 'en', 'This is a title', 'Is this a questions?'),
(45, 141, 'en', 'Introduction', 'Financial Life Cycle Needs'),
(46, 142, 'en', 'Introduction', 'Financial Life Cycle Needs Intro'),
(47, 143, 'en', 'The Story of Sophal', 'Meet the Family'),
(48, 144, 'en', 'The Story of Sophal', 'Financial Needs'),
(49, 145, 'en', 'The Story of Sophal', 'Future Planning'),
(50, 146, 'en', 'The Story of Sophal', 'Place the events in order for Sophal'),
(51, 148, 'en', 'Personal Financial Life Cycle', 'Common Stages in Life'),
(52, 149, 'en', 'Personal Financial Life Cycle', 'Identify your stage in Life'),
(53, 150, 'en', 'Personal Financial Life Cycle', 'Make your own financial life cycle plan'),
(54, 151, 'en', 'Introduction', 'What is Inflation?'),
(55, 152, 'en', 'Introduction', 'What is Inflation?'),
(56, 153, 'en', 'Introduction', 'Affects of Inflation'),
(57, 154, 'en', 'Introduction', 'When inflation is at 2% and your saving rate is 1.5% your savings are increasing in value over time.'),
(58, 155, 'en', 'Introduction', 'What situation will make you the most money.'),
(59, 156, 'en', 'Introduction', 'Inflation and Borrowing'),
(60, 157, 'en', 'Introduction', 'What is the best scenario for the borrower?'),
(61, 158, 'en', 'Introduction', 'A lender has ways of protecting them self from inflation increases. '),
(62, 159, 'en', 'Introduction', 'Inflation and Cash'),
(63, 160, 'en', 'Introduction', 'Inflation does not effect cash'),
(64, 161, 'en', 'Introduction', '$20 today will be worth $20 in 10 years'),
(65, 162, 'en', 'Introduction', 'Summary'),
(66, 163, 'en', 'Review', 'Question 1'),
(67, 164, 'en', 'Review', 'Question 2'),
(68, 165, 'en', 'Review', 'Question 3'),
(69, 166, 'en', 'Review', 'Question 4'),
(70, 167, 'en', 'Review', 'Question 5'),
(71, 168, 'en', 'Review', 'Question 6'),
(72, 169, 'en', 'Review', 'Inflation Rate'),
(73, 170, 'en', 'Debt Title', 'Debt Question'),
(74, 171, 'en', 'Introduction', 'Types of Saving'),
(75, 172, 'en', 'Introduction', 'Urgent Savings'),
(76, 173, 'en', 'Introduction', 'Short term goals'),
(77, 174, 'en', 'Introduction', 'Long term goals'),
(78, 175, 'en', 'Introduction', 'Separate the items into urgent, short term and long term saving goals'),
(79, 176, 'en', 'Introduction', 'Necessity vs Luxury Savings'),
(80, 177, 'en', 'Introduction', 'Necessity Goods'),
(81, 178, 'en', 'Introduction', 'Luxury Goods'),
(82, 179, 'en', 'Introduction', 'Separate the goods between necessity and luxury. '),
(83, 180, 'en', 'Introduction', 'Exceptions '),
(84, 181, 'en', 'Introduction', 'Why Savings'),
(85, 182, 'en', 'Introduction', 'Ways to Save'),
(86, 183, 'en', 'Ways to Save', 'Banks'),
(87, 184, 'en', 'Ways to Save', 'Saving Group'),
(88, 185, 'en', 'Ways to Save', 'Gold'),
(89, 186, 'en', 'Ways to Save', 'Investments'),
(90, 187, 'en', 'Ways to Save', 'Cash'),
(91, 188, 'en', 'Ways to Save', 'Mobile Wallet'),
(92, 189, 'en', 'Ways to Save', 'Summary'),
(93, 190, 'en', 'Liquidity', 'Liquidity Video'),
(94, 191, 'en', 'Liquidity', 'What is Liquidity'),
(95, 192, 'en', 'Liquidity ', 'Order the savings type from most liquid to least liquid '),
(96, 193, 'en', 'This is a title', 'Is this a questions?'),
(97, 194, 'en', 'This is a title', 'Is this a questions?'),
(98, 195, 'en', 'Introduction', 'Pros and Cons of Saving Types'),
(99, 197, 'en', 'Pros and Cons', 'Bank - Positives'),
(100, 198, 'en', 'Pros and Cons', 'Bank Negatives'),
(101, 199, 'en', 'Pros and Cons', 'Saving Groups Positives'),
(102, 200, 'en', 'Pros and Cons', 'Saving Groups Negatives'),
(103, 201, 'en', 'Pros and Cons', 'Gold Positives'),
(104, 202, 'en', 'Pros and Cons', 'Gold Negatives'),
(105, 203, 'en', 'Pros and Cons', 'Cash Positives'),
(106, 204, 'en', 'Pros and Cons', 'Cash Negatives'),
(107, 205, 'en', 'Recap', 'Overview'),
(108, 207, 'en', 'This is a title', 'Is this a questions?'),
(109, 208, 'en', 'This is a title', 'Is this a questions?'),
(110, 209, 'en', 'This is a title', 'Is this a questions?');

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int(10) UNSIGNED NOT NULL,
  `categoryId` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `video` varchar(256) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `categoryId`, `name`, `description`, `video`, `created_at`, `updated_at`, `image_id`) VALUES
(1, 5, 'Introduction', NULL, NULL, '2019-04-16 20:54:31', '2019-04-16 20:54:31', 1),
(2, 5, 'Simple Interest', NULL, NULL, '2019-04-16 20:56:51', '2019-04-16 20:56:51', 1),
(3, 5, 'Compound Interest', NULL, NULL, '2019-04-14 18:30:55', '2019-04-14 18:30:55', 1),
(18, 2, 'Introduction', NULL, NULL, '2019-07-11 15:21:06', '2019-07-12 20:46:01', 10),
(24, 6, 'Introduction', NULL, NULL, '2019-07-11 20:49:07', '2019-07-19 21:50:13', 1),
(27, 3, 'Intro', NULL, NULL, '2019-07-11 23:35:55', '2019-07-11 23:35:55', 1),
(28, 3, 'Sophal Intro Video', NULL, NULL, '2019-07-11 23:43:01', '2019-07-11 23:43:01', 1),
(29, 3, 'Sophal Video Break Down', NULL, NULL, '2019-07-12 16:56:39', '2019-07-12 16:56:39', 1),
(30, 3, 'Personalized Financial Life Cycle', NULL, NULL, '2019-07-12 19:18:37', '2019-07-12 19:18:37', 1),
(31, 2, 'Review', NULL, NULL, '2019-07-12 23:04:10', '2019-07-12 23:04:10', 1),
(35, 6, 'Interest Lesson Fundamental Lesson', NULL, NULL, '2019-07-19 22:09:11', '2019-07-19 22:09:11', 1),
(36, 6, 'Ways to Save', NULL, NULL, '2019-07-19 22:09:20', '2019-07-19 22:09:20', 1),
(37, 6, 'Liquidity ', NULL, NULL, '2019-07-19 22:23:01', '2019-07-19 22:23:01', 1),
(38, 6, 'Inflation Lesson', NULL, NULL, '2019-07-19 22:31:24', '2019-07-19 22:31:24', 1),
(39, 6, 'Pros and Cons', NULL, NULL, '2019-07-19 22:32:38', '2019-07-19 22:32:38', 1),
(40, 7, 'Recap', NULL, NULL, '2019-07-19 22:56:20', '2019-07-19 22:56:20', 1),
(43, 10, 'test', NULL, NULL, '2019-08-04 15:14:30', '2019-08-04 15:14:30', 1),
(44, 7, 'Ana Video', NULL, NULL, '2019-08-04 20:36:50', '2019-08-04 20:36:50', 1);

-- --------------------------------------------------------

--
-- Table structure for table `lessons_translation`
--

CREATE TABLE `lessons_translation` (
  `id` int(11) NOT NULL,
  `lessons_id` int(11) NOT NULL DEFAULT '0',
  `language_code` char(2) NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `question` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_12_000000_create_users_table', 1),
('2014_10_12_100000_create_password_resets_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `objectives_category`
--

CREATE TABLE `objectives_category` (
  `id` int(10) UNSIGNED NOT NULL,
  `categoryId` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `objectives_category`
--

INSERT INTO `objectives_category` (`id`, `categoryId`, `name`) VALUES
(1, 5, 'What Interest is'),
(2, 5, 'Simple Interest'),
(3, 5, 'Compounding Interest');

-- --------------------------------------------------------

--
-- Table structure for table `objectives_category_translation`
--

CREATE TABLE `objectives_category_translation` (
  `id` int(11) NOT NULL,
  `objectives_category_id` int(11) NOT NULL DEFAULT '0',
  `language_code` char(2) NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `objectives_category_translation`
--

INSERT INTO `objectives_category_translation` (`id`, `objectives_category_id`, `language_code`, `name`) VALUES
(1, 1, 'en', 'What Interest is'),
(2, 2, 'en', 'Simple Interest'),
(3, 3, 'en', 'Compounding Interest');

-- --------------------------------------------------------

--
-- Table structure for table `objectives_lesson`
--

CREATE TABLE `objectives_lesson` (
  `id` int(10) UNSIGNED NOT NULL,
  `lessonId` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `objectives_lesson`
--

INSERT INTO `objectives_lesson` (`id`, `lessonId`, `name`) VALUES
(5, 1, 'The basics of Interest'),
(6, 1, 'Borrowers vs Lenders'),
(7, 1, 'What the Principal is'),
(8, 1, 'What an Interest Rate is'),
(9, 2, 'Simple Interest'),
(10, 2, 'Calculating Simple Interest'),
(11, 2, 'Calculating the interest rate with Simple Interest'),
(12, 3, 'Compound Interest'),
(13, 3, 'The effect time has'),
(14, 3, 'The effect compounding periods have'),
(15, 3, 'The 4 Key Parts to Interest');

-- --------------------------------------------------------

--
-- Table structure for table `objectives_lesson_translation`
--

CREATE TABLE `objectives_lesson_translation` (
  `id` int(11) NOT NULL,
  `objectives_lesson_id` int(11) NOT NULL DEFAULT '0',
  `language_code` char(2) NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `objectives_lesson_translation`
--

INSERT INTO `objectives_lesson_translation` (`id`, `objectives_lesson_id`, `language_code`, `name`) VALUES
(1, 5, 'en', 'The basics of Interest'),
(2, 6, 'en', 'Borrowers vs Lenders'),
(3, 7, 'en', 'What the Principal is'),
(4, 8, 'en', 'What an Interest Rate is'),
(5, 9, 'en', 'Simple Interest'),
(6, 10, 'en', 'Calculating Simple Interest'),
(7, 11, 'en', 'Calculating the interest rate with Simple Interest'),
(8, 12, 'en', 'Compound Interest'),
(9, 13, 'en', 'The effect time has'),
(10, 14, 'en', 'The effect compounding periods have'),
(11, 15, 'en', 'The 4 Key Parts to Interest');

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `name`) VALUES
(1, 'Pi Pay');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions_multiplechoice`
--

CREATE TABLE `questions_multiplechoice` (
  `id` int(10) UNSIGNED NOT NULL,
  `lessonQuestionsId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions_multiplechoice`
--

INSERT INTO `questions_multiplechoice` (`id`, `lessonQuestionsId`) VALUES
(1, 2),
(2, 5),
(3, 33),
(4, 34),
(5, 122),
(6, 127),
(7, 148),
(8, 155),
(9, 157),
(10, 207);

-- --------------------------------------------------------

--
-- Table structure for table `questions_multiplechoice_options`
--

CREATE TABLE `questions_multiplechoice_options` (
  `id` int(10) UNSIGNED NOT NULL,
  `questionsMultipleChoiceId` int(10) UNSIGNED NOT NULL,
  `value` text NOT NULL,
  `answer` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions_multiplechoice_options`
--

INSERT INTO `questions_multiplechoice_options` (`id`, `questionsMultipleChoiceId`, `value`, `answer`) VALUES
(1, 1, 'Borrower', 1),
(2, 1, 'Lender', 0),
(7, 2, 'Interest = $10\r\nPrincipal = $60', 0),
(8, 2, 'Interest = $10\r\nPrincipal = $50', 1),
(9, 2, 'Interest = $50\r\nPrincipal = $10', 0),
(10, 2, 'Interest = $60\r\nPrincipal = $50', 0),
(15, 4, '$30 loan with 7% Interest', 0),
(16, 4, '$30 loan with $2.10 Interest', 1),
(21, 3, '$20', 1),
(22, 3, 'One Year', 0),
(23, 3, '$25', 0),
(24, 3, 'The Total Repayment', 0),
(25, 5, 'Option A', 0),
(26, 5, 'Option B', 1),
(27, 6, 'Option A', 1),
(28, 6, 'Option B', 0),
(29, 7, 'Young Man', 1),
(30, 7, 'Young Women', 0),
(31, 7, 'Old Man', 0),
(32, 7, 'Old Women', 0),
(33, 8, 'Inflation Rate of 1% and Saving Rate of 2%', 0),
(34, 8, 'Inflation Rate of 2% and Saving Rate of 1%', 0),
(35, 8, 'Inflation Rate of 4% and Saving Rate of 8%', 1),
(36, 8, 'Inflation Rate of 4% and Saving Rate of 4%', 0),
(37, 9, 'Inflation Rate of 1% and Interest Rate of 2%', 0),
(38, 9, 'Inflation Rate of 2% and Interest Rate of 3%', 0),
(39, 9, 'Inflation Rate of 2% and Interest Rate of 2%', 0),
(40, 9, 'Inflation Rate of 2% and Interest Rate of 1%', 1),
(41, 10, 'Option A', 1),
(42, 10, 'Option B', 0);

-- --------------------------------------------------------

--
-- Table structure for table `questions_multiplechoice_options_translation`
--

CREATE TABLE `questions_multiplechoice_options_translation` (
  `id` int(11) NOT NULL,
  `questions_multiplechoice_options_id` int(11) NOT NULL DEFAULT '0',
  `language_code` char(2) NOT NULL,
  `value` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions_multiplechoice_options_translation`
--

INSERT INTO `questions_multiplechoice_options_translation` (`id`, `questions_multiplechoice_options_id`, `language_code`, `value`) VALUES
(1, 1, 'en', 'Borrower'),
(2, 2, 'en', 'Lender'),
(3, 7, 'en', 'Interest = $10\r\nPrincipal = $60'),
(4, 8, 'en', 'Interest = $10\r\nPrincipal = $50'),
(5, 9, 'en', 'Interest = $50\r\nPrincipal = $10'),
(6, 10, 'en', 'Interest = $60\r\nPrincipal = $50'),
(7, 15, 'en', '$30 loan with 7% Interest'),
(8, 16, 'en', '$30 loan with $2.10 Interest'),
(9, 21, 'en', '$20'),
(10, 22, 'en', 'One Year'),
(11, 23, 'en', '$25'),
(12, 24, 'en', 'The Total Repayment'),
(13, 25, 'en', 'Option A'),
(14, 26, 'en', 'Option B'),
(15, 27, 'en', 'Option A'),
(16, 28, 'en', 'Option B'),
(17, 29, 'en', 'Young Man'),
(18, 30, 'en', 'Young Women'),
(19, 31, 'en', 'Old Man'),
(20, 32, 'en', 'Old Women'),
(21, 33, 'en', 'Inflation Rate of 1% and Saving Rate of 2%'),
(22, 34, 'en', 'Inflation Rate of 2% and Saving Rate of 1%'),
(23, 35, 'en', 'Inflation Rate of 4% and Saving Rate of 8%'),
(24, 36, 'en', 'Inflation Rate of 4% and Saving Rate of 4%'),
(25, 37, 'en', 'Inflation Rate of 1% and Interest Rate of 2%'),
(26, 38, 'en', 'Inflation Rate of 2% and Interest Rate of 3%'),
(27, 39, 'en', 'Inflation Rate of 2% and Interest Rate of 2%'),
(28, 40, 'en', 'Inflation Rate of 2% and Interest Rate of 1%'),
(29, 41, 'en', 'Option A'),
(30, 42, 'en', 'Option B');

-- --------------------------------------------------------

--
-- Table structure for table `questions_truefalse`
--

CREATE TABLE `questions_truefalse` (
  `id` int(10) UNSIGNED NOT NULL,
  `lessonQuestionsId` int(10) UNSIGNED NOT NULL,
  `answer` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions_truefalse`
--

INSERT INTO `questions_truefalse` (`id`, `lessonQuestionsId`, `answer`) VALUES
(1, 2, 1),
(2, 110, 0),
(3, 23, 0),
(6, 128, 1),
(7, 154, 0),
(8, 158, 1),
(9, 160, 0),
(10, 161, 0),
(12, 207, 1);

-- --------------------------------------------------------

--
-- Table structure for table `questions_word`
--

CREATE TABLE `questions_word` (
  `id` int(10) UNSIGNED NOT NULL,
  `lessonQuestionsId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions_word`
--

INSERT INTO `questions_word` (`id`, `lessonQuestionsId`) VALUES
(1, 1),
(2, 3),
(3, 6),
(4, 9),
(19, 10),
(5, 11),
(6, 12),
(7, 13),
(26, 14),
(8, 16),
(27, 17),
(10, 18),
(11, 19),
(12, 20),
(13, 21),
(21, 22),
(14, 24),
(15, 25),
(16, 26),
(17, 27),
(18, 28),
(22, 31),
(9, 35),
(45, 106),
(47, 109),
(51, 122),
(52, 123),
(54, 125),
(65, 138),
(66, 139),
(67, 140),
(68, 141),
(69, 142),
(70, 143),
(71, 144),
(72, 145),
(73, 146),
(76, 148),
(75, 149),
(77, 150),
(78, 151),
(79, 152),
(80, 153),
(81, 156),
(82, 159),
(83, 162),
(84, 163),
(85, 164),
(86, 165),
(87, 166),
(88, 167),
(89, 168),
(90, 169),
(91, 170),
(92, 171),
(93, 172),
(94, 173),
(95, 174),
(96, 175),
(97, 176),
(98, 177),
(99, 178),
(100, 179),
(101, 180),
(102, 181),
(103, 182),
(104, 183),
(105, 184),
(106, 185),
(107, 186),
(108, 187),
(109, 188),
(110, 189),
(111, 190),
(112, 191),
(113, 192),
(114, 193),
(115, 194),
(116, 195),
(118, 197),
(119, 198),
(120, 199),
(121, 200),
(122, 201),
(123, 202),
(124, 203),
(125, 204),
(126, 205),
(127, 208),
(128, 209),
(129, 210),
(130, 211),
(131, 212);

-- --------------------------------------------------------

--
-- Table structure for table `questions_word_data`
--

CREATE TABLE `questions_word_data` (
  `id` int(10) UNSIGNED NOT NULL,
  `questionsWordId` int(10) UNSIGNED NOT NULL,
  `type` enum('text','image','input','video','slider','button','gif') NOT NULL,
  `value` varchar(500) NOT NULL,
  `extra` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions_word_data`
--

INSERT INTO `questions_word_data` (`id`, `questionsWordId`, `type`, `value`, `extra`) VALUES
(11, 2, 'text', 'We borrow $100 today and in one year we need to pay back the $100 plus the interest. We\'ll say that the interest is $10.', NULL),
(12, 2, 'text', 'The $100 is called the principal.', NULL),
(13, 2, 'image', 'img_bag.png', NULL),
(14, 2, 'text', 'The one year is the time.', NULL),
(15, 2, 'image', 'img_clock.png', NULL),
(16, 2, 'text', 'The $10 is the interest', NULL),
(17, 2, 'image', 'img_sprout.png', NULL),
(27, 3, 'text', 'To find the Total Interest you need to subtract the', NULL),
(28, 3, 'image', 'img_161.png', NULL),
(29, 3, 'text', 'from the', NULL),
(30, 3, 'image', 'img_162.png', NULL),
(31, 3, 'text', 'A loan with a $50 principal and Total Amount of $65.', NULL),
(32, 3, 'text', 'Total Amount - Principal = Total interest', NULL),
(34, 3, 'image', 'img_163.png', NULL),
(35, 3, 'text', 'The total interest is $15', NULL),
(36, 4, 'text', 'Most of the time the time the interest will be represented as a percentage %.', NULL),
(37, 4, 'text', 'This is the Interest Rate.', NULL),
(38, 4, 'image', 'img_191.png', NULL),
(40, 4, 'text', 'It is more common that people will use the Interest Rate than they will the Total Interest.', NULL),
(41, 4, 'image', 'img_193.png', NULL),
(42, 4, 'image', 'img_194.png', NULL),
(43, 4, 'text', 'Even though these are the same thing, it is more common to hear the $70 loan with 5% Interest Rate.', NULL),
(44, 5, 'text', 'Simple interest is the quickest and easiest way to calculate interest.', NULL),
(45, 5, 'image', 'img_211.png', NULL),
(46, 5, 'text', 'Unfortunately, Simple Interest has limitations.', NULL),
(47, 6, 'text', 'To calculate simple interest, you only need two things.', NULL),
(48, 6, 'image', 'img_212.png', NULL),
(49, 7, 'text', 'Let\'s go over that video example', NULL),
(50, 7, 'image', 'img_171.png', NULL),
(51, 7, 'text', 'What is the Simple Interest Rate? \r\nTotal Amount - Principal = Total Interest', NULL),
(52, 7, 'image', 'img_172.png', NULL),
(53, 7, 'text', 'The $10 is the Total Interest\r\n\r\nTo find the Interest Rate, we simply divide the Total Interest by the principal', NULL),
(54, 7, 'image', 'img_173.png', NULL),
(55, 7, 'text', 'To represent the interest rate as a percentage, we multiply 0.10 by 100.\r\n\r\n0.10 x 100 = 10%\r\n\r\nThe Simple Interest Rate is 10%', NULL),
(56, 8, 'text', 'The formula to calculate the total amount with simple interest is \r\n\r\nTotal amount =\r\nprincipal x (1+interest rate)', NULL),
(57, 8, 'image', 'img_271.png', NULL),
(58, 4, 'image', 'img_192.png', NULL),
(59, 9, 'text', 'There are several limitations with simple interest, such as dealing with time, repayments, building interest and others. \r\n\r\nIn the next lesson we\'ll address this with compound interest.', NULL),
(60, 10, 'text', 'Compound interest is what most loans deal with. These are more complicated but more useful.', NULL),
(61, 10, 'image', 'img_311.png', NULL),
(62, 11, 'text', 'When we are dealing with simple interest, we are only focusing on the original principal and the interest rate.', NULL),
(63, 11, 'image', 'img_321.png', NULL),
(64, 11, 'text', 'With Compound interest, we also look at the time and compounding periods.', NULL),
(65, 11, 'image', 'img_322.png', NULL),
(66, 12, 'text', 'Let’s do a quick comparison between a Simple Interest loan and a Compound Interest loan.\r\n\r\n\r\nBoth loans have the original principal of $100 and an interest rate of 20%. The left loan is Simple Interest and the right is Compound Interest. Let’s see the difference after a couple of years.', NULL),
(67, 12, 'slider', 'Years 0 5', NULL),
(68, 13, 'text', 'The reasons why the loans grow at different rates is because compound interest builds interest on the past loans. \r\n\r\nSimple Interest', NULL),
(69, 13, 'image', 'img_341.png', NULL),
(70, 13, 'text', 'Compound Interest', NULL),
(71, 13, 'image', 'img_342.png', NULL),
(72, 13, 'text', 'Interest building on itself can have huge impacts on the Total Amount.', NULL),
(73, 14, 'text', 'The number of Compounding Periods will affect the size of Total Amount.', NULL),
(74, 14, 'image', 'img_371.png', NULL),
(75, 14, 'text', 'Compound Periods are how fast the loan builds on itself.', NULL),
(76, 14, 'image', 'placeholder.png', NULL),
(77, 14, 'text', 'Loans can have any compounding period but will normally be broken down into years, months, or weeks.', NULL),
(78, 15, 'text', 'To see the difference that periods can have on a loan, lets look at these two loans.\r\n\r\nChange their compounding periods to see how that Total Amount changes.', NULL),
(79, 15, 'image', 'img_381.png', NULL),
(80, 16, 'text', 'The 4 key parts to understand compound interest are:\r\n\r\nPrincipal: The original amount', NULL),
(81, 16, 'image', 'img_391.png', NULL),
(82, 16, 'text', 'Interest Rate: What percentage of the principal', NULL),
(83, 16, 'image', 'img_392.png', NULL),
(84, 16, 'text', 'Time: How long is the loan', NULL),
(85, 16, 'image', 'img_393.png', NULL),
(86, 16, 'text', 'Periods: How often does the interest compound', NULL),
(87, 16, 'image', 'img_394.png', NULL),
(88, 16, 'text', 'Try playing with these 4 parts and see how the loan changes', NULL),
(89, 16, 'image', 'img_395.png', NULL),
(90, 17, 'text', 'Calculating compound interest gets complicated. We’re not going to make you calculate this by yourself.\r\n\r\n\r\nIf you are interested, we will open up the compound interest robot and see the formula inside.', NULL),
(91, 17, 'image', 'img_3101.png', NULL),
(92, 17, 'text', 'Y = P(1+R)^(k/t)\r\n\r\nWhere:\r\nY = Total Amount \r\nP = Principal\r\nR = Interest Rate\r\nk = Period\r\nt = Time\r\n\r\nIf you did want to attempt your own calculations with this, try the challenge, otherwise, continue to the next part of the lesson.', NULL),
(93, 18, 'text', 'When looking at compound interest you need to pay attention to the 4 key parts.', NULL),
(94, 18, 'image', 'img_3141.png', NULL),
(95, 18, 'text', 'If any of the 4 key parts change even a little, it could have a big impact on the Total Amount.', NULL),
(96, 19, 'video', 'mp4_lesson_interest.mp4', NULL),
(98, 21, 'video', 'placeholder.mp4', NULL),
(99, 22, 'video', 'placeholder.mp4', NULL),
(110, 27, 'text', 'Total Amount =\r\nprincipal x (1+interest rate)\r\n \r\nTotal Amount =', NULL),
(111, 27, 'input', 'b=ax(1+a)', NULL),
(112, 12, 'image', 'img_3311.png', NULL),
(113, 17, 'button', 'Challenge', NULL),
(286, 1, 'text', 'Interest is the cost to borrow money', NULL),
(287, 1, 'image', 'image2.png', NULL),
(288, 1, 'text', 'You pay interest on a loan for borrowing money.', NULL),
(289, 1, 'gif', 'anim_interest_growth.gif', NULL),
(290, 1, 'text', 'With interest, there will be a borrower and a lender.', NULL),
(291, 1, 'gif', 'anim_coin_handoff.gif', NULL),
(292, 1, 'text', 'The borrower is the person who pays the interest', NULL),
(293, 1, 'gif', 'anim_interest_plant.gif', NULL),
(294, 1, 'text', 'The lender is the person getting paid for the interest.', NULL),
(300, 45, 'input', 'Enter Textaaaa', 'aaa'),
(301, 45, 'image', 'test', NULL),
(302, 47, 'text', 'Enter Text', NULL),
(303, 26, 'text', 'Total Amount - Principal = Interest', NULL),
(304, 26, 'image', 'img_251.png', NULL),
(305, 26, 'input', 'a-a=b', 'answer value (0)|answer value (1)|answer value (2)'),
(306, 26, 'text', 'Interest Rate = \r\nInterest/Principal', NULL),
(307, 26, 'input', 'b=(a/a)', 'answer value (0)|answer value (1)|answer value (2)'),
(312, 51, 'text', 'a+a=b', NULL),
(317, 54, 'text', 'Test 1', NULL),
(318, 54, 'image', 'test image 1', NULL),
(322, 65, 'input', 'a+a=b', 'answer value (0)1|answer value (1)2|answer value (2)3'),
(323, 66, 'text', 'Enter Text', NULL),
(324, 67, 'input', 'a+a=b', 'answer value (0)|answer value (1)|answer value (2)'),
(373, 73, 'text', 'FEATURE TO BE BUILT', NULL),
(374, 73, 'text', 'primary school ', NULL),
(375, 73, 'text', 'Higher education/University education ', NULL),
(376, 73, 'text', 'House Repair ', NULL),
(377, 73, 'text', 'Buy New House', NULL),
(378, 73, 'text', 'Celebrations/Festivals - they celebrate 1 big festival every year', NULL),
(379, 73, 'text', 'Start a business ', NULL),
(380, 73, 'text', 'Marriage ', NULL),
(381, 73, 'text', 'Older Years', NULL),
(382, 73, 'text', 'Death/Loss in the Family', NULL),
(424, 75, 'text', 'Completed Box', NULL),
(425, 75, 'text', 'Starting a new family / Having a baby ', NULL),
(426, 75, 'text', 'Primary schooling', NULL),
(427, 75, 'text', 'Secondary/tertiary schooling', NULL),
(428, 75, 'text', 'Generating income', NULL),
(429, 75, 'text', 'Older Years', NULL),
(430, 75, 'text', 'Other', NULL),
(431, 75, 'text', 'Finish your schooling', NULL),
(432, 76, 'text', 'Let\'s look into some common life cycle events', NULL),
(433, 76, 'image', 'Life cycle events pic', NULL),
(434, 76, 'text', 'Primary Schooling - What will be the costs to send your children to primary school. Supplies, tuition, lunches, travel. ', NULL),
(435, 76, 'image', 'Primary School Costs', NULL),
(436, 76, 'text', 'Secondary/Tertiary schooling - Sophal and Heng may need to save up for the cost of schooling', NULL),
(437, 76, 'image', 'Secondary/Tertiary Schooling Costs', NULL),
(438, 76, 'text', 'Earn more income - the couple could save up some money to use as a starting capital for a business or look for other ways how they can generate an income, let’s say they decide to take a small loan.', NULL),
(439, 76, 'image', 'Earning Income', NULL),
(440, 76, 'text', 'Repair/build a house - they may want to save a smaller amount of money for repair but they need to  have a bigger amount saved up over time for building a new house.', NULL),
(441, 76, 'image', 'House Pic', NULL),
(442, 76, 'text', 'Children Marriages - Will you need to save money for when your children get married', NULL),
(443, 76, 'image', 'Marriage Image', NULL),
(444, 76, 'text', 'Preparing for old age - perhaps they can consider a retirement or an insurance plan for this', NULL),
(445, 76, 'image', 'Old Age Image', NULL),
(455, 77, 'text', 'DRAG AND DROP TIMELINE', NULL),
(456, 77, 'text', 'Finish School', NULL),
(457, 77, 'text', 'Generate income', NULL),
(458, 77, 'text', 'Marriage', NULL),
(459, 77, 'text', 'Start a family/Have a child', NULL),
(460, 77, 'text', 'Child Primary School', NULL),
(461, 77, 'text', 'Child Secondary/Tertiary School', NULL),
(462, 77, 'text', 'Fix House/Buy House', NULL),
(463, 77, 'text', 'Children Wedding', NULL),
(464, 77, 'text', 'Festival/Celebration', NULL),
(465, 77, 'text', 'Older Years', NULL),
(466, 77, 'text', 'Death/Loss in the Family', NULL),
(467, 78, 'text', 'The Inflation rate is the amount that prices increase over time. ', NULL),
(468, 78, 'gif', 'Inflation Gif', NULL),
(469, 78, 'text', '20 years ago, a can of Coca-Cola would have cost about ____ ____. ', NULL),
(470, 78, 'image', 'Old Coke Price', NULL),
(471, 78, 'text', 'Today, that same can of Coca-Cola costs ____ ____. ', NULL),
(472, 78, 'image', 'Today Coke Price', NULL),
(474, 80, 'text', 'Inflation can affect the interest rate the you are saving or borrowing at. ', NULL),
(475, 80, 'image', 'Inflation Affects', NULL),
(476, 80, 'text', 'Saving – If the inflation rate is higher than the rate that you are saving money, you will be losing money over time.  ', NULL),
(477, 80, 'gif', 'Saving & Inflation', NULL),
(478, 80, 'text', 'This is happening because your savings are not increasing fast enough to make the increasing costs of things.', NULL),
(479, 80, 'gif', 'Saving Rate vs Inflation Rate', NULL),
(480, 80, 'text', '{Interactive piece with inflation rate on left, saving rate on right. The user can change the inflation rate and interest rate for $100 and see how much they change over time}', NULL),
(481, 81, 'text', 'Just like with saving, inflation rate can affect the amount that you borrow.', NULL),
(482, 81, 'gif', 'Inflation and Borrowing Gif', NULL),
(483, 81, 'text', 'If the inflation rate is higher than the borrowing rate, you will have to pay back less overtime.', NULL),
(484, 81, 'gif', '{Interactive piece with inflation rate on left, borrowing rate on right. The user can change the inflation rate and interest rate for $100 and see how much they change over time}', NULL),
(485, 82, 'text', 'One of the largest problems with cash is that it ‘loses its value’ over time because of inflation.', NULL),
(486, 82, 'gif', 'Cash vs Inflation', NULL),
(487, 82, 'text', 'Let’s look at the Coca-Cola example again.   20 years ago ___ ____ was enough to buy one can of Coca-Cola.  Today, that ____ ____ that you would have spent would not be enough to buy the can of Coca-Cola. ', NULL),
(488, 82, 'image', 'Coke Prices Difference Time', NULL),
(489, 82, 'text', 'Prices for goods goes up over time, but cash does not increase in value. This is why saving money in only cash will make you lose money over time. ', NULL),
(490, 82, 'gif', 'Cash vs Inflation Prices growth', NULL),
(497, 83, 'text', 'Congratulations! You have completed the introductory Inflation lesson.', NULL),
(498, 83, 'text', 'We have learned:', NULL),
(499, 83, 'text', 'What Inflation Is', NULL),
(500, 83, 'text', 'How inflation affects saving ', NULL),
(501, 83, 'text', 'How inflation affects borrowing ', NULL),
(502, 83, 'text', 'How inflation affects cash ', NULL),
(503, 83, 'gif', 'Enter Text', NULL),
(504, 84, 'text', 'Enter Text', NULL),
(505, 85, 'text', 'Enter Text', NULL),
(506, 86, 'text', 'Enter Text', NULL),
(507, 87, 'text', 'Enter Text', NULL),
(508, 88, 'text', 'Enter Text', NULL),
(509, 89, 'text', 'Enter Text', NULL),
(510, 90, 'text', 'In most places, inflation roes up over time. It is uncommon for inflation to go down. ', NULL),
(511, 90, 'gif', 'Inflation going up', NULL),
(512, 90, 'text', 'To learn what your countries inflation rate is you can use the internet browser and search for your countries inflation rate. ', NULL),
(513, 90, 'video', 'placeholder.mp4', NULL),
(535, 69, 'video', 'placeholder.mp4', NULL),
(536, 70, 'text', 'Meet Sophal. Sophal is married to Heng and they live in the village of Srey Ampor in the Province of Kampot. They have 3 children aged 7, 4, & 1 year old. ', NULL),
(537, 70, 'image', 'Family Picture', NULL),
(538, 70, 'text', 'They earn their living from farming and raising livestock. Heng also does carpentry work when he is not busy in the farm.', NULL),
(539, 70, 'image', 'income Stream Pic', NULL),
(540, 70, 'text', 'Both of them only finished primary school and it’s difficult for them to read and write. Sophal & Heng talk together about their dreams for a better future for their family. They really want their children to have better education -to graduate university, and have a better life.', NULL),
(541, 70, 'image', 'girl_writing.png', NULL),
(542, 70, 'text', 'They also hope to build a bigger, sturdier house and start a business so they could earn more money for the family. These dreams are the reason why they work hard.', NULL),
(543, 70, 'image', 'house.png', NULL),
(555, 72, 'text', 'Someday they will get old.  Sophal reflects on these different events in their lives and realizes that these things cost money. ', NULL),
(556, 72, 'image', 'woman_aging.png', NULL),
(557, 72, 'text', 'Working hard may not be enough, Sophal needs support with how she could manage their money better and make sure they use their money on things that are really important to them achieving their dreams of a great future!”', NULL),
(558, 72, 'image', 'future_planning.png', NULL),
(575, 71, 'text', 'But despite working hard, Sophal finds it challenging to make ends meet. The money they have is often just enough until the next time they earn money again.', NULL),
(576, 71, 'image', 'women_worried.png', NULL),
(577, 71, 'text', 'Let’s imagine this is Sophal, she is thinking about what’s happening in their life now...soon, all their children will be in school, they plan to purchase assets so they can earn more money, their house needs repair.', NULL),
(578, 71, 'image', 'asset_images.png', NULL),
(579, 71, 'text', 'And then there are festivals & celebrations. They also like to buy home appliances.', NULL),
(580, 71, 'image', 'luxury_image.png', NULL),
(581, 71, 'text', 'In a few years, their children will go to secondary school and then to university.', NULL),
(582, 71, 'image', 'school_images.png', NULL),
(583, 68, 'text', 'Every individual, family, and household has unique circumstances, needs, priorities, and preferences.', NULL),
(584, 68, 'image', 'lifecycle_characters.jpg', NULL),
(585, 68, 'text', 'While individuals and households can have different situations, most people follow similar life events and financial patterns during their lifetime.', NULL),
(586, 68, 'image', 'lifecycle_patterns.png', NULL),
(587, 68, 'text', 'This series of stages through which most people pass throughout their lifetime is often referred to as life cycle events.', NULL),
(588, 68, 'image', 'lifecycle_events2.png', NULL),
(589, 68, 'text', 'And at each life cycle event, there are financial needs and challenges! ', NULL),
(590, 79, 'video', 'placeholder.mp4', NULL),
(591, 91, 'text', 'Text', NULL),
(592, 52, 'text', 'Saving is the practice of accumulating valuable assets over time.', NULL),
(593, 52, 'image', 'cash, gold, house, bank', NULL),
(594, 52, 'text', 'Saving assets allows us to practice the disciplines of planning and managing our resources.', NULL),
(595, 52, 'text', 'Things like putting money I the bank, buying gold for safe keeping or having a special jar that you put cash in all count as saving.', NULL),
(596, 52, 'gif', 'Saving types', NULL),
(597, 92, 'text', 'Savings can be based on short-term goals, long-term goals and urgent matters.', NULL),
(598, 92, 'image', 'urgent, short term, long-term', NULL),
(607, 94, 'text', 'Short term goals are for smaller purchases that will take you about 6 months to save for. ', NULL),
(608, 94, 'text', 'Cook stove', NULL),
(609, 94, 'text', 'Home solar unit', NULL),
(610, 94, 'text', 'Bicycle', NULL),
(611, 95, 'text', 'Long term goals are for large purchases that require more than 6 months and might even take several years. ', NULL),
(612, 95, 'image', 'House', NULL),
(613, 95, 'image', 'Wedding', NULL),
(614, 95, 'image', 'School', NULL),
(615, 96, 'text', 'House', NULL),
(616, 96, 'text', 'Cook Stove', NULL),
(617, 96, 'text', 'New Phone', NULL),
(618, 96, 'text', 'Medicine', NULL),
(619, 96, 'text', 'Fertilizer ', NULL),
(620, 96, 'text', 'Moto', NULL),
(621, 97, 'text', 'Savings can also be based on necessity goods and luxury goods', NULL),
(622, 97, 'image', 'necessity and luxury', NULL),
(623, 98, 'text', 'These are basic things you need to live.', NULL),
(624, 98, 'image', 'Food', NULL),
(625, 98, 'text', 'Housing', NULL),
(626, 98, 'text', 'Transportation', NULL),
(627, 98, 'text', 'Schooling', NULL),
(628, 98, 'text', 'Others', NULL),
(629, 99, 'text', 'These are for the nice things in life. The things you don’t need but want', NULL),
(630, 99, 'text', 'New dress', NULL),
(631, 99, 'text', 'New phone', NULL),
(632, 99, 'text', 'Going out for dinner', NULL),
(633, 99, 'text', 'Holidays', NULL),
(634, 100, 'text', 'Food', NULL),
(635, 100, 'text', 'Ice Cream', NULL),
(636, 100, 'text', 'School', NULL),
(637, 100, 'text', 'Alcohol', NULL),
(638, 100, 'text', 'Air Con', NULL),
(639, 100, 'text', 'Business Inputs', NULL),
(640, 101, 'text', 'Different people will have different necessities.', NULL),
(641, 101, 'text', 'A moto is a necessity good for a driver but it might be a luxury good for a shop owner. ', NULL),
(642, 101, 'image', 'Moto Driver, Shop Owner', NULL),
(643, 101, 'text', 'Deciding between necessity and luxury goods changes for different people. ', NULL),
(644, 102, 'text', 'Saving allows you to prepare financially for your different goals and protect you from unexpected expenses.', NULL),
(645, 102, 'text', 'Whether it is a short term or a long-term goal', NULL),
(646, 102, 'image', 'Short Term - Long Term', NULL),
(647, 102, 'text', 'Or if something unexpected comes up', NULL),
(648, 102, 'image', 'Urgent', NULL),
(649, 102, 'text', 'Your savings will help you manage this', NULL),
(650, 102, 'gif', 'Saving gif with time and Emergency', NULL),
(651, 102, 'text', 'In this lesson we’ll learn how savings all work, what your options are and how to create a saving plan. ', NULL),
(652, 103, 'text', 'There are lots of different ways that you can save. Here are some of the most common ways', NULL),
(653, 103, 'text', 'Bank', NULL),
(654, 103, 'image', 'Bank', NULL),
(655, 103, 'text', 'Saving Group', NULL),
(656, 103, 'image', 'Saving Group', NULL),
(657, 103, 'text', 'Gold', NULL),
(658, 103, 'image', 'Gold', NULL),
(659, 103, 'text', 'Investments', NULL),
(660, 103, 'image', 'Investments', NULL),
(661, 103, 'text', 'Cash', NULL),
(662, 103, 'image', 'Cash', NULL),
(663, 103, 'text', 'Mobile Wallets', NULL),
(664, 103, 'image', 'Mobile Wallets', NULL),
(665, 104, 'text', 'At banks you can put your money into savings accounts. These accounts help you build money, often offering interest for keeping your money. ', NULL),
(666, 104, 'gif', 'Compound Interest Gif', NULL),
(667, 105, 'text', 'Savings groups can be helpful for encourage saving with friends and family. ', NULL),
(668, 105, 'text', 'The most common way these are done is that everyone puts money into the group each month. Then the members take turn borrowing from the group. That person will take the larger sum and will then need to repay the group. The next month a different person will take a loan from the group, with the others contributing to the group.', NULL),
(669, 105, 'video', 'Saving Group Video', NULL),
(670, 106, 'text', 'You can buy gold or other valuable materials, like silver, jewelry, and others. These tend to hold their value overtime. ', NULL),
(671, 106, 'image', 'Gold, Jewelry, other goods ', NULL),
(672, 106, 'text', 'For emergencies gold is not always the best option, since you might not get a good price if you’re forced to sell it fast. ', NULL),
(673, 106, 'text', 'This is called ‘Liquidity’', NULL),
(674, 106, 'gif', 'Liquidity Gif', NULL),
(675, 106, 'text', 'We\'ll cover liquidity latter in the lesson', NULL),
(676, 107, 'text', 'You can invest your money with the hope of achieving a greater return later. ', NULL),
(677, 107, 'gif', 'Investment Gif', NULL),
(678, 107, 'text', 'Some investment examples are stocks, bonds, property, or other goods.', NULL),
(679, 107, 'image', 'stocks, bonds, property, or other goods.', NULL),
(680, 107, 'text', 'We’ll cover more on investments in the \'Investment\' lesson category', NULL),
(681, 108, 'text', 'You cab also save money by holding cash, placing it in a safe spot and not holding it. ', NULL),
(682, 108, 'image', 'Cash', NULL),
(683, 108, 'text', 'Cash has a big problem with inflation, but we’ll learn about that in the next lesson if you haven’t already. ', NULL),
(684, 109, 'text', 'Mobile wallets let you safely store money on your phone.', NULL),
(685, 109, 'gif', 'Mobile Wallet', NULL),
(686, 109, 'text', 'We’ll go over this in more detail in the Mobile Wallet lesson category. ', NULL),
(687, 110, 'text', 'There are 6 common ways to save money.', NULL),
(688, 110, 'image', 'Icons for the 6 saving types', NULL),
(689, 110, 'text', 'We’re going to dive deeper into  -	Bank -	Saving Group -	Gold -	Cash  For the rest of this lesson', NULL),
(690, 110, 'image', 'Images with words', NULL),
(691, 110, 'text', 'Mobile Wallets and Investments will be given their own lesson categories where you can learn about them.', NULL),
(692, 110, 'image', 'Images with words', NULL),
(693, 111, 'video', 'Enter Text', NULL),
(696, 112, 'text', 'Liquidity just means has fast you can change something into cash to buy things. ', NULL),
(697, 112, 'gif', 'Liquidity gif', NULL),
(698, 112, 'text', 'Something like a house has very low liquidity since it takes a long time to sell. ', NULL),
(699, 112, 'gif', 'House Liquidity gif', NULL),
(700, 112, 'text', 'Money in a bank saving account will have high liquidity because it is convert that into cash.', NULL),
(701, 112, 'text', 'Bank Liquidity gif', NULL),
(702, 113, 'text', 'Saving Account', NULL),
(703, 113, 'text', 'Moto', NULL),
(704, 113, 'text', 'Gold', NULL),
(705, 113, 'text', 'Cash', NULL),
(706, 113, 'text', 'House', NULL),
(707, 114, 'text', 'This is actually a link to the Interest lesson category ', NULL),
(708, 115, 'text', 'This is actually a link to the inflation lesson', NULL),
(709, 116, 'text', 'Lets look at the benefits of using these different saving options', NULL),
(710, 116, 'image', 'Saving types icons', NULL),
(713, 118, 'text', 'Positives', NULL),
(714, 118, 'text', 'Provide security where your money is safe and cannot be stolen from you. ', NULL),
(715, 118, 'image', 'Security', NULL),
(716, 118, 'text', 'Offer a variety of saving plans and account, that come with different saving interest rates.', NULL),
(717, 118, 'image', 'Variety ', NULL),
(718, 118, 'text', 'Provides varying degree of liquidity depending on what you want.', NULL),
(719, 118, 'gif', 'Liquidity gif', NULL),
(720, 118, 'text', 'Formal financial histories which help can help you buy a house, get approved for a loan', NULL),
(721, 118, 'image', 'Financial History', NULL),
(722, 119, 'text', 'There might be fees and minimum requirements that you need to hold. ', NULL),
(723, 119, 'image', 'Minimum requirements', NULL),
(724, 119, 'text', 'It is very important to read and understand the terms. Sometimes they can be confusing.', NULL),
(725, 119, 'image', 'Terms ', NULL),
(726, 120, 'text', 'Community effort that builds friendships', NULL),
(727, 120, 'image', 'Community', NULL),
(728, 120, 'text', 'Extra motivation to save', NULL),
(729, 120, 'gif', 'Motivation', NULL),
(730, 120, 'text', 'Some help build financial histories', NULL),
(731, 120, 'image', 'Financial history', NULL),
(732, 121, 'text', 'Are more informal and might not count towards financial history', NULL),
(733, 121, 'image', 'No Financial history', NULL),
(734, 121, 'text', 'May have fees', NULL),
(735, 121, 'image', 'Fees', NULL),
(736, 121, 'text', 'Limited access to additional capital', NULL),
(737, 121, 'image', 'Limited capital', NULL),
(738, 121, 'text', 'Less safeguards put in place in case of defaults', NULL),
(739, 121, 'image', 'Safety Image', NULL),
(740, 122, 'text', 'Tend to hold their value over time', NULL),
(741, 122, 'gif', 'Value over time', NULL),
(742, 122, 'text', 'Ok liquidity', NULL),
(743, 122, 'gif', 'Liquidity gif', NULL),
(744, 123, 'text', 'Does not guarantee returns over time ', NULL),
(745, 123, 'gif', 'Value over time', NULL),
(746, 123, 'text', 'Can be stolen', NULL),
(747, 123, 'gif', 'Stolen', NULL),
(748, 124, 'text', 'Very accessible when needed', NULL),
(749, 124, 'gif', 'Liquidity fast ', NULL),
(750, 124, 'text', 'Most places will accept it', NULL),
(751, 124, 'gif', 'Transfer cash', NULL),
(752, 125, 'text', 'You do not collect any interest', NULL),
(753, 125, 'gif', 'Interest No', NULL),
(754, 125, 'text', 'You lose value over time because of inflation ', NULL),
(755, 125, 'gif', 'Inflation down', NULL),
(756, 125, 'text', 'Can be stolen', NULL),
(757, 125, 'gif', 'Stolen', NULL),
(767, 126, 'text', 'In level one we looked at the different ways that you can save', NULL),
(768, 126, 'text', 'Bank', NULL),
(769, 126, 'text', 'Saving Group', NULL),
(770, 126, 'text', 'Gold', NULL),
(771, 126, 'text', 'Investment', NULL),
(772, 126, 'text', 'Cash', NULL),
(773, 126, 'text', 'Mobile Wallet', NULL),
(774, 126, 'text', 'We also looked at the different timelines of savings', NULL),
(775, 126, 'text', 'Urgent', NULL),
(776, 126, 'text', 'Short Term', NULL),
(777, 126, 'text', 'Long Term', NULL),
(778, 126, 'text', 'In this level we will be looking at strategies to help you what the different types of savings are. ', NULL),
(779, 126, 'gif', ' {strategies gif}', NULL),
(780, 93, 'text', '-	Having savings for urgent maters are for emergencies that come up. ', NULL),
(781, 93, 'image', 'Health Problems', NULL),
(782, 93, 'image', 'Broken roof', NULL),
(783, 93, 'image', 'Broken phone', NULL),
(785, 127, 'input', 'a=b', '1|1|answer value (2)'),
(786, 127, 'text', 'test', NULL),
(787, 127, 'input', 'a', '1'),
(788, 128, 'input', 'a=b', '1|1|answer value (2)'),
(789, 129, 'text', 'Enter Text', NULL),
(794, 130, 'image', 'lesson-savings/bank.svg', NULL),
(795, 131, 'video', 'Ana Video', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `questions_word_data_translation`
--

CREATE TABLE `questions_word_data_translation` (
  `id` int(11) NOT NULL,
  `questions_word_data_id` int(11) NOT NULL DEFAULT '0',
  `language_code` char(2) NOT NULL,
  `value` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `extra` text CHARACTER SET utf8 COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions_word_data_translation`
--

INSERT INTO `questions_word_data_translation` (`id`, `questions_word_data_id`, `language_code`, `value`, `extra`) VALUES
(1, 11, 'en', 'We borrow $100 today and in one year we need to pay back the $100 plus the interest. We\'ll say that the interest is $10.', NULL),
(2, 12, 'en', 'The $100 is called the principal.', NULL),
(3, 14, 'en', 'The one year is the time.', NULL),
(4, 16, 'en', 'The $10 is the interest', NULL),
(5, 27, 'en', 'To find the Total Interest you need to subtract the', NULL),
(6, 29, 'en', 'from the', NULL),
(7, 31, 'en', 'A loan with a $50 principal and Total Amount of $65.', NULL),
(8, 32, 'en', 'Total Amount - Principal = Total interest', NULL),
(9, 35, 'en', 'The total interest is $15', NULL),
(10, 36, 'en', 'Most of the time the time the interest will be represented as a percentage %.', NULL),
(11, 37, 'en', 'This is the Interest Rate.', NULL),
(12, 40, 'en', 'It is more common that people will use the Interest Rate than they will the Total Interest.', NULL),
(13, 43, 'en', 'Even though these are the same thing, it is more common to hear the $70 loan with 5% Interest Rate.', NULL),
(14, 44, 'en', 'Simple interest is the quickest and easiest way to calculate interest.', NULL),
(15, 46, 'en', 'Unfortunately, Simple Interest has limitations.', NULL),
(16, 47, 'en', 'To calculate simple interest, you only need two things.', NULL),
(17, 49, 'en', 'Let\'s go over that video example', NULL),
(18, 51, 'en', 'What is the Simple Interest Rate? \r\nTotal Amount - Principal = Total Interest', NULL),
(19, 53, 'en', 'The $10 is the Total Interest\r\n\r\nTo find the Interest Rate, we simply divide the Total Interest by the principal', NULL),
(20, 55, 'en', 'To represent the interest rate as a percentage, we multiply 0.10 by 100.\r\n\r\n0.10 x 100 = 10%\r\n\r\nThe Simple Interest Rate is 10%', NULL),
(21, 56, 'en', 'The formula to calculate the total amount with simple interest is \r\n\r\nTotal amount =\r\nprincipal x (1+interest rate)', NULL),
(22, 59, 'en', 'There are several limitations with simple interest, such as dealing with time, repayments, building interest and others. \r\n\r\nIn the next lesson we\'ll address this with compound interest.', NULL),
(23, 60, 'en', 'Compound interest is what most loans deal with. These are more complicated but more useful.', NULL),
(24, 62, 'en', 'When we are dealing with simple interest, we are only focusing on the original principal and the interest rate.', NULL),
(25, 64, 'en', 'With Compound interest, we also look at the time and compounding periods.', NULL),
(26, 66, 'en', 'Let’s do a quick comparison between a Simple Interest loan and a Compound Interest loan.\r\n\r\n\r\nBoth loans have the original principal of $100 and an interest rate of 20%. The left loan is Simple Interest and the right is Compound Interest. Let’s see the difference after a couple of years.', NULL),
(27, 68, 'en', 'The reasons why the loans grow at different rates is because compound interest builds interest on the past loans. \r\n\r\nSimple Interest', NULL),
(28, 70, 'en', 'Compound Interest', NULL),
(29, 72, 'en', 'Interest building on itself can have huge impacts on the Total Amount.', NULL),
(30, 73, 'en', 'The number of Compounding Periods will affect the size of Total Amount.', NULL),
(31, 75, 'en', 'Compound Periods are how fast the loan builds on itself.', NULL),
(32, 77, 'en', 'Loans can have any compounding period but will normally be broken down into years, months, or weeks.', NULL),
(33, 78, 'en', 'To see the difference that periods can have on a loan, lets look at these two loans.\r\n\r\nChange their compounding periods to see how that Total Amount changes.', NULL),
(34, 80, 'en', 'The 4 key parts to understand compound interest are:\r\n\r\nPrincipal: The original amount', NULL),
(35, 82, 'en', 'Interest Rate: What percentage of the principal', NULL),
(36, 84, 'en', 'Time: How long is the loan', NULL),
(37, 86, 'en', 'Periods: How often does the interest compound', NULL),
(38, 88, 'en', 'Try playing with these 4 parts and see how the loan changes', NULL),
(39, 90, 'en', 'Calculating compound interest gets complicated. We’re not going to make you calculate this by yourself.\r\n\r\n\r\nIf you are interested, we will open up the compound interest robot and see the formula inside.', NULL),
(40, 92, 'en', 'Y = P(1+R)^(k/t)\r\n\r\nWhere:\r\nY = Total Amount \r\nP = Principal\r\nR = Interest Rate\r\nk = Period\r\nt = Time\r\n\r\nIf you did want to attempt your own calculations with this, try the challenge, otherwise, continue to the next part of the lesson.', NULL),
(41, 93, 'en', 'When looking at compound interest you need to pay attention to the 4 key parts.', NULL),
(42, 95, 'en', 'If any of the 4 key parts change even a little, it could have a big impact on the Total Amount.', NULL),
(43, 110, 'en', 'Total Amount =\r\nprincipal x (1+interest rate)\r\n \r\nTotal Amount =', NULL),
(44, 111, 'en', 'b=ax(1+a)', NULL),
(45, 286, 'en', 'Interest is the cost to borrow money', NULL),
(46, 288, 'en', 'You pay interest on a loan for borrowing money.', NULL),
(47, 290, 'en', 'With interest, there will be a borrower and a lender.', NULL),
(48, 292, 'en', 'The borrower is the person who pays the interest', NULL),
(49, 294, 'en', 'The lender is the person getting paid for the interest.', NULL),
(50, 300, 'en', 'Enter Textaaaa', 'aaa'),
(51, 302, 'en', 'Enter Text', NULL),
(52, 303, 'en', 'Total Amount - Principal = Interest', NULL),
(53, 305, 'en', 'a-a=b', 'answer value (0)|answer value (1)|answer value (2)'),
(54, 306, 'en', 'Interest Rate = \r\nInterest/Principal', NULL),
(55, 307, 'en', 'b=(a/a)', 'answer value (0)|answer value (1)|answer value (2)'),
(56, 312, 'en', 'a+a=b', NULL),
(57, 317, 'en', 'Test 1', NULL),
(58, 322, 'en', 'a+a=b', 'answer value (0)1|answer value (1)2|answer value (2)3'),
(59, 323, 'en', 'Enter Text', NULL),
(60, 324, 'en', 'a+a=b', 'answer value (0)|answer value (1)|answer value (2)'),
(61, 373, 'en', 'FEATURE TO BE BUILT', NULL),
(62, 374, 'en', 'primary school ', NULL),
(63, 375, 'en', 'Higher education/University education ', NULL),
(64, 376, 'en', 'House Repair ', NULL),
(65, 377, 'en', 'Buy New House', NULL),
(66, 378, 'en', 'Celebrations/Festivals - they celebrate 1 big festival every year', NULL),
(67, 379, 'en', 'Start a business ', NULL),
(68, 380, 'en', 'Marriage ', NULL),
(69, 381, 'en', 'Older Years', NULL),
(70, 382, 'en', 'Death/Loss in the Family', NULL),
(71, 424, 'en', 'Completed Box', NULL),
(72, 425, 'en', 'Starting a new family / Having a baby ', NULL),
(73, 426, 'en', 'Primary schooling', NULL),
(74, 427, 'en', 'Secondary/tertiary schooling', NULL),
(75, 428, 'en', 'Generating income', NULL),
(76, 429, 'en', 'Older Years', NULL),
(77, 430, 'en', 'Other', NULL),
(78, 431, 'en', 'Finish your schooling', NULL),
(79, 432, 'en', 'Let\'s look into some common life cycle events', NULL),
(80, 434, 'en', 'Primary Schooling - What will be the costs to send your children to primary school. Supplies, tuition, lunches, travel. ', NULL),
(81, 436, 'en', 'Secondary/Tertiary schooling - Sophal and Heng may need to save up for the cost of schooling', NULL),
(82, 438, 'en', 'Earn more income - the couple could save up some money to use as a starting capital for a business or look for other ways how they can generate an income, let’s say they decide to take a small loan.', NULL),
(83, 440, 'en', 'Repair/build a house - they may want to save a smaller amount of money for repair but they need to  have a bigger amount saved up over time for building a new house.', NULL),
(84, 442, 'en', 'Children Marriages - Will you need to save money for when your children get married', NULL),
(85, 444, 'en', 'Preparing for old age - perhaps they can consider a retirement or an insurance plan for this', NULL),
(86, 455, 'en', 'DRAG AND DROP TIMELINE', NULL),
(87, 456, 'en', 'Finish School', NULL),
(88, 457, 'en', 'Generate income', NULL),
(89, 458, 'en', 'Marriage', NULL),
(90, 459, 'en', 'Start a family/Have a child', NULL),
(91, 460, 'en', 'Child Primary School', NULL),
(92, 461, 'en', 'Child Secondary/Tertiary School', NULL),
(93, 462, 'en', 'Fix House/Buy House', NULL),
(94, 463, 'en', 'Children Wedding', NULL),
(95, 464, 'en', 'Festival/Celebration', NULL),
(96, 465, 'en', 'Older Years', NULL),
(97, 466, 'en', 'Death/Loss in the Family', NULL),
(98, 467, 'en', 'The Inflation rate is the amount that prices increase over time. ', NULL),
(99, 469, 'en', '20 years ago, a can of Coca-Cola would have cost about ____ ____. ', NULL),
(100, 471, 'en', 'Today, that same can of Coca-Cola costs ____ ____. ', NULL),
(101, 474, 'en', 'Inflation can affect the interest rate the you are saving or borrowing at. ', NULL),
(102, 476, 'en', 'Saving – If the inflation rate is higher than the rate that you are saving money, you will be losing money over time.  ', NULL),
(103, 478, 'en', 'This is happening because your savings are not increasing fast enough to make the increasing costs of things.', NULL),
(104, 480, 'en', '{Interactive piece with inflation rate on left, saving rate on right. The user can change the inflation rate and interest rate for $100 and see how much they change over time}', NULL),
(105, 481, 'en', 'Just like with saving, inflation rate can affect the amount that you borrow.', NULL),
(106, 483, 'en', 'If the inflation rate is higher than the borrowing rate, you will have to pay back less overtime.', NULL),
(107, 485, 'en', 'One of the largest problems with cash is that it ‘loses its value’ over time because of inflation.', NULL),
(108, 487, 'en', 'Let’s look at the Coca-Cola example again.   20 years ago ___ ____ was enough to buy one can of Coca-Cola.  Today, that ____ ____ that you would have spent would not be enough to buy the can of Coca-Cola. ', NULL),
(109, 489, 'en', 'Prices for goods goes up over time, but cash does not increase in value. This is why saving money in only cash will make you lose money over time. ', NULL),
(110, 497, 'en', 'Congratulations! You have completed the introductory Inflation lesson.', NULL),
(111, 498, 'en', 'We have learned:', NULL),
(112, 499, 'en', 'What Inflation Is', NULL),
(113, 500, 'en', 'How inflation affects saving ', NULL),
(114, 501, 'en', 'How inflation affects borrowing ', NULL),
(115, 502, 'en', 'How inflation affects cash ', NULL),
(116, 504, 'en', 'Enter Text', NULL),
(117, 505, 'en', 'Enter Text', NULL),
(118, 506, 'en', 'Enter Text', NULL),
(119, 507, 'en', 'Enter Text', NULL),
(120, 508, 'en', 'Enter Text', NULL),
(121, 509, 'en', 'Enter Text', NULL),
(122, 510, 'en', 'In most places, inflation roes up over time. It is uncommon for inflation to go down. ', NULL),
(123, 512, 'en', 'To learn what your countries inflation rate is you can use the internet browser and search for your countries inflation rate. ', NULL),
(124, 536, 'en', 'Meet Sophal. Sophal is married to Heng and they live in the village of Srey Ampor in the Province of Kampot. They have 3 children aged 7, 4, & 1 year old. ', NULL),
(125, 538, 'en', 'They earn their living from farming and raising livestock. Heng also does carpentry work when he is not busy in the farm.', NULL),
(126, 540, 'en', 'Both of them only finished primary school and it’s difficult for them to read and write. Sophal & Heng talk together about their dreams for a better future for their family. They really want their children to have better education -to graduate university, and have a better life.', NULL),
(127, 542, 'en', 'They also hope to build a bigger, sturdier house and start a business so they could earn more money for the family. These dreams are the reason why they work hard.', NULL),
(128, 555, 'en', 'Someday they will get old.  Sophal reflects on these different events in their lives and realizes that these things cost money. ', NULL),
(129, 557, 'en', 'Working hard may not be enough, Sophal needs support with how she could manage their money better and make sure they use their money on things that are really important to them achieving their dreams of a great future!”', NULL),
(130, 575, 'en', 'But despite working hard, Sophal finds it challenging to make ends meet. The money they have is often just enough until the next time they earn money again.', NULL),
(131, 577, 'en', 'Let’s imagine this is Sophal, she is thinking about what’s happening in their life now...soon, all their children will be in school, they plan to purchase assets so they can earn more money, their house needs repair.', NULL),
(132, 579, 'en', 'And then there are festivals & celebrations. They also like to buy home appliances.', NULL),
(133, 581, 'en', 'In a few years, their children will go to secondary school and then to university.', NULL),
(134, 583, 'en', 'Every individual, family, and household has unique circumstances, needs, priorities, and preferences.', NULL),
(135, 585, 'en', 'While individuals and households can have different situations, most people follow similar life events and financial patterns during their lifetime.', NULL),
(136, 587, 'en', 'This series of stages through which most people pass throughout their lifetime is often referred to as life cycle events.', NULL),
(137, 589, 'en', 'And at each life cycle event, there are financial needs and challenges! ', NULL),
(138, 591, 'en', 'Text', NULL),
(139, 592, 'en', 'Saving is the practice of accumulating valuable assets over time.', NULL),
(140, 594, 'en', 'Saving assets allows us to practice the disciplines of planning and managing our resources.', NULL),
(141, 595, 'en', 'Things like putting money I the bank, buying gold for safe keeping or having a special jar that you put cash in all count as saving.', NULL),
(142, 597, 'en', 'Savings can be based on short-term goals, long-term goals and urgent matters.', NULL),
(143, 607, 'en', 'Short term goals are for smaller purchases that will take you about 6 months to save for. ', NULL),
(144, 608, 'en', 'Cook stove', NULL),
(145, 609, 'en', 'Home solar unit', NULL),
(146, 610, 'en', 'Bicycle', NULL),
(147, 611, 'en', 'Long term goals are for large purchases that require more than 6 months and might even take several years. ', NULL),
(148, 615, 'en', 'House', NULL),
(149, 616, 'en', 'Cook Stove', NULL),
(150, 617, 'en', 'New Phone', NULL),
(151, 618, 'en', 'Medicine', NULL),
(152, 619, 'en', 'Fertilizer ', NULL),
(153, 620, 'en', 'Moto', NULL),
(154, 621, 'en', 'Savings can also be based on necessity goods and luxury goods', NULL),
(155, 623, 'en', 'These are basic things you need to live.', NULL),
(156, 625, 'en', 'Housing', NULL),
(157, 626, 'en', 'Transportation', NULL),
(158, 627, 'en', 'Schooling', NULL),
(159, 628, 'en', 'Others', NULL),
(160, 629, 'en', 'These are for the nice things in life. The things you don’t need but want', NULL),
(161, 630, 'en', 'New dress', NULL),
(162, 631, 'en', 'New phone', NULL),
(163, 632, 'en', 'Going out for dinner', NULL),
(164, 633, 'en', 'Holidays', NULL),
(165, 634, 'en', 'Food', NULL),
(166, 635, 'en', 'Ice Cream', NULL),
(167, 636, 'en', 'School', NULL),
(168, 637, 'en', 'Alcohol', NULL),
(169, 638, 'en', 'Air Con', NULL),
(170, 639, 'en', 'Business Inputs', NULL),
(171, 640, 'en', 'Different people will have different necessities.', NULL),
(172, 641, 'en', 'A moto is a necessity good for a driver but it might be a luxury good for a shop owner. ', NULL),
(173, 643, 'en', 'Deciding between necessity and luxury goods changes for different people. ', NULL),
(174, 644, 'en', 'Saving allows you to prepare financially for your different goals and protect you from unexpected expenses.', NULL),
(175, 645, 'en', 'Whether it is a short term or a long-term goal', NULL),
(176, 647, 'en', 'Or if something unexpected comes up', NULL),
(177, 649, 'en', 'Your savings will help you manage this', NULL),
(178, 651, 'en', 'In this lesson we’ll learn how savings all work, what your options are and how to create a saving plan. ', NULL),
(179, 652, 'en', 'There are lots of different ways that you can save. Here are some of the most common ways', NULL),
(180, 653, 'en', 'Bank', NULL),
(181, 655, 'en', 'Saving Group', NULL),
(182, 657, 'en', 'Gold', NULL),
(183, 659, 'en', 'Investments', NULL),
(184, 661, 'en', 'Cash', NULL),
(185, 663, 'en', 'Mobile Wallets', NULL),
(186, 665, 'en', 'At banks you can put your money into savings accounts. These accounts help you build money, often offering interest for keeping your money. ', NULL),
(187, 667, 'en', 'Savings groups can be helpful for encourage saving with friends and family. ', NULL),
(188, 668, 'en', 'The most common way these are done is that everyone puts money into the group each month. Then the members take turn borrowing from the group. That person will take the larger sum and will then need to repay the group. The next month a different person will take a loan from the group, with the others contributing to the group.', NULL),
(189, 670, 'en', 'You can buy gold or other valuable materials, like silver, jewelry, and others. These tend to hold their value overtime. ', NULL),
(190, 672, 'en', 'For emergencies gold is not always the best option, since you might not get a good price if you’re forced to sell it fast. ', NULL),
(191, 673, 'en', 'This is called ‘Liquidity’', NULL),
(192, 675, 'en', 'We\'ll cover liquidity latter in the lesson', NULL),
(193, 676, 'en', 'You can invest your money with the hope of achieving a greater return later. ', NULL),
(194, 678, 'en', 'Some investment examples are stocks, bonds, property, or other goods.', NULL),
(195, 680, 'en', 'We’ll cover more on investments in the \'Investment\' lesson category', NULL),
(196, 681, 'en', 'You cab also save money by holding cash, placing it in a safe spot and not holding it. ', NULL),
(197, 683, 'en', 'Cash has a big problem with inflation, but we’ll learn about that in the next lesson if you haven’t already. ', NULL),
(198, 684, 'en', 'Mobile wallets let you safely store money on your phone.', NULL),
(199, 686, 'en', 'We’ll go over this in more detail in the Mobile Wallet lesson category. ', NULL),
(200, 687, 'en', 'There are 6 common ways to save money.', NULL),
(201, 689, 'en', 'We’re going to dive deeper into  -	Bank -	Saving Group -	Gold -	Cash  For the rest of this lesson', NULL),
(202, 691, 'en', 'Mobile Wallets and Investments will be given their own lesson categories where you can learn about them.', NULL),
(203, 696, 'en', 'Liquidity just means has fast you can change something into cash to buy things. ', NULL),
(204, 698, 'en', 'Something like a house has very low liquidity since it takes a long time to sell. ', NULL),
(205, 700, 'en', 'Money in a bank saving account will have high liquidity because it is convert that into cash.', NULL),
(206, 701, 'en', 'Bank Liquidity gif', NULL),
(207, 702, 'en', 'Saving Account', NULL),
(208, 703, 'en', 'Moto', NULL),
(209, 704, 'en', 'Gold', NULL),
(210, 705, 'en', 'Cash', NULL),
(211, 706, 'en', 'House', NULL),
(212, 707, 'en', 'This is actually a link to the Interest lesson category ', NULL),
(213, 708, 'en', 'This is actually a link to the inflation lesson', NULL),
(214, 709, 'en', 'Lets look at the benefits of using these different saving options', NULL),
(215, 713, 'en', 'Positives', NULL),
(216, 714, 'en', 'Provide security where your money is safe and cannot be stolen from you. ', NULL),
(217, 716, 'en', 'Offer a variety of saving plans and account, that come with different saving interest rates.', NULL),
(218, 718, 'en', 'Provides varying degree of liquidity depending on what you want.', NULL),
(219, 720, 'en', 'Formal financial histories which help can help you buy a house, get approved for a loan', NULL),
(220, 722, 'en', 'There might be fees and minimum requirements that you need to hold. ', NULL),
(221, 724, 'en', 'It is very important to read and understand the terms. Sometimes they can be confusing.', NULL),
(222, 726, 'en', 'Community effort that builds friendships', NULL),
(223, 728, 'en', 'Extra motivation to save', NULL),
(224, 730, 'en', 'Some help build financial histories', NULL),
(225, 732, 'en', 'Are more informal and might not count towards financial history', NULL),
(226, 734, 'en', 'May have fees', NULL),
(227, 736, 'en', 'Limited access to additional capital', NULL),
(228, 738, 'en', 'Less safeguards put in place in case of defaults', NULL),
(229, 740, 'en', 'Tend to hold their value over time', NULL),
(230, 742, 'en', 'Ok liquidity', NULL),
(231, 744, 'en', 'Does not guarantee returns over time ', NULL),
(232, 746, 'en', 'Can be stolen', NULL),
(233, 748, 'en', 'Very accessible when needed', NULL),
(234, 750, 'en', 'Most places will accept it', NULL),
(235, 752, 'en', 'You do not collect any interest', NULL),
(236, 754, 'en', 'You lose value over time because of inflation ', NULL),
(237, 756, 'en', 'Can be stolen', NULL),
(238, 767, 'en', 'In level one we looked at the different ways that you can save', NULL),
(239, 768, 'en', 'Bank', NULL),
(240, 769, 'en', 'Saving Group', NULL),
(241, 770, 'en', 'Gold', NULL),
(242, 771, 'en', 'Investment', NULL),
(243, 772, 'en', 'Cash', NULL),
(244, 773, 'en', 'Mobile Wallet', NULL),
(245, 774, 'en', 'We also looked at the different timelines of savings', NULL),
(246, 775, 'en', 'Urgent', NULL),
(247, 776, 'en', 'Short Term', NULL),
(248, 777, 'en', 'Long Term', NULL),
(249, 778, 'en', 'In this level we will be looking at strategies to help you what the different types of savings are. ', NULL),
(250, 780, 'en', '-	Having savings for urgent maters are for emergencies that come up. ', NULL),
(251, 785, 'en', 'a=b', '1|1|answer value (2)'),
(252, 786, 'en', 'test', NULL),
(253, 787, 'en', 'a', '1'),
(254, 788, 'en', 'a=b', '1|1|answer value (2)');

-- --------------------------------------------------------

--
-- Table structure for table `serviceprovidercategories`
--

CREATE TABLE `serviceprovidercategories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `color` varchar(7) NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `serviceprovidercategories`
--

INSERT INTO `serviceprovidercategories` (`id`, `name`, `color`, `updated_at`, `created_at`) VALUES
(1, 'Mobile Wallet', '#0071BC', '2019-04-14 17:56:57', '2019-04-14 17:56:57');

-- --------------------------------------------------------

--
-- Table structure for table `serviceproviders`
--

CREATE TABLE `serviceproviders` (
  `id` int(10) UNSIGNED NOT NULL,
  `organizationId` int(10) UNSIGNED NOT NULL,
  `categoryId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `serviceproviders`
--

INSERT INTO `serviceproviders` (`id`, `organizationId`, `categoryId`) VALUES
(3, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `provider` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `provider_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `profile_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `provider`, `provider_id`, `remember_token`, `created_at`, `updated_at`, `profile_url`) VALUES
(1, 'Angèle Scott', 'angele.lys@hotmail.com', '', 'facebook', '10162112662590720', NULL, '2019-07-02 09:43:25', '2019-07-29 17:43:58', 'https://graph.facebook.com/v2.9/10162112662590720/picture?type=normal'),
(2, 'Trevor Schonewille', 'trevor@monkiri.co', '', 'facebook', '10214047986664106', NULL, '2019-07-17 00:14:35', '2019-07-17 00:14:35', 'https://graph.facebook.com/v2.9/10214047986664106/picture?type=normal'),
(3, 'Test User', 'test@user.co', '', 'facebook', '	106230644031430', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(4, 'Yaw Keeys', 'maxwealthiest@outlook.com', '', 'facebook', '217572669215811', NULL, '2019-08-04 04:56:18', '2019-08-04 04:56:18', 'https://graph.facebook.com/v2.9/217572669215811/picture?type=normal'),
(5, 'Gabi Gautschi', 'gabi.gucci@hotmail.com', '', 'facebook', '10157538720054679', NULL, '2019-08-05 14:23:48', '2019-08-05 14:23:48', 'https://graph.facebook.com/v2.9/10157538720054679/picture?type=normal'),
(6, 'Nicho Mercier', 'www.nicho96_chicken@hotmail.com', '', 'facebook', '2460517620625641', NULL, '2019-04-28 04:05:11', '2019-04-28 04:05:11', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_language`
--
ALTER TABLE `app_language`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sponsorId` (`sponsorId`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lessoncategories`
--
ALTER TABLE `lessoncategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lessoncategories` (`image_id`);

--
-- Indexes for table `lessoncategories_translation`
--
ALTER TABLE `lessoncategories_translation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `language_code` (`language_code`),
  ADD KEY `translation_id` (`category_id`);

--
-- Indexes for table `lessonquestions`
--
ALTER TABLE `lessonquestions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lessonId` (`lessonId`);

--
-- Indexes for table `lessonquestions_translation`
--
ALTER TABLE `lessonquestions_translation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `translation_id` (`lessonquestions_id`),
  ADD KEY `language_code` (`language_code`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lessons_ibfk_1` (`categoryId`),
  ADD KEY `lessons` (`image_id`);

--
-- Indexes for table `lessons_translation`
--
ALTER TABLE `lessons_translation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `translation_id` (`lessons_id`),
  ADD KEY `language_code` (`language_code`);

--
-- Indexes for table `objectives_category`
--
ALTER TABLE `objectives_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `objectives_category_ibfk_1` (`categoryId`);

--
-- Indexes for table `objectives_category_translation`
--
ALTER TABLE `objectives_category_translation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `translation_id` (`objectives_category_id`),
  ADD KEY `language_code` (`language_code`);

--
-- Indexes for table `objectives_lesson`
--
ALTER TABLE `objectives_lesson`
  ADD PRIMARY KEY (`id`),
  ADD KEY `objectives_lesson_ibfk_1` (`lessonId`);

--
-- Indexes for table `objectives_lesson_translation`
--
ALTER TABLE `objectives_lesson_translation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `translation_id` (`objectives_lesson_id`),
  ADD KEY `language_code` (`language_code`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`),
  ADD KEY `password_resets_token_index` (`token`);

--
-- Indexes for table `questions_multiplechoice`
--
ALTER TABLE `questions_multiplechoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lessonQuestionsId` (`lessonQuestionsId`);

--
-- Indexes for table `questions_multiplechoice_options`
--
ALTER TABLE `questions_multiplechoice_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questionsMultipleChoiceId` (`questionsMultipleChoiceId`);

--
-- Indexes for table `questions_multiplechoice_options_translation`
--
ALTER TABLE `questions_multiplechoice_options_translation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `translation_id` (`questions_multiplechoice_options_id`),
  ADD KEY `language_code` (`language_code`);

--
-- Indexes for table `questions_truefalse`
--
ALTER TABLE `questions_truefalse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lessonQuestionsId` (`lessonQuestionsId`);

--
-- Indexes for table `questions_word`
--
ALTER TABLE `questions_word`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questions_word_ibfk_1` (`lessonQuestionsId`);

--
-- Indexes for table `questions_word_data`
--
ALTER TABLE `questions_word_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questions_word_data_ibfk_1` (`questionsWordId`);

--
-- Indexes for table `questions_word_data_translation`
--
ALTER TABLE `questions_word_data_translation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `translation_id` (`questions_word_data_id`),
  ADD KEY `language_code` (`language_code`);

--
-- Indexes for table `serviceprovidercategories`
--
ALTER TABLE `serviceprovidercategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `serviceproviders`
--
ALTER TABLE `serviceproviders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `organizationId` (`organizationId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `lessoncategories`
--
ALTER TABLE `lessoncategories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `lessoncategories_translation`
--
ALTER TABLE `lessoncategories_translation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `lessonquestions`
--
ALTER TABLE `lessonquestions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT for table `lessonquestions_translation`
--
ALTER TABLE `lessonquestions_translation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `lessons_translation`
--
ALTER TABLE `lessons_translation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `objectives_category`
--
ALTER TABLE `objectives_category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `objectives_category_translation`
--
ALTER TABLE `objectives_category_translation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `objectives_lesson`
--
ALTER TABLE `objectives_lesson`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `objectives_lesson_translation`
--
ALTER TABLE `objectives_lesson_translation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `questions_multiplechoice`
--
ALTER TABLE `questions_multiplechoice`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `questions_multiplechoice_options`
--
ALTER TABLE `questions_multiplechoice_options`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `questions_multiplechoice_options_translation`
--
ALTER TABLE `questions_multiplechoice_options_translation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `questions_truefalse`
--
ALTER TABLE `questions_truefalse`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `questions_word`
--
ALTER TABLE `questions_word`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `questions_word_data`
--
ALTER TABLE `questions_word_data`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=796;

--
-- AUTO_INCREMENT for table `questions_word_data_translation`
--
ALTER TABLE `questions_word_data_translation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT for table `serviceprovidercategories`
--
ALTER TABLE `serviceprovidercategories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `serviceproviders`
--
ALTER TABLE `serviceproviders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `challenges`
--
ALTER TABLE `challenges`
  ADD CONSTRAINT `challenges_ibfk_1` FOREIGN KEY (`sponsorId`) REFERENCES `organizations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `lessoncategories`
--
ALTER TABLE `lessoncategories`
  ADD CONSTRAINT `lessoncategories` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `lessoncategories_translation`
--
ALTER TABLE `lessoncategories_translation`
  ADD CONSTRAINT `lessoncategories_translation` FOREIGN KEY (`language_code`) REFERENCES `app_language` (`code`) ON UPDATE CASCADE;

--
-- Constraints for table `lessonquestions_translation`
--
ALTER TABLE `lessonquestions_translation`
  ADD CONSTRAINT `lessonquestions_translation` FOREIGN KEY (`language_code`) REFERENCES `app_language` (`code`) ON UPDATE CASCADE;

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `lessoncategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lessons_translation`
--
ALTER TABLE `lessons_translation`
  ADD CONSTRAINT `lessons_translation` FOREIGN KEY (`language_code`) REFERENCES `app_language` (`code`) ON UPDATE CASCADE;

--
-- Constraints for table `objectives_category`
--
ALTER TABLE `objectives_category`
  ADD CONSTRAINT `objectives_category_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `lessoncategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `objectives_category_translation`
--
ALTER TABLE `objectives_category_translation`
  ADD CONSTRAINT `objectives_category_translation` FOREIGN KEY (`language_code`) REFERENCES `app_language` (`code`) ON UPDATE CASCADE;

--
-- Constraints for table `objectives_lesson`
--
ALTER TABLE `objectives_lesson`
  ADD CONSTRAINT `objectives_lesson_ibfk_1` FOREIGN KEY (`lessonId`) REFERENCES `lessons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `objectives_lesson_translation`
--
ALTER TABLE `objectives_lesson_translation`
  ADD CONSTRAINT `objectives_lesson_translation` FOREIGN KEY (`language_code`) REFERENCES `app_language` (`code`) ON UPDATE CASCADE;

--
-- Constraints for table `questions_multiplechoice`
--
ALTER TABLE `questions_multiplechoice`
  ADD CONSTRAINT `questions_multiplechoice_ibfk_1` FOREIGN KEY (`lessonQuestionsId`) REFERENCES `lessonquestions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions_multiplechoice_options`
--
ALTER TABLE `questions_multiplechoice_options`
  ADD CONSTRAINT `questions_multiplechoice_options_ibfk_1` FOREIGN KEY (`questionsMultipleChoiceId`) REFERENCES `questions_multiplechoice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions_multiplechoice_options_translation`
--
ALTER TABLE `questions_multiplechoice_options_translation`
  ADD CONSTRAINT `questions_multiplechoice_options_translation` FOREIGN KEY (`language_code`) REFERENCES `app_language` (`code`) ON UPDATE CASCADE;

--
-- Constraints for table `questions_truefalse`
--
ALTER TABLE `questions_truefalse`
  ADD CONSTRAINT `questions_truefalse_ibfk_1` FOREIGN KEY (`lessonQuestionsId`) REFERENCES `lessonquestions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions_word`
--
ALTER TABLE `questions_word`
  ADD CONSTRAINT `questions_word_ibfk_1` FOREIGN KEY (`lessonQuestionsId`) REFERENCES `lessonquestions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions_word_data`
--
ALTER TABLE `questions_word_data`
  ADD CONSTRAINT `questions_word_data_ibfk_1` FOREIGN KEY (`questionsWordId`) REFERENCES `questions_word` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions_word_data_translation`
--
ALTER TABLE `questions_word_data_translation`
  ADD CONSTRAINT `questions_word_data_translation` FOREIGN KEY (`language_code`) REFERENCES `app_language` (`code`) ON UPDATE CASCADE;

--
-- Constraints for table `serviceproviders`
--
ALTER TABLE `serviceproviders`
  ADD CONSTRAINT `serviceproviders_ibfk_1` FOREIGN KEY (`organizationId`) REFERENCES `organizations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `serviceproviders_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `serviceprovidercategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
