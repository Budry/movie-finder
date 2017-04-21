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

sed -i -- "s/\"version\": \".*\"/\"version\": \"${VERSION}\"/g" ${BASEPATH}/../package.json
git tag -a "v${VERSION}" -m "Released version ${VERSION}"