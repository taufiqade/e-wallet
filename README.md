# e-wallet
### Introduction
Simple e-wallet developed using NodeJS (fastify) and TypeScript. 
```
#!using docker
chmod +x start.sh
./start.sh
```
noted: database data will always reset every build, because not have persistence data on docker configuration.


Since `sequelize db:migrate` have an issue can check [here](https://github.com/sequelize/cli/issues/536), so there is a possibility `./start.sh` process failure. then you can run without a docker by following the instructions below:

```
#!without docker
#1. update .env file according to your database configuration
DB_USERNAME=root
DB_PASSWORD=ewallet
DB_DATABASE=ewallet
DB_HOST=localhost

yarn install
./node_modules/sequelize-cli/lib/sequelize db:migrate && ./node_modules/sequelize-cli/lib/sequelize db:seed:all
yarn dev
```

### API Docs
you can see api documentation: http://localhost:3000/documentation