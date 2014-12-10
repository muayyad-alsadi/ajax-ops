;(function(document, window){
ajax_ops.modal_form=function(f, opts){
	var $f=$(f), o={target:$f.closest('.modal')};
	if (!opts) opts={};
	$.extend(true, o, opts);
	o.cb=function($target,d) {
		if (opts.with_close) $target.modal('hide');
		if (opts.cb) {opts.cb($target,d);}
	};
	return ajax_ops.submit_form(f, o);
};
function ajax_modal(e){
	var $target, modal_attr=e.getAttribute('data-modal-attr'), target=e.getAttribute('data-target'), url=e.getAttribute('data-url') || e.getAttribute('href');
	var attr={class:"modal fade", tabindex:"-1", role:"dialog", replace:false};
	if (modal_attr) $.extend(true, attr, $.parseJSON(modal_attr));
	if (attr.replace) $('.modal').modal('hide');
	delete attr['replace'];
	if (target) $target=$(target);
	else $target=$('<div>').attr(attr);
	$('body').addClass('loading');
	$target.load(url, '', function(response, status, xhr){
		$('body').removeClass('loading');
		if (status != "error") $target.modal(); else self.flashmsg({type:'danger', html:'could not load modal dialog'});
	});
}
$(document).on('click', '[data-toggle="ajax-modal"]', function(){ajax_modal(this)});
})(document, window);
