#!/usr/bin/env sh

BASEDIR=$(dirname ${0})
ROOTDIR=$(realpath ${BASEDIR}/../)

cd ${ROOTDIR}/src/terminal
go get -u ./...
go build -o ${ROOTDIR}/build/terminal/terminal