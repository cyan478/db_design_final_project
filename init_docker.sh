#!/bin/bash
docker run --name db_project -d -it --mount type=bind,source="$(pwd)",target=/home db_project:v0 bash
