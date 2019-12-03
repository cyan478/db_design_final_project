from flask import Flask, render_template,request,json
import pymysql.cursors
from nlp import NLP

app = Flask(__name__)
nlp = NLP()

connection = pymysql.connect(host='localhost',
                           user='root',
                           password='',
                           db='airVisuals',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)

# ========================================================
# reviews table

# endpoint to GET specified reviews from reviews table
@app.route('/reviews', methods=['GET'])
def get_reviews():
   site = request.args.get('site', default=None, type=str)
   company = request.args.get('company', default=None, type=str)
   keyword = request.args.get('keyword', default=None, type=str)

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
         where keyword like {})'.format(keyword)
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

   with connection.cursor() as cur:
      print(sql_query)
      cur.execute(sql_query)
      reviews = []
      for review in cur.fetchall():
         reviews.append(review)
      return {'reviews': reviews}

# endpoint to insert rows into table
@app.route('/reviews', methods=['POST'])
def insert_review():
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
         poster_username,
         company_name,
         review_site_name,
         review_sentiment,
         date,
         review_content
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
      for entity in entities:
         keyword = entity['value']
         insert_statement = "INSERT INTO keywords (\
            keyword,\
            review_id\
         ) values (\'{}\',{})".format(keyword, review_id)
         cur.execute(insert_statement)
      connection.commit()
   return 'success'

# ========================================================
# user table
# endpoint to create user account (insert into user table)
@app.route('/users', methods=['POST'])
def add_user():
   username = request.args.get['username']
   password = request.args.get['password']
   first_name = request.args.get['firstname']
   last_name = request.args.get['lastname']
   date_created = request.args.get['creationdate']
   
   with connection.cursor() as cur:
      sql = "INSERT INTO users ( \
         username, \
         user_password, \
         user_firstname, \
         user_lastname, \
         account_created) \
         VALUES (%s,%s,%s,%s,%s)"
      cur.execute(sql,(username,\
         password,\
         first_name,\
         last_name,\
         date_created))
      connection.commit()
      return 'success'                      

# endpoint to delete user account (delete from user table)   
@app.route('/users', methods=['DELETE'])
def delete_user():
   username = request.args.get('username')
   with connection.cursor() as cur:
      sql = 'DELETE FROM users WHERE username LIKE %s'
      cur.execute(sql,(username))
      connection.commit()
      return 'success'   


if __name__ == '__main__':
   app.run(debug=True)