#!/bin/bash
cd questionnaire
export $(cat tag.env | xargs)
docker compose --env-file .env -f docker/docker-compose.yml up -d