from flask import Flask, render_template,request,json
import pymysql.cursors
from nlp import NLP

app = Flask(__name__)
nlp = NLP()

username = ""
password = ""

# ========================================================
# reviews and keywords table

# endpoint to GET specified reviews from reviews table
@app.route('/reviews', methods=['GET'])
def get_reviews():
   connection = pymysql.connect(host='localhost',
                           user=username,
                           password=password,
                           db='airVisuals',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)
   site = request.args.get('site', default=None, type=str)
   company = request.args.get('company', default=None, type=str)
   keyword = request.args.get('keyword', default=None, type=str)
   poster = request.args.get('poster', default=None, type=str)

   selections = 'select t.review_id,\
      t.poster_username,\
      t.review_date,\
      t.review_sentiment,\
      t.review_content'
   table_source = 'reviews'
   company_filter = 'true'
   site_filter = 'true'
   if keyword:
      table_source = '(select reviews.*\
         from keywords\
         left outer join reviews \
         on reviews.review_id = keywords.review_id\
         where keyword like \'{}\')'.format(keyword)
   if company:
      company_filter = 't.company_id = (select company_id\
         from companies\
         where lower(company_name) like \'{}\' limit 1)'.format(company)
   if site:
      site_filter = 't.review_site_id = (select site_id\
         from sites\
         where lower(site_name) like \'{}\' limit 1)'.format(site)

   sql_query = selections + \
      ' FROM ' + table_source + ' AS t ' \
      ' WHERE ' + company_filter + ' AND ' + site_filter + ';'

   if poster:
      sql_query = 'select * from reviews \
         where poster_username like \'{}\''.format(poster)

   with connection.cursor() as cur:
      try:
         cur.execute(sql_query)
         reviews = []
         for review in cur.fetchall():
            reviews.append(review)
         cur.close()
         connection.close()
         return {'reviews': reviews}
      except pymysql.ProgrammingError as e:
         cur.close()
         connection.close()
         return None;


# endpoint to insert rows into table
@app.route('/reviews', methods=['POST'])
def insert_review():
   connection = pymysql.connect(host='localhost',
                           user=username,
                           password=password,
                           db='airVisuals',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)
   poster_username = request.json['poster_username']
   company_name = request.json['company_name']
   review_site_name = request.json['site_name']
   date = request.json['date']
   review_content = request.json['content']
   nlp_results = nlp.analyze({'content':review_content}, 0.008)
   review_sentiment = nlp_results['document_sentiment']['score']
      
   insert_statement = "INSERT INTO reviews ( \
      poster_username,\
      company_id,\
      review_site_id,\
      review_sentiment,\
      review_date,\
      review_content)\
      VALUES (\'{}\',\
      (select company_id from companies\
      where lower(company_name) like lower(\'{}\') limit 1),\
      (select site_id from sites\
      where lower(site_name) like lower(\'{}\') limit 1),\
      {:.2f},\'{}\',\'{}\')".format(
         poster_username.translate(str.maketrans({"'": r"\'",
                                          "\"": r"\"",
                                          "\\": r"\\"})),
         company_name.translate(str.maketrans({"'": r"\'",
                                          "\"": r"\"",
                                          "\\": r"\\"})),
         review_site_name.translate(str.maketrans({"'": r"\'",
                                          "\"": r"\"",
                                          "\\": r"\\"})),
         review_sentiment,
         date,
         review_content.translate(str.maketrans({"'": r"\'",
                                          "\"": r"\"",
                                          "\\": r"\\"}))
      )
   get_id_statement = "select last_insert_id();"

   # insert review into reviews table
   with connection.cursor() as cur:
      cur.execute(insert_statement)
      connection.commit()
      cur.execute(get_id_statement)
      review_id = cur.fetchall()[0]['last_insert_id()']

      # insert keywords into keywords table
      entities = nlp_results['entities']
      try:
         for entity in entities:
            keyword = entity['value']
            insert_statement = "INSERT INTO keywords (\
               keyword,\
               review_id,\
               sentiment\
            ) values (\'{}\',{},{:.2f})".format(keyword, review_id, review_sentiment)
            cur.execute(insert_statement)
         connection.commit()
         cur.close()
         connection.close()
         return 'success'
      except pymysql.ProgrammingError as e:
         cur.close()
         connection.close()
         return None;

# endpoint to get keywords from specific sites or companies
@app.route('/keywords', methods=['GET'])
def get_keywords():
   connection = pymysql.connect(host='localhost',
                           user=username,
                           password=password,
                           db='airVisuals',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)
   site = request.args.get('site', default=None, type=str)
   company = request.args.get('company', default=None, type=str)
   sentiment = request.args.get('sentiment', type=str)

   selections = 'select keyword, count(*) as count'
   table_source = 'reviews'
   company_filter = 'true'
   site_filter = 'true'
   
   if company:
      company_filter = 'company_id = \
         (select company_id \
         from companies where lower(company_name) \
         like \'{}\' limit 1)'.format(company)
   if site:
      site_filter = 'review_site_id = \
         (select site_id \
         from sites where lower(site_name) \
         like \'{}\' limit 1)'.format(site)
   if site or company:
      table_source = '(select review_id\
	      from reviews \
         where {} and {})'.format(company_filter, site_filter)
   if sentiment == 'positive':
      sentiment_comparator = '>'
   else:
      sentiment_comparator = '<'

   sql_query = selections + \
      ' FROM ' + table_source + ' AS t ' \
      ' LEFT OUTER JOIN keywords on keywords.review_id = t.review_id' + \
      ' where keywords.sentiment ' + sentiment_comparator + ' 0 ' + \
      'group by keyword;'

   with connection.cursor() as cur:
      try:
         cur.execute(sql_query)
         keywords = []
         for keyword in cur.fetchall():
            keywords.append(keyword)
         cur.close()
         connection.close()
         return {'keywords': keywords}
      except pymysql.ProgrammingError as e:
         cur.close()
         connection.close()
         return None;

