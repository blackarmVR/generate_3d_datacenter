tsc core.ts

cat start.html > index.html
cat core.js >> index.html
cat end.html >> index.html

scp index.html mag:/var/www/html/vr/test