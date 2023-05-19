git checkout -b TM-05
git merge origin/master

touch .gitignore && echo "node_modules/" >> .gitignore && git rm -r --cached node_modules ; git status