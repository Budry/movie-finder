#!/usr/bin/env sh

set -e

ROOT_DIR=$(realpath $(dirname $0)/../)
EXTERNAL_BINARY_FILE=${ROOT_DIR}/external/movie-finder
TERMINAL_DIR=$(realpath ${ROOT_DIR}/../terminal)

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

echo "Update external binaries"

TARGET_BINARY_FILE=${ROOT_DIR}/../terminal/dist/movie-finder-${OS}-${ARCH}

if [ ! -f ${TARGET_BINARY_FILE} ]; then
	echo "Building terminal binaries:"
	(cd ${TERMINAL_DIR} && make dist)
	if [ ! -f ${TARGET_BINARY_FILE} ]; then
		echo "File ${TARGET_BINARY_FILE} not exist"
		exit 1
	fi
fi

mkdir -p $(dirname ${EXTERNAL_BINARY_FILE})
cp ${TARGET_BINARY_FILE} ${EXTERNAL_BINARY_FILE}