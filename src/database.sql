DROP DATABASE IF EXISTS blueVisuals;
CREATE DATABASE blueVisuals;

USE blueVisuals;

CREATE TABLE users (
	username VARCHAR(100) PRIMARY KEY,
    user_password VARCHAR(20) NOT NULL,
    user_firstname VARCHAR(255) NOT NULL,
    user_lastname VARCHAR(255) NOT NULL,
    account_created DATE NOT NULL
);

CREATE TABLE company (
	companyID INT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL
);

CREATE TABLE sites (
	siteID INT PRIMARY KEY,
    site_name VARCHAR(100) NOT NULL,
    site_url VARCHAR(255) NOT NULL
);

CREATE TABLE reviews (
	reviewID INT PRIMARY KEY,
    poster_username VARCHAR(255) NOT NULL,
    companyID INT NOT NULL,
    review_siteID INT NOT NULL,
    review_sentiment VARCHAR(50) NOT NULL,
    review_date DATE,
    review_content VARCHAR(5000) NOT NULL,
    
    CONSTRAINT review_site_fk FOREIGN KEY (review_siteID)
        REFERENCES sites (siteID)
        ON DELETE RESTRICT ON UPDATE CASCADE,
        
    CONSTRAINT companyID_fk FOREIGN KEY (companyID)
        REFERENCES company (companyID)
        ON DELETE RESTRICT ON UPDATE CASCADE,
	
    CONSTRAINT review_username_fk FOREIGN KEY (poster_username)
        REFERENCES users (username)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE keywords (
	keyword INT NOT NULL,
    reviewID INT NOT NULL,
    PRIMARY KEY(keyword, reviewID),
    
    CONSTRAINT keywords_reviewID_fk FOREIGN KEY (reviewID)
        REFERENCES reviews (reviewID)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE savedReviews (
	username VARCHAR(100) NOT NULL,
    reviewID INT NOT NULL,
    PRIMARY KEY(username, reviewID),
    
	CONSTRAINT savedReviews_username_fk FOREIGN KEY (username)
        REFERENCES users (username)
        ON DELETE CASCADE ON UPDATE CASCADE,
    
    CONSTRAINT savedReviews_reviewID_fk FOREIGN KEY (reviewID)
        REFERENCES reviews (reviewID)
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
    from company
    where companyID = id;
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