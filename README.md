# BlueVisuals

YHack 2019 submission - Awarded **Best Website**

[Devpost](https://devpost.com/software/humans-of-jetblue)

![Preview of website](https://github.com/arytonhoi/yhack2019/blob/master/employee-specific.jpg)

- [Team members](#team-members)
- [Inspiration](#what-inspired-us)
- [What Our Project Does](#what-our-project-does)
- [How we did it](#how-we-designed-and-built-BlueVisuals-and-Humans-of-JetBlue)


---

## Team members:

![Teammates yay c:](https://github.com/arytonhoi/yhack2019/blob/master/team.jpg)

- [Paul Rhee](https://github.com/paulrhee)
- [Celine Yan](https://celineyan.me)
- [Kevin Zhang](https://github.com/fdwraith)
- [Aryton Hoi](https://github.com/arytonhoi)

---

## What Inspired Us

> “Be hearty in your approbation and lavish in your praise, and people will cherish your words and treasure them and repeat them over a lifetime - repeat them years after you have forgotten them.” - Dale Carnegie

BlueVisuals is a customer review analytics dashboard for JetBlue that specifically focused on employee-related reviews. For example, one Facebook comment thanked “Jeff from JetBlue” for his kindness and attention. Although we were primarily submitting to JetBlue’s challenge in pursuit of free round-trip tickets, we also chose to center our project around the airline employees because we wanted to give JetBlue a product which reminded their employees that they are appreciated. 

Things can be “cool” for many reasons, but for us, we felt that it would be cool if our project could instill happiness in others, even if it was as simple as showing them a Facebook comment.

> A good customer experience leaves a lasting impression across every stage of their journey. This is exemplified in the airline and  travel industry. To give credit and show appreciation to the hardworking employees of JetBlue, we chose to scrape and analyze customer feedback on review and social media sites to both highlight their impact on customers and provide currently untracked, valuable data to build a more personalized brand that outshines its market competitors.

## What Our Project does

Our customer feedback analytics dashboard, BlueVisuals, provides JetBlue with highly visual presentations, summaries, and highlights of customers' thoughts and opinions on social media and review sites. Visuals such as word clouds and word-frequency charts highlight critical areas of focus where the customers reported having either positive or negative experiences, suggesting either areas of improvement or strengths. The users can read individual comments to review the exact situation of the customers or skim through to get a general sense of their social media interactions with their customers. Through this dashboard, we hope that the users are able to draw solid conclusions and pursue action based on those said conclusions.

Humans of JetBlue is a side product resulting from such conclusions users (such as ourselves) may draw from the dashboard that showcases the efforts and dedication of individuals working at JetBlue and their positive impacts on customers. This product highlights our inspiration for building the main dashboard and is a tool we would recommend to JetBlue. 

## How we designed and built BlueVisuals and Humans of JetBlue

After establishing the goals of our project, we focused on data collection via web scraping and building the data processing pipeline using Python and Google Cloud's NLP API. After understanding our data, we drew up a website and corresponding visualizations. Then, we implemented the front end using React.

Finally, we drew conclusions from our dashboard and designed 'Humans of JetBlue' as an example usage of BlueVisuals.

## What's next for BlueVisuals and Humans of JetBlue

- collecting more data to get a more representative survey of consumer sentiment online
- building a back-end database to support data processing, storage, and organization
- expanding employee-centric 

## Challenges we ran into

- Polishing scraped data and extracting important information.
- Finalizing direction and purpose of the project
- Sleeping on the floor.

## Accomplishments that we're proud of

- effectively processed, organized, and built visualizations for text data
- picking up new skills (JS, matplotlib, GCloud NLP API)
- working as a team to manage loads of work under time constraints

## What we learned

- value of teamwork in a coding environment
- technical skills

---
# How to run

Python 3

## Setting up NLP Analysis

https://cloud.google.com/natural-language/docs/quickstart

```
export GOOGLE_APPLICATION_CREDENTIALS="[ABSOLUTE_PATH_TO_API_KEY]"
pip3 install google-cloud-language
```


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
# run our dump sql script
source <ABSOLUTE PATH TO airVisuals_dump.sql FILE>
```

### Setting up and running Python3 backend dependencies:
```
# starting from main project directory
# setup NLP
pip3 install google-cloud-language
export GOOGLE_APPLICATION_CREDENTIALS="[ABSOLUTE_PATH_TO_API_KEY_JSON FILE]"
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
