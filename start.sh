#!/usr/bin/env bash

## Clear terminal ##
echo -e '\033[2J\033[u'

## Restart Docker ##
echo -e '\033[35m===>\033[0m \033[33mRestart Docker\033[0m'
docker-compose down

if [ "${docker_rebuild}" == true ]
then
    echo -e '\033[35m===>\033[0m \033[33mBuild Docker\033[0m'
    docker-compose up --build -d
else
echo -e '\033[35m===>\033[0m \033[33mRun Docker\033[0m'
    docker-compose up -d
fi

echo -e '\033[35m===>\033[0m \033[33mMigrate Database\033[0m'
sleep 30

## do migrate ##
# since there is an issue when run db:migrate inside docker https://github.com/sequelize/cli/issues/536 #
# do migration manually from here#
echo -e '\033[35m===>\033[0m \033[33mLoad ENV migration\033[0m'
mv .env .env-docker
mv .env-migrate .env
./node_modules/sequelize-cli/lib/sequelize db:migrate
./node_modules/sequelize-cli/lib/sequelize db:seed:all 

sleep 2
mv .env .env-migrate
mv .env-docker .env
echo -e '\033[35m===>\033[0m \033[33mDONE!!!\033[0m'