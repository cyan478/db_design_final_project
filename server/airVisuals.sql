DROP DATABASE IF EXISTS airVisuals;
CREATE DATABASE airVisuals;

USE airVisuals;

CREATE TABLE users (
	username VARCHAR(100) PRIMARY KEY,
    user_password VARCHAR(20) NOT NULL,
    user_firstname VARCHAR(255) NOT NULL,
    user_lastname VARCHAR(255) NOT NULL,
    account_created DATE NOT NULL
);

CREATE TABLE companies (
	company_id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(255) NOT NULL
);

CREATE TABLE sites (
	site_id INT PRIMARY KEY AUTO_INCREMENT,
    site_name VARCHAR(100) NOT NULL,
    site_url VARCHAR(255) NOT NULL
);

CREATE TABLE reviews (
	review_id INT PRIMARY KEY AUTO_INCREMENT,
    poster_username VARCHAR(255) NOT NULL,
    company_id INT NOT NULL,
    review_site_id INT NOT NULL,
    review_sentiment double(3,1) NOT NULL,
    review_date DATE NOT NULL,
    review_content mediumtext NOT NULL,
    
    CONSTRAINT review_site_fk FOREIGN KEY (review_site_id)
        REFERENCES sites (site_id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
        
    CONSTRAINT company_id_fk FOREIGN KEY (company_id)
        REFERENCES companies (company_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE keywords (
	keyword varchar(255) NOT NULL,
    review_id INT NOT NULL,
    sentiment double(3,1) not null,
    PRIMARY KEY(keyword, review_id),
    
    CONSTRAINT keywords_review_id_fk FOREIGN KEY (review_id)
        REFERENCES reviews (review_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE savedReviews (
	username VARCHAR(100) NOT NULL,
    review_id INT NOT NULL,
    PRIMARY KEY(username, review_id),
    
	CONSTRAINT savedReviews_username_fk FOREIGN KEY (username)
        REFERENCES users (username)
        ON DELETE CASCADE ON UPDATE CASCADE,
    
    CONSTRAINT savedReviews_review_id_fk FOREIGN KEY (review_id)
        REFERENCES reviews (review_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

delimiter //
drop procedure if exists test_procedure//
create procedure test_procedure
(
	in id int
)
begin
start transaction;
	select company_name
    from companies
    where company_id = id;
    commit;
end//
    
call test_procedure(1);
-- drop procedure if exists track_region//
-- CREATE PROCEDURE track_region
-- (
-- 	in region_name varchar(30)
-- )    
-- BEGIN
-- 	start transaction;
--     set region_name = lower(region_name);
--     
-- 	select encounters.region_name, encounters.title, count(*) as num_encounters, lr.leader
--     from (
-- 		SELECT le.region_name, lb.title
-- 		FROM lotr_first_encounter le
-- 		inner join lotr_book lb on (lb.book_id = le.book_id)
--         where lower(le.region_name) LIKE region_name
--         ) as encounters
-- 	left outer join lotr_region lr on (encounters.region_name LIKE lr.region_name)
--     group by title; 
--     commit;
-- END//