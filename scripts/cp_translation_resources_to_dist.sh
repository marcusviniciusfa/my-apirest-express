#!/bin/bash

RELATIVE_RESOURCE_PATH="src/shared/translation/resources"
ABSOLUTE_RESOURCE_PATH="$(pwd)/${RELATIVE_RESOURCE_PATH}"
ABSOLUTE_DEST_PATH="$(pwd)/dist/${RELATIVE_RESOURCE_PATH}"

cd $ABSOLUTE_RESOURCE_PATH

for content in $(ls -d */)
do
  cp -R "$ABSOLUTE_RESOURCE_PATH/$content" "$ABSOLUTE_DEST_PATH/$content"
done
exit 0
