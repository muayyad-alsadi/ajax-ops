#! /bin/bash
# to make this work type: npm install -g uglify-js@2.4.15
cd `dirname $0`
for i in *.js;
do
[[ $i == *.min.js ]] || uglifyjs -mco ${i/.js/.min.js} $i
done
