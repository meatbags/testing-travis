#!/bin/bash
eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 ~/.ssh/id_rsa # Allow read access to the private key
ssh-add ~/.ssh/id_rsa # Add the private key to SSH

git status
git remote add deploy ssh://git@$IP:$PORT$DEPLOY_DIR
git remote
git branch
git push deploy master
