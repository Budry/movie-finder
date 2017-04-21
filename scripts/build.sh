#!/bin/sh

BASEDIR=$(dirname $0)

DISTRIBUTION_DIR=${BASEDIR}/../distribution
IGNORE_LIST="\.\/src|scripts|.git|.gitignore|.idea|gulpfile.js|tsconfig.json|yarn.lock"

#rm build/ -rf
#rm ${DISTRIBUTION_DIR} -rf

#yarn run gulp build

: '
${BASEDIR}/../node_modules/.bin/electron-packager ${BASEDIR}/../ MovieFinder \
    --platform "linux,darwin,win32,mas" \
    --arch "x64,ia32,armv7l" \
    --overwrite \
    --out=${DISTRIBUTION_DIR} \
    --ignore=scripts \
    --ignore=.git \
    --ignore=.gitignore \
    --ignore=.idea \
    --ignore=gulpfile.js \
    --ignore=tsconfig.json \
    --ignore=yarn.lock \
    --ignore=src
'

for DISTRIBUTION in "${DISTRIBUTION_DIR}"/*
do
    FILENAME=$(basename ${DISTRIBUTION})
    zip -r ${DISTRIBUTION_DIR}/${FILENAME}.zip ${DISTRIBUTION}
done