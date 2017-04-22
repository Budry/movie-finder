#!/bin/sh

BASEDIR=$(dirname "$(pwd)/$0")

DISTRIBUTION_DIR=${BASEDIR}/../distribution
BUILD_DIR=${BASEDIR}/../build
APP_ROOT_DIR=${BASEDIR}/../

rm ${BUILD_DIR}/ -rf
rm ${DISTRIBUTION_DIR} -rf

yarn run gulp build

${APP_ROOT_DIR}/node_modules/.bin/electron-packager ${BUILD_DIR} MovieFinder \
    --platform "linux" \
    --arch "ia32,x64" \
    --overwrite \
    --out=${DISTRIBUTION_DIR} \
    --icon=${BUILD_DIR}/assets/images/icon.ico

${APP_ROOT_DIR}/node_modules/.bin/electron-packager ${BUILD_DIR} MovieFinder \
    --platform "win32" \
    --arch "ia32,x64" \
    --overwrite \
    --out=${DISTRIBUTION_DIR} \
    --icon=${BUILD_DIR}/assets/images/icon.ico \
    --win32metadata.CompanyName="Ondřej Záruba <info@zaruba-ondrej.cz>" \
    --win32metadata.FileDescription="Simple app for find movies in directory" \
    --win32metadata.OriginalFilename="MovieFinder.exe" \
    --win32metadata.ProductName="MovieFinder" \
    --win32metadata.InternalName="MovieFinder" \

if [ "$1" = "--with-pack" ]; then
    cd ${DISTRIBUTION_DIR}

    for DISTRIBUTION in "${DISTRIBUTION_DIR}"/*
    do
        FILENAME=$(basename ${DISTRIBUTION})
        zip -r ${FILENAME}.zip ${FILENAME}
    done
fi