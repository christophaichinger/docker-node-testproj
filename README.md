build with:
docker-compose build

start with:
docker-compose up

scale with:
docker-compose up --scale loadtest-slave=3

swarm deployment:
docker swarm init
docker service create --name registry --publish 5000:5000 registry:2
docker-compose push
docker stack deploy -c docker-compose.yml loadtest

stop stack:
docker stack rm loadtest

view services:
docker service ls

exit swarm:
docker stack rm registry
docker swarm leave (--force da wir der manager node sind)