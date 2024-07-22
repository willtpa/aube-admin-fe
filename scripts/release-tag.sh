#!/bin/bash

current_branch=$(git branch --show-current)

if [[ "$#" -ne 1 ]]; then
  echo "Usage: $0 (staging|sandbox|production)"
  exit 1
fi

env=$1

check_tag() {
  if [ "$current_branch" != "main" ]; then
    echo "Error: use the main branch to create a release tag for production & sandbox."
    exit 1
  fi
}

case $env in
  staging)
    echo "Creating a release tag for $env..."
    TAG_NAME=v$(date -u +"%Y.%m.%d.%H%M")-$env; git tag $TAG_NAME; echo created tag: $TAG_NAME
    ;;
  sandbox|production)
    check_tag
    echo "Creating a release tag for $env..."
    TAG_NAME=v$(date -u +"%Y.%m.%d.%H%M")-$env; git tag $TAG_NAME; echo created tag: $TAG_NAME
    ;;
  *)
    echo "Invalid argument: $env"
    echo "Usage: $0 (staging|sandbox|production)"
    exit 1
    ;;
esac




