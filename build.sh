docker build -t todoent .
docker tag todoent registry.todoent-dev.site/todoent
docker push registry.todoent-dev.site/todoent
