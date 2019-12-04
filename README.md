# Database Design Final Project

## Dependencies
- Languages/ Technologies
  - Python 3
  - MySQL
  - NPM
  
NPM installation page: https://www.npmjs.com/get-npm

Note: You will need two terminal windows/instances: one for the Python3 Flask backend server,
and another for the React app

### Setting up MySQL database
```sh
# starting from main project directory
cd server
# log in the MySQL from terminal. This is how we did it:
mysql -u root
# import our dump file
airVisuals < airVisuals_dump.sql
```

### Setting up and running Python3 backend dependencies:
```sh
# starting from main project directory
cd server
pip3 install -r requirements.txt
# Flask backend
python3 app.py
```

### Starting up React App
```sh
# starting from main project directory
cd server
# this should install all dependencies in our package.json
npm install
# start the React App, which should open a tab in your browser
npm start
```

That should be all you need. If you run into any problems, please contact us at: aryton.a.hoi@gmail.com
