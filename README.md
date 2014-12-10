# Declarative Ajax Operations

Your easiest fastest way to have a single page web application with no single line of JavaScript code.

## Live demo

[Live demo](http://muayyad-alsadi.github.io/ajax-ops/)


## Running the demo

The demo is just static files, you might want to place this directory in your server document root
or just type the following command which will start a simple http server on port 8000, 
then point your browser on [http://localhost:8000/index.html](http://localhost:8000/index.html)

```shell
python -m SimpleHTTPServer
```

## Conventions

 - `el` - DOM element
 - `$target` - a jQuery object of `target` DOM element
 - `where` can be one of: `closest`, `inside` or `doc` which means entire document
 - `how` can be one of: `prepend`, `append` or `replace` 
 
## Declarative Usage

```html
<a data-toggle="ajax-load" href="/posts/today.json" data-target=".posts">my link</a>
<button type="button" data-toggle="ajax-ops">my button</a>
<div class="me" data-refresh-url="/user/me.json" data-template="user_info"></div>
<div class="posts" data-template="posts_titles"></div>
<div class="posts" data-template="full_posts"></div>
```

you can define

 - `data-toggle`
   - `ajax-load` - fetched text, HTML content or pure data and apply it to target(s)
   - `ajax-ops` - fetches json op-codes
   - `ajax-modal` * requires extension
 - `data-target` - the selector to apply the fetched content to it
 - `data-url` (which sometimes can be replaced by `href` or `data-refresh-url`)
 - `data-template` - the template to be used to render pure data
 - `data-format` - can be `text`, `html` or  `json`
 - `data-how` - can be one of: `prepend`, `append` or `replace` 

templates are functions that take json object and return html you can use any template engine but we suggest Handlebars

## Reference
 
 - `ajax_ops.flashmsg({html:, text:, type:info|danger, selector:, base_target:$obj, where:closest|inside|''})`
   - display info or warning box using template called 'flashmsg' given text or html and type
   - `ajax_ops.flashmsg({text:'not found', type:'danger');`
   - `ajax_ops.flashmsg.call(this, {text:'not found', type:'danger', selector:'.modal', where:'closest'});`
   - affected by `self.flashmsg_opts.selector` which is `.content:first`
 - `onsubmit="return ajax_ops.submit_form(this, params);"`
   - `params` are optional
   - `params.target=$obj`
   - `params.cb=function($target, data){}`
 - `ajax_ops.loads({html: CONTENT, text: CONTENT, data: JSON, template: NAME, el: ELEMENT, how: prepend|append|replace})`
   - helper to load html, text, or templated data into an element with an option to append it or prepend it
 - `ajax_ops.load({el:element, url:, how: prepend|append|replace, selector:, where:closest|inside|, })`
 - `ajax_ops.refresh(element|selector, params)`
   - `params` are optional
   - `params.where`
   - `params.base_element`
   - uses `ajax_ops.load` and accepts its params like `how`
   - example `ajax_ops.refresh('.me')`
 - `ajax_ops.exec_ops([ [op1, selector1, params1], [op2, selector2, params2],.. ])`
   - operations can be 
      - `remove`
      - `refresh`
      - `load`
      - `attr {set:{k:v}, unset:[k1,k2]}`
      - `class {add:[], remove:[], toggle[]}`
      - one can extend with more operations by adding `ajax_ops.ops['my_opcode']=function(el, params){}`

## Notes:

```javascript
// register templates
ajax_ops.templates=Handlebars.templates;
// nice hack
Handlebars.partials = Handlebars.templates;
// You might want to disable usual links behavior 
$('a[data-toggle]').click(function (e) {e.preventDefault()});
```

## Copyright and license

Copyright 2014 Muayyad Alsadi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

  [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
