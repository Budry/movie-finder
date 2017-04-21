#!/bin/sh

BASEDIR=$(dirname "$(pwd)/$0")

DISTRIBUTION_DIR=${BASEDIR}/../distribution
BUILD_DIR=${BASEDIR}/../build
APP_ROOT_DIR=${BASEDIR}/../

rm ${BUILD_DIR}/ -rf
rm ${DISTRIBUTION_DIR} -rf

yarn run gulp build

cd ${BUILD_DIR}
yarn install --production

${APP_ROOT_DIR}/node_modules/.bin/electron-packager ${BUILD_DIR} MovieFinder \
    --platform "linux" \
    --arch "x64" \
    --overwrite \
    --out=${DISTRIBUTION_DIR}

:
for DISTRIBUTION in "${DISTRIBUTION_DIR}"/*
do
    FILENAME=$(basename ${DISTRIBUTION})
    zip -r ${DISTRIBUTION_DIR}/${FILENAME}.zip ${DISTRIBUTION}
done