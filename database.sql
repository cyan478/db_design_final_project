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

CREATE TABLE review (
	reviewID INT PRIMARY KEY,
    review_content VARCHAR(255) NOT NULL,
    review_siteID INT NOT NULL,
    review_sentiment VARCHAR(50) NOT NULL,
    review_date DATE,
    companyID INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    
    CONSTRAINT review_site_fk FOREIGN KEY (review_siteID)
        REFERENCES sites (siteID)
        ON DELETE RESTRICT ON UPDATE CASCADE,
        
    CONSTRAINT companyID_fk FOREIGN KEY (companyID)
        REFERENCES company (companyID)
        ON DELETE RESTRICT ON UPDATE CASCADE,
	
    CONSTRAINT review_username_fk FOREIGN KEY (username)
        REFERENCES users (username)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE keywords (
	keyword INT NOT NULL,
    reviewID INT NOT NULL,
    PRIMARY KEY(keyword, reviewID),
    
    CONSTRAINT keywords_reviewID_fk FOREIGN KEY (reviewID)
        REFERENCES review (reviewID)
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
        REFERENCES review (reviewID)
        ON DELETE CASCADE ON UPDATE CASCADE
)


