;var ajax_ops=(function (document, window) {
var self={};
self.ops={}; // used to extend ajax-ops in the form of name: function(el, params){},
self.flashmsg_opts={selector:'.content:first'};
self.get_target=function(selector, $base, where) {
	if (!$base) return $(selector);
	else if (where=='closest') return $base.closest(selector);
	else if (where=='inside') return $base.children(selector);
	else return $(selector);
};
self.flashmsg=function(opts) {
	// TODO: replace with template
	var $target, $base_e=opts.base_target || this && $(this), where=opts.where, selector=opts.selector;
	if (!opts) opts={};
	if (!opts.type) opts.type='info';
	$target=self.get_target(selector, $base_e, where);
	if (!$target.length) $target=$(self.flashmsg_opts.selector)
	if (!$target.length) $target=$(document.body);
	$target.prepend(self.templates['flashmsg'](opts));
};
self.submit_form=function(f, opts) {
	var $f=$(f), $target;
	if (!opts) opts={};
	if (opts.target) $target=opts.target;
	else {
		$target=$($f.attr('data-target'));
		if (!$target.length) $target=$f;
	}
	$.ajax({
		type:$f.attr('method') || 'post',
		url:$f.attr('action'),
		data:$f.serialize() ,
		beforeSend: function() {$target.addClass('loading')},
		complete: function() {$target.removeClass('loading')},
		error: function(d) {if (self.flashmsg) self.flashmsg({type:'danger', html:d.responseText, base_target:$target})},
		success:function(d){
			$target.html(d);
			if (opts.cb) {opts.cb($target,d);}
		}
	});
	return false;
};
self.loads=function(params) {
	// {html: CONTENT, text: CONTENT, data: JSON, template: NAME, el: ELEMENT, how: prepend|append|replace}
	var $target=$(params.el), $frag = $('<div>'), how=params.how || 'replace';
	if (params.template) $frag.html(self.templates[params.template](params.data));
	else if (params.html) $frag.html(params.html);
	else $frag.text(params.text);
	var html=$frag.html();
	if (how=='replace') { $target.html(html);}
	else if (how=='append') $target.append(html);
	else if (how=='prepend') $target.prepend(html);
};
self.load=function(params) {
	var e=params.el,
		$e=$(e),
		url=params.url || $e.attr('data-url') || $e.attr('href'),
		how=params.how || $e.attr('data-how') || 'replace',
		selector=params.selector || $e.attr('data-target'),
		where=params.where || $e.attr('data-where'),
		loading_selector=params.loading_selector || $e.attr('data-loading-target'),
		loads_params, $target, $targets, format, $loading_target;
	if (selector) $targets=self.get_target(selector, $e, where);
	else $targets=$e;
	if (loading_selector) $loading_target=self.get_target(loading_selector, $e, where);
	else $loading_target=$targets;
	$.ajax({
		url:url, dataType:'html', data:{_:new Date().getTime()},
		beforeSend: function() {$loading_target.addClass('loading')},
		complete: function() {$loading_target.removeClass('loading')},
		error: function(d) {if (self.flashmsg) self.flashmsg({type:'danger', html:d.responseText})},
		success:function(d){
			$targets.each(function(i, el){
				loads_params={how:how, el:el};
				$target=$(el);
				loads_params.template=$e.attr('data-template') || $target.attr('data-template');
				format=$e.attr('data-format') || $target.attr('data-format') || 'html';
				if (loads_params.template) loads_params.data=$.parseJSON(d);
				else if (format=='html') loads_params.html=d;
				else loads_params.text=d;
				self.loads(loads_params);
			});
		}
	});
};
self.refresh=function(e, params) {
	// params={where:closest|inside|'', base_element:el}
	if (!params) params={};
	var selector, $base_e, $e;
	if (params.base_element) $base_e=$(params.base_element);
	if (typeof(e)=='string') {
		selector=e;
		if (!$base_e) $targets=$(selector);
		else $targets=self.get_target(selector, $base_e, params.where);
		delete params.where;
		// TODO: aggregate by url
		$targets.each(function(i,el){ self.refresh(el, params); });
	} else {
		$e=$(e);
		params.el=e;
		params.url=$e.attr('data-refresh-url') || $e.attr('data-url') || $e.attr('href');
		self.load(params);
	}
};
self.exec_ops=function(options){
	var ops=options.ops, base_e=options.base_element, $base_e=base_e && $(base_e);
	var i, k, v, a, opcode, selector, params, $target, $targets;
	for(i in ops) {
		a=ops[i];
		opcode=a[0];
		selector=a[1];
		if (a.length>2) params=a[2];
		else params={};
		if (!$base_e) $targets=$(selector);
		else $targets=self.get_target(selector, $base_e, params.where);
		$targets.each(function(j,el){
			$target=$(el);
			if (opcode=='remove') {
				$target.remove();
			} else if (opcode=='load') {
				params.el=el;
				self.loads(params);
			} else if (opcode=='refresh') {
				self.refresh(el)
			} else if (opcode=='attr') {
				if (params.set) {
					for(k in params.set) {
						v=params.set[k];
						$target.attr(k,v);
					}
				}
				if (params.unset) {
					for(k in params.unset) $target.removeAttr(params.unset[k]);
				}
			} else if (opcode=='class') {
				if (params.add) {
					for(k in params.add) $target.addClass(params.add[k]);
				}
				if (params.remove) {
					for(k in params.remove) $target.removeClass(params.remove[k]);
				}
				if (params.toggle) {
					for(k in params.toggle) $target.toggleClass(params.toggle[k]);
				}
			} else if (self.ops[opcode]) {
				self.ops[opcode](el, params);
			} else {
				console.log("do not know how to do ["+opcode+"]");
			}
		});
	}
};
function ajax_ops(e) {
	var $e=$(e),
		url=$e.attr('data-url')  || $e.attr('href'),
		selector=$e.attr('data-loading-target') || $e.attr('data-target'), where=$e.attr('data-where');
	$targets=self.get_target(selector, $e, where);
	$.ajax({
		url:url, dataType:'json', data:{_:new Date().getTime()},
		beforeSend: function() {$targets.addClass('loading')},
		complete: function() {$targets.removeClass('loading')},
		error: function(d) {if (self.flashmsg) self.flashmsg({type:'danger', html:d.responseText})},
		success:function(d){
			self.exec_ops({ops:d, base_element:e});
		}
	});
	
};
$(document).on('click', '[data-toggle="ajax-load"]', function(){self.load({el:this})});
$(document).on('click', '[data-toggle="ajax-ops"]', function(){ajax_ops(this)});
return self;
})(document, window);
