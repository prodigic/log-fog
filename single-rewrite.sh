DISPOSABLEREPO=pokrovsky
GRAFFITI=`echo "GITHUB" | sed "s: :%20:g"`
GITHUBUSER=prodigic

git init {repo}
cd {repo}
touch README.md
git add README.md

GIT_AUTHOR_DATE=2014-12-29T12:00:00 GIT_COMMITTER_DATE=2014-12-29T12:00:00 git commit --allow-empty -m "Rewriting History!" > /dev/null

git remote add origin git@github.com:prodigic/{repo}.git
git pull
git push -u origin master
