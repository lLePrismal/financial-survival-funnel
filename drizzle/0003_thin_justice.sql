CREATE TABLE `affiliates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`affiliateCode` varchar(64) NOT NULL,
	`referralLink` varchar(512) NOT NULL,
	`commissionRate` int NOT NULL DEFAULT 20,
	`totalCommission` int NOT NULL DEFAULT 0,
	`totalReferrals` int NOT NULL DEFAULT 0,
	`status` enum('active','inactive','suspended') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `affiliates_id` PRIMARY KEY(`id`),
	CONSTRAINT `affiliates_userId_unique` UNIQUE(`userId`),
	CONSTRAINT `affiliates_affiliateCode_unique` UNIQUE(`affiliateCode`)
);
--> statement-breakpoint
CREATE TABLE `referrals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`affiliateId` int NOT NULL,
	`orderId` int NOT NULL,
	`commissionAmount` int NOT NULL,
	`status` enum('pending','completed','cancelled') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `referrals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `smsSubscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`phoneNumber` varchar(20) NOT NULL,
	`countryCode` varchar(3) NOT NULL DEFAULT 'PH',
	`status` enum('subscribed','unsubscribed','bounced') NOT NULL DEFAULT 'subscribed',
	`lastReminderSent` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `smsSubscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `smsSubscribers_email_unique` UNIQUE(`email`)
);
