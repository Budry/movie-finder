#!/usr/bin/env sh

BASEDIR=$(dirname ${0})
ROOTDIR=$(realpath ${BASEDIR}/../)

#GOOS=windows GOARCH=amd64 yarn run build:terminal
#yarn run build:desktop
#yarn run build:styles

yarn run electron-packager . MovieFinder \
    --platform "win32" \
    --arch "x64" \
    --overwrite \
    --out=./dist \
    --icon=${ROOTDIR}/statics/images/icon.ico \
    --win32metadata.CompanyName="Ondřej Záruba <info@zaruba-ondrej.cz>" \
    --win32metadata.FileDescription="Simple app for find movies in directory" \
    --win32metadata.OriginalFilename="MovieFinder.exe" \
    --win32metadata.ProductName="MovieFinder" \
    --win32metadata.InternalName="MovieFinder"


#yarn run build:terminal
#yarn run electron-packager . MovieFinder \
#    --platform "linux" \
#    --arch "x64" \
#    --overwrite \
#    --out=./dist \
#    --icon=${ROOTDIR}/statics/images/icon.ico