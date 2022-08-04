Comandos p/ Ejecución.

a) Elegir Ambiente.
- Desarrollo (Default). Utiliza BBDD local establecida en .env.
npx nodemon server.js --enviroment DEV
- Producción. Utiliza BBDD cloud establecida en .env.
npx nodemon server.js --enviroment PROD

b) Elegir Puerto.
npx nodemon server.js --port 3000

c) Elegir Fork o Cluster.
- Fork (Default).
npx nodemon server.js --mode FORK
- Cluster.
npx nodemon server.js --mode CLUSTER

d) Elegir Persistencia.
npx nodemon server.js --persistence mongo

Ejemplo Completo.
npx nodemon server.js --enviroment DEV --port 3000 --mode FORK --persistence mongo


