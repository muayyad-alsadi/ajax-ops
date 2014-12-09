#! /bin/bash
cd `dirname $0`
# TODO: remove unused md5_*.js
# to make this work type npm install -g handlebars@1.3.0
( cd handlebars/ && handlebars *.handlebars -m -f ../js/templates.js )

