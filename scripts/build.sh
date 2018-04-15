#!/bin/sh

BASEDIR=$(dirname ${0})
ROOT=$(realpath ${BASEDIR}/../)

rm -rf ${ROOT}/build/
mkdir -p ${ROOT}/build/terminal ${ROOT}/build/desktop

cd ${ROOT}/src/terminal
go build -o ${ROOT}/build/terminal/movie-finder


cd $ROOT
docker run -v $PWD/src/desktop:/srv/app -v $PWD/build/desktop:/srv/app/build -w /srv/app node:9-alpine /bin/sh -c "sh scripts/build.sh"