#!/usr/bin/env sh

BASE_DIR=$(dirname ${0})
ROOT_DIR=$(realpath ${BASE_DIR}/../)

Help() {
	echo "Usage: ${0} <os> <arch>"
}

if [ -z  ${1} ]; then
	Help
	echo "Missing <os> argument"
	exit 1
fi

if [ -z  ${2} ]; then
	Help
	echo "Missing <arch> argument"
	exit 1
fi

OS=${1}
ARCH=${2}

sudo rm -rf dist

sh ${BASE_DIR}/update-external.sh ${OS} ${ARCH}

sh ${BASE_DIR}/docker-builder.sh ${OS} ${ARCH}