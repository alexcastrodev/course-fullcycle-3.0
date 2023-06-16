https://github.com/AlexcastroDev/server-sent-event-nestjs/blob/main/nestjs/docker-compose.yml

Problema:
Eu estava fazendo o yarn dentro do Dockerfile, e no Dockerfile trata somente das imagens.
O caso de desenvolvimento pra não perder os módulos e funcionar as importações locais, teria que ter o node_modules dentro e fora do container.

Solução:
Trocar as instalações de desenvolvimento para um arquivo .sh
Por que é como se eu entrasse dentro do container e executasse os comandos. Assim o node_modules vai pro host, assim como o dist (bundle final). 

A minha dúvida sobre as migrations, também foi pro arquivo .sh
Pois vai ser executado após o container "está de pé".

Além disso, pra rodar as migrations com a DB up-to-date, é necessário fazer uma alteração no depends_on do backend:
depends_on:
      mysql:
        condition: service_healthy

e no banco adicionar:
healthcheck:
      test: ["CMD", "mysqladmin" ,"ping", "-h", "localhost"]
      interval: 5s
      timeout: 10s
      retries: 3


Aqui uma dica ótima pra limpar as imagens acumuladas no docker
sudo docker rm -f $(docker ps -a -q) 
sudo docker rmi -f $(docker images -q)
sudo docker system prune -af
sudo docker volume prune -f