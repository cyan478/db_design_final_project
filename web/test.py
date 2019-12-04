import pymysql.cursors

connection = pymysql.connect(host='localhost',
                           user='root',
                           password='',
                           db='airVisuals',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)

with connection.cursor() as cur:
  sql_query = "select * from idfk"
  try:
    cur.execute(sql_query)                           
  except pymysql.ProgrammingError as e:
    return None