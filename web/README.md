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
# starting from backend directory
# log in to MySQL from terminal
# run our dump sql script
source <ABSOLUTE PATH TO airVisuals_dump.sql FILE>
```

### Setting up and running Python3 backend dependencies:
```
# starting from backend directory
# setup NLP
export GOOGLE_APPLICATION_CREDENTIALS="[ABSOLUTE_PATH_TO_API_KEY_JSON FILE]"
pip3 install -r requirements.txt
# Flask backend
python3 app.py
# login to mysql. It will ask you to login twice
```

### Starting up React App
```sh
# starting from web (frontend) directory
# this should install all dependencies in our package.json
npm install
# start the React App, which should open a tab in your browser
npm start
```

That should be all you need. If you run into any problems, please contact us at: aryton.a.hoi@gmail.com
