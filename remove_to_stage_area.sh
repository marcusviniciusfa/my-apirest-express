#!/bin/bash

git restore --staged $* > /dev/null 2>&1
if [ $? -eq 0 ]
then
  echo "successfully removed $* from the stage area 🎉"
fi
exit 0
