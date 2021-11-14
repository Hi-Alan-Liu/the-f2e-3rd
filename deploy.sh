set -e
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/pa013971/the-f2e-3rd.git master:gh-pages
cd -