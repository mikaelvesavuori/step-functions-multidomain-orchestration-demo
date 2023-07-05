#!/bin/bash

DAMAGES_API_ENDPOINT="https://ieap9sk6q1.execute-api.eu-north-1.amazonaws.com/prod/start" # https://RANDOM_ID_DAMAGES_API.execute-api.REGION.amazonaws.com/prod/start

curl $DAMAGES_API_ENDPOINT -X POST -d '{"name": "Chewbacca","value": 14080}'
sleep 1

curl $DAMAGES_API_ENDPOINT -X POST -d '{"name": "Han Solo","value": 41500}'
sleep 1

curl $DAMAGES_API_ENDPOINT -X POST -d '{"name": "Lando Calrissian","value": 151200}'
sleep 1

curl $DAMAGES_API_ENDPOINT -X POST -d '{"name": "Leia Organa","value": 1200}'
sleep 1

curl $DAMAGES_API_ENDPOINT -X POST -d '{"name": "Luke Skywalker","value": 94720}'