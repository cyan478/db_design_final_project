#!/bin/bash
docker run --name db_project -p 3000:3000 -d -it --mount type=bind,source="$(pwd)",target=/home db_project:v0 bash
