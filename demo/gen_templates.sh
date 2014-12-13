#! /bin/bash
cd `dirname $0`
# to make this work type npm install -g handlebars@1.3.0
( cd handlebars/ && handlebars *.handlebars -m -f ../js/templates.js )

( cd handlebars-ar/ && handlebars *.handlebars -m -f ../js/templates-ar.js )

( cd handlebars-i18n/ && handlebars *.handlebars -k _ -k ngettext -m -f ../js/templates-i18n.js )