# endpoint to GET specified reviews from reviews table
@app.route('/reviews/statistics', methods=['GET'])
def get_count():
   connection = pymysql.connect(host='localhost',
                           user=username,
                           password=password,
                           db='airVisuals',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)
   site = request.args.get('site', default=None, type=str)
   company = request.args.get('company', default=None, type=str)

   site_filter = 'true'
   company_filter = 'true'
   if (site):
      site_filter = 'review_site_id = (select site_id from sites \
         where lower(site_name) like \'{}\' limit 1)'.format(site)
   if (company):
      company_filter = 'company_id = (select company_id from companies \
         where lower(company_name) like \'{}\' limit 1)'.format(company)

   sql_query = 'select count(*) as count from reviews where ' + \
      site_filter + ' AND ' + company_filter + ";"

   with connection.cursor() as cur:
      try:
         cur.execute(sql_query)
         count = cur.fetchone()
         cur.close()
         connection.close()
         return {'count': count}      
      except pymysql.ProgrammingError as e:
         cur.close()
         connection.close()
         return None; 

# endpoint to INSERT saved reviews
@app.route('/reviews/save', methods=['POST'])
def save_review():
   connection = pymysql.connect(host='localhost',
                           user=username,
                           password=password,
                           db='airVisuals',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)
   username = request.json['username']
   review_id = request.json['review_id']
   sql_query = 'insert into savedReviews (username, review_id) \
      values (\'{}\', {});'.format(username, review_id)

   with connection.cursor() as cur:
      try:
         print(sql_query)
         cur.execute(sql_query)
         cur.close()
         connection.commit()
         connection.close()
         return 'success'  
      except pymysql.ProgrammingError as e:
         cur.close()
         connection.close()
         return None;         

# endpoint to DELETE saved reviews
@app.route('/reviews/delete', methods=['POST'])
def delete_saved_review():
   connection = pymysql.connect(host='localhost',
                           user=username,
                           password=password,
                           db='airVisuals',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)
   username = request.json['username']
   review_id = request.json['review_id']
   sql_query = 'delete from savedReviews \
      where username like \'{}\' and \
      review_id = {}'.format(username, review_id)

   with connection.cursor() as cur:
      try:
         print(sql_query)
         cur.execute(sql_query)
         cur.close()
         connection.commit()
         connection.close()
         return 'success'  
      except pymysql.ProgrammingError as e:
         cur.close()
         connection.close()
         return None;         

# endpoint to GET saved reviews
@app.route('/reviews/save', methods=['GET'])
def get_saved_reviews():
   connection = pymysql.connect(host='localhost',
                           user=username,
                           password=password,
                           db='airVisuals',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)
   username = request.args.get('username', type=str)

   sql_query = 'select * from (select review_id from savedReviews \
      where username like \'{}\') as t\
      left outer join reviews on t.review_id = reviews.review_id;'.format(username)

   with connection.cursor() as cur:
      try:
         cur.execute(sql_query)
         reviews = []
         for review in cur.fetchall():
            reviews.append(review)
         cur.close()
         connection.close()
         return {'reviews': reviews}     
      except pymysql.ProgrammingError as e:
         cur.close()
         connection.close()
         return None;         

# ========================================================
# user table
# endpoint to create user account (insert into user table)
@app.route('/users', methods=['POST'])
def add_user():
   connection = pymysql.connect(host='localhost',
                           user=username,
                           password=password,
                           db='airVisuals',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)
   username = request.json['username']
   password = request.json['password']
   first_name = request.json['firstname']
   last_name = request.json['lastname']
   date_created = request.json['creationdate']
   
   with connection.cursor() as cur:
      sql = "INSERT INTO users ( \
         username, \
         user_password, \
         user_firstname, \
         user_lastname, \
         account_created) \
         VALUES (%s,%s,%s,%s,%s)"
      try:
         cur.execute(sql,(username,\
            password,\
            first_name,\
            last_name,\
            date_created))
         connection.commit()
         cur.close()
         connection.close()
         return {'result': 'success'}
      except pymysql.ProgrammingError as e:
         cur.close()
         connection.close()
         return None;

# endpoint to get username from user table
@app.route('/users', methods=['GET'])
def check_user():
   connection = pymysql.connect(host='localhost',
                           user=username,
                           password=password,
                           db='airVisuals',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)
   username = request.args.get('username')
   with connection.cursor() as cur:
      sql = 'select * from users where username like %s'
      try:
         cur.execute(sql,(username))
         users = []
         for user in cur.fetchall():
            users.append(user)
         cur.close()
         connection.close()
         return {'user_data': users} 
      except pymysql.ProgrammingError as e:
         cur.close()
         connection.close()
         return None;

# endpoint to change password
@app.route('/users/password', methods=['POST'])
def change_password():
   connection = pymysql.connect(host='localhost',
                           user=username,
                           password=password,
                           db='airVisuals',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)
   username = request.json['username']
   password = request.json['password']
   with connection.cursor() as cur:
      sql = 'update users\
         set user_password = \'{}\'\
         where username like \'{}\';'.format(
            password,username
         )
      try:
         cur.execute(sql)
         connection.commit()
         cur.close()
         connection.close()
         return 'Success!'
      except pymysql.ProgrammingError as e:
         cur.close()
         connection.close()
         return None;         

if __name__ == '__main__':
   username = input("MySQL username: ")
   password = input("MySQL password: ")
   app.run(debug=True)