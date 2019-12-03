select t.review_id, 
    t.poster_username,
    t.review_date,
    t.review_sentiment,
    t.review_content
from (select reviews.*
	from keywords
	left outer join reviews on reviews.review_id = keywords.review_id
	where keyword like 'attendants') as t
where t.review_site_id = (select site_id from sites where lower(site_name) like 'facebook' limit 1) and
	t.company_id = (select company_id from companies where lower(company_name) like ' alaska airlines' limit 1);


select t.review_id, 
    t.poster_username,
    t.review_date,
    t.review_sentiment,
    t.review_content
from reviews as t
where t.review_site_id = (select site_id from sites where lower(site_name) like 'facebook' limit 1) and
	t.company_id = (select company_id from companies where lower(company_name) like 'alaska airlines' limit 1);
use airVisuals;    
INSERT INTO sites (site_id,site_name,site_url) values (2, 'twitter', 'www.twitter.com');

select keyword, count(*) as count
from (select review_id
	from reviews
	where review_site_id = (select site_id from sites where lower(site_name) like 'facebook' limit 1)
	and company_id = (select company_id from companies where lower(company_name) like 'alaska airlines' limit 1)
	) as t
left outer join keywords on keywords.review_id = t.review_id
where keywords.sentiment > 0
group by keyword;