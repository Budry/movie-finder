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
    --platform "darwin,linux,win32" \
    --arch "ia32,x64,armv7l" \
    --overwrite \
    --out=${DISTRIBUTION_DIR} \
    --icon=${BUILD_DIR}/assets/images/icon.ico

cd ${DISTRIBUTION_DIR}

for DISTRIBUTION in "${DISTRIBUTION_DIR}"/*
do
    FILENAME=$(basename ${DISTRIBUTION})
    zip -r ${FILENAME}.zip ${FILENAME}
done