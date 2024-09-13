git pull --rebase
docker build -t orochi-landing .
docker stop orochi-landing && docker rm orochi-landing
docker run -d -p 34567:3000 --name orochi-landing orochi-landing