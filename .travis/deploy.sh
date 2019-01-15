#!/bin/bash
eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 ~/.ssh/id_rsa # Allow read access to the private key
ssh-add ~/.ssh/id_rsa # Add the private key to SSH

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
git remote add deploy ssh://git@$IP:$PORT$DEPLOY_DIR
git push deploy master
