#!/bin/bash

docker exec -it api-fastapi sh -c "python -m unittest discover --verbose && exit" && \
docker exec -it front-nextjs sh -c "printf \"console.log('Start testing')\" | node && exit"