#!/usr/bin/env sh

set -e

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

declare -A ARCH_MAP
ARCH_MAP["amd64"]="x64"
ARCH_MAP["386"]="ia32"

OS=${1}
ARCH=ARCH_MAP[${2}]

docker run --rm -ti \
	-v ${PWD}:/project \
	-v ${PWD##*/}-node-modules:/project/node_modules \
	-v ~/.cache/electron:/root/.cache/electron \
	-v ~/.cache/electron-builder:/root/.cache/electron-builder \
	electronuserland/builder:wine \
	/bin/sh -c "yarn install && yarn run electron-builder ${OS} ${ARCH}"
