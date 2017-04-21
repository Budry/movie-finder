#!/bin/sh

BASEPATH=$(dirname $(pwd)/$0)

help() {
    echo "Usages: ${0} <version>"
}

if [ -z $1 ]; then
    echo "Missing <version> argument"
    help
    exit 1
fi

VERSION=$1

sh ${BASEPATH}/build.sh

sed -i -- "s/\"version\": \".*\"/\"version\": \"${VERSION}\"/g" ${BASEPATH}/../package.json
git tag -a "v${VERSION}" -m "Released version ${VERSION}"
git add package.json
git commit -m "Released version ${VERSION}"