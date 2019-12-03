import pymysql.cursors
connection = pymysql.connect(host='localhost',
                           user='root',
                           password='',
                           db='airVisuals',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)

insert_query = "INSERT INTO reviews ( \
      poster_username,\
      company_id,\
      review_site_id,\
      review_sentiment,\
      review_date,\
      review_content)\
      VALUES (\'{}\',\
      (select company_id from companies\
      where lower(company_name) like \'{}\' limit 1),\
      (select site_id from sites\
      where lower(site_name) like \'{}\' limit 1),\
      {:.2f},\'{}\',\'{}\');".format(
         'ripmemes',
         ' jetblue',
         'facebook',
         0.111,
         '2019-01-01',
         'hello'
      )
get_query = "select last_insert_id();"

# insert review into reviews table
with connection.cursor() as cur:
  cur.execute(insert_query)
  
  cur.execute(get_query)
  review_id = cur.fetchall()[0]['last_insert_id()']

  entities = [{'value':'hi'},{'value':'bye'}]
  for entity in entities:
      keyword = entity['value']
      insert_statement = "INSERT INTO keywords (\
        keyword,\
        review_id\
      ) values (\'{}\',{})".format(keyword, review_id)
      cur.execute(insert_statement)
  connection.commit()
