# DB Project

project backend requirements: https://docs.google.com/document/d/1DOtUcqX2hHKw4i1Dx68XlpsfPP_Y7THNC4YG61XfZgs/edit

project frontend requirements: https://docs.google.com/document/d/1LGPTxFPS-IW1I699sFSLOGMB1hVgHLCpJDOJ8O145tM/edit

final report requirements: https://docs.google.com/document/d/1DOtUcqX2hHKw4i1Dx68XlpsfPP_Y7THNC4YG61XfZgs/edit

BONUS POINTS: Complicated schema – user data pull requires multi-joins, or many tables (> 10 ) due to the complexity of the data domain (1-5 points)

BONUS POINTS:  Identifying fields for secondary indexes. ( 1-5 points) Succinctly justify your index choice within code comments or as a separate section within your report..  

BONUS POINTS: Difficult process for data extraction for the database, such as web scraping use of an API, etc. (1-5 points) 

(Total bonus points that can be allotted for the project is 5 points)

---

## Running Process
```bash
# running docker container and commiting changes to images
./init_docker.sh
docker attach db_project

# detach using ctrl+p, ctrl+q
docker commit db_project db_project:<version>
```
