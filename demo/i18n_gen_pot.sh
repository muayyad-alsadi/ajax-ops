#! /bin/bash

# to make it work type: npm install -g xgettext-template
langs="ar"
domain="demo"

cd `dirname $0`
mkdir po 2>/dev/null || :
xgettext-template -L Handlebars -o "po/$domain.pot" handlebars-i18n/*.handlebars
cd po
for lang in $langs
do
        [ -f "$lang.po" ] && echo "$lang.po exists" || {
                # TODO: replace first two lines
                echo "creating dummy [$lang.po]"
                cat <<EOF > $lang.po
msgid ""
msgstr ""
"Project-Id-Version: $domain 0.1\n"
"Language: $lang\n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"Plural-Forms: nplurals=2; plural=n==1 ? 0 : 1;\n"
EOF
               tail -n+3 "$domain.pot" >> $lang.po
        }
        intltool-update -g "$domain" -d $lang
done


