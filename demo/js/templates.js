!function(){var a=Handlebars.template,t=Handlebars.templates=Handlebars.templates||{};t.comment=a(function(a,t,e,n,s){this.compilerInfo=[4,">= 1.0.0"],e=this.merge(e,a.helpers),s=s||{};var l,o,i="",c="function",r=this.escapeExpression;return i+='<div class="media">\n  <a class="pull-left" href="#">\n    <img class="media-object" src="/demo/img/avatar.png" alt="avatar" width="96" height="96" />\n  </a>\n  <div class="media-body">\n    <h4 class="media-heading">',(o=e.username)?l=o.call(t,{hash:{},data:s}):(o=t&&t.username,l=typeof o===c?o.call(t,{hash:{},data:s}):o),i+=r(l)+' <span class="muted pull-right">now</span></h4>\n    <blockquote>\n  <p>',(o=e.content)?l=o.call(t,{hash:{},data:s}):(o=t&&t.content,l=typeof o===c?o.call(t,{hash:{},data:s}):o),i+=r(l)+"</p>\n</blockquote>\n  </div>\n</div>\n"}),t.comments=a(function(a,t,e,n,s){function l(a,t){var s,l="";return l+="\n	",s=h.invokePartial(n.comment,"comment",a,e,n,t),(s||0===s)&&(l+=s),l+="\n"}this.compilerInfo=[4,">= 1.0.0"],e=this.merge(e,a.helpers),n=this.merge(n,a.partials),s=s||{};var o,i,c,r="",h=this,m="function",d=e.blockHelperMissing;return c={hash:{},inverse:h.noop,fn:h.program(1,l,s),data:s},(i=e.comments)?o=i.call(t,c):(i=t&&t.comments,o=typeof i===m?i.call(t,c):i),e.comments||(o=d.call(t,o,{hash:{},inverse:h.noop,fn:h.program(1,l,s),data:s})),(o||0===o)&&(r+=o),r+="\n"}),t.flashmsg=a(function(a,t,e,n,s){this.compilerInfo=[4,">= 1.0.0"],e=this.merge(e,a.helpers),s=s||{};var l,o,i="",c="function",r=this.escapeExpression;return i+='<div class="alert fade in alert-',(o=e.type)?l=o.call(t,{hash:{},data:s}):(o=t&&t.type,l=typeof o===c?o.call(t,{hash:{},data:s}):o),i+=r(l)+'">\n	<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>\n	',(o=e.text)?l=o.call(t,{hash:{},data:s}):(o=t&&t.text,l=typeof o===c?o.call(t,{hash:{},data:s}):o),i+=r(l)+"\n	",(o=e.html)?l=o.call(t,{hash:{},data:s}):(o=t&&t.html,l=typeof o===c?o.call(t,{hash:{},data:s}):o),(l||0===l)&&(i+=l),i+="\n</div>\n"}),t.post=a(function(a,t,e,n,s){function l(a,t){var s,l="";return l+="\n	",s=h.invokePartial(n.comment,"comment",a,e,n,t),(s||0===s)&&(l+=s),l+="\n  "}this.compilerInfo=[4,">= 1.0.0"],e=this.merge(e,a.helpers),n=this.merge(n,a.partials),s=s||{};var o,i,c,r="",h=this,m="function",d=this.escapeExpression,p=e.blockHelperMissing;return r+='<div class="media">\n  <a class="pull-left" href="#">\n    <img class="media-object" src="/demo/img/avatar.png" alt="avatar" width="96" height="96" />\n  </a>\n  <div class="media-body">\n    <h4 class="media-heading">',(i=e.username)?o=i.call(t,{hash:{},data:s}):(i=t&&t.username,o=typeof i===m?i.call(t,{hash:{},data:s}):i),r+=d(o)+' <span class="muted pull-right">now</span></h4>\n    <blockquote>\n  <p>',(i=e.content)?o=i.call(t,{hash:{},data:s}):(i=t&&t.content,o=typeof i===m?i.call(t,{hash:{},data:s}):i),r+=d(o)+'</p>\n  <button class="btn btn-default" type="button" data-toggle="ajax-load" data-url="/demo/data/fresh.json" data-template="comments" data-target="#comments-box" data-how="prepend">refresh</button>\n<div id="comments-box">\n  ',c={hash:{},inverse:h.noop,fn:h.program(1,l,s),data:s},(i=e.comments)?o=i.call(t,c):(i=t&&t.comments,o=typeof i===m?i.call(t,c):i),e.comments||(o=p.call(t,o,{hash:{},inverse:h.noop,fn:h.program(1,l,s),data:s})),(o||0===o)&&(r+=o),r+="\n</div>\n</blockquote>\n  </div>\n</div>\n"})}();