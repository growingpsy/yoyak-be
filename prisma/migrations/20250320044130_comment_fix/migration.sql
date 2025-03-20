-- CreateTable
CREATE TABLE `bookmark` (
    `bookmark_id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `summary_id` INTEGER NOT NULL,

    INDEX `summary_id_idx`(`summary_id`),
    PRIMARY KEY (`bookmark_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `summary` (
    `summary_id` INTEGER NOT NULL AUTO_INCREMENT,
    `summary_text` TEXT NOT NULL,
    `is_long` BOOLEAN NOT NULL DEFAULT false,
    `contains_spoiler` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `content_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `content_id_idx`(`content_id`),
    INDEX `user_id_idx`(`user_id`),
    PRIMARY KEY (`summary_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(50) NOT NULL,
    `user_nick` VARCHAR(50) NOT NULL,
    `user_email` VARCHAR(255) NOT NULL,
    `email_verified` BOOLEAN NOT NULL DEFAULT false,
    `user_pwd` VARCHAR(100) NOT NULL,
    `ban_count` INTEGER NOT NULL DEFAULT 0,
    `kakao_id` VARCHAR(50) NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `user_email`(`user_email`),
    UNIQUE INDEX `user_kakao_id_key`(`kakao_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SequelizeMeta` (
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment_parent_id` INTEGER NULL,
    `comment_text` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `summary_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `fk_comment_summary`(`summary_id`),
    INDEX `fk_comment_user`(`user_id`),
    INDEX `comment_comment_parent_id_idx`(`comment_parent_id`),
    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content` (
    `content_id` INTEGER NOT NULL AUTO_INCREMENT,
    `content_title` VARCHAR(255) NOT NULL,
    `content_type` ENUM('book', 'drama', 'movie') NOT NULL,
    `content_genre` VARCHAR(255) NOT NULL,
    `content_plot` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`content_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `highlight` (
    `highlight_id` INTEGER NOT NULL AUTO_INCREMENT,
    `highlight_text` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `summary_id` INTEGER NOT NULL,

    INDEX `fk_summary_id_idx`(`summary_id`),
    PRIMARY KEY (`highlight_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `library` (
    `library_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    INDEX `library_ibfk_1`(`user_id`),
    PRIMARY KEY (`library_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likeDislike` (
    `like_id` INTEGER NOT NULL,
    `dislike_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `summary_id` INTEGER NOT NULL,

    INDEX `fk_like_summary_id_idx`(`summary_id`),
    PRIMARY KEY (`like_id`, `dislike_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `review_text` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `content_id` INTEGER NOT NULL,

    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bookmark` ADD CONSTRAINT `fk_bookmark_summary` FOREIGN KEY (`summary_id`) REFERENCES `summary`(`summary_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `fk_comment_summary` FOREIGN KEY (`summary_id`) REFERENCES `summary`(`summary_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_comment_parent_id_fkey` FOREIGN KEY (`comment_parent_id`) REFERENCES `comment`(`comment_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `highlight` ADD CONSTRAINT `fk_highlight_summary_id` FOREIGN KEY (`summary_id`) REFERENCES `summary`(`summary_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `library` ADD CONSTRAINT `library_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `likeDislike` ADD CONSTRAINT `fk_like_summary_id` FOREIGN KEY (`summary_id`) REFERENCES `summary`(`summary_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `fk_review_content_id` FOREIGN KEY (`content_id`) REFERENCES `content`(`content_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
