export $(cat questionnaire/tag.env | xargs)
docker-compose  -f docker/docker-compose.yml up -d