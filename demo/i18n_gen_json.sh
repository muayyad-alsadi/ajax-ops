#! /bin/bash

# to make it work type: npm install -g po2json

cd `dirname $0`
langs="ar"
for lang in $langs
do
   # add -p for pretty json
   po2json -f raw po/$lang.po po/tmp.json
   ( echo -ne "var i18n=i18n || {};\ni18n.$lang="; cat po/tmp.json ) > js/i18n_$lang.js
done
rm po/tmp.json 2>/dev/null || :

