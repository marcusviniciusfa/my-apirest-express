#!/bin/bash

git restore --staged $1 > /dev/null 2>&1
if [ $? -eq 0 ]
then
  echo "removed $1 from the stage area"
fi
exit 0
