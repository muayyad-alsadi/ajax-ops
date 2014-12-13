var i18n=i18n || {};
i18n.lang='C';
i18n.gettext=function(msgid) { var t;return (t=i18n[i18n.lang][msgid])?t[1]:msgid;};
i18n._=i18n.gettext;
i18n.format=function() {
	var args = arguments;
	return args[0].replace(/{(\d+)}/g, function(match, number) { 
		var n=parseInt(number)+1;
		return typeof args[n] != 'undefined' ? args[n] : match ;
	});
};
i18n.ngettext=function(msgid, plural, count) {
	var t, offset, formula=i18n[i18n.lang][""]["plural-forms"] || ";n==1?0:1";
	var a=formula.split(";",2);
	offset=eval('(function(n){return '+a[1]+'})('+count+');');
	if (a=i18n[i18n.lang][msgid]) {
		t=a[offset+1];
	} else {
		t=(count==1)?msgid:plural;
	}
	return i18n.format(t, count);
};
