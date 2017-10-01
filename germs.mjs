import{concurrent,series}from'nps-utils';import generateAlias from'rollup-plugin-alias';import progress from'rollup-plugin-progress';import babili from'rollup-plugin-babel-minify';import commonjs from'rollup-plugin-commonjs';import cleanup from'rollup-plugin-cleanup';import resolve from'rollup-plugin-node-resolve';import buble from'rollup-plugin-buble';import path,{resolve as resolve$1,sep}from'path';var version$1='0.1.5',all=concurrent,series$1=series,allNPS=all.nps,filterSpecs=function(a){return['jayin "_.toPairs(x)','.map(([k, v]) => ([k,','_.map(v, (y) => y.indexOf(\'node_modules\') > -1 ?','\'\u24C2 \' + y.substr(y.indexOf(\'node_modules\') + 13) :',' y)',']))','.filter(([k, v]) => !(k.indexOf(\'test-helpers\') > -1))','.filter(([k, v]) => !(k.indexOf(\'spec\') > -1))','.filter(([k, v]) => !(k.indexOf(\''+a+'\') > -1))','.reduce((agg, [k, v]) => Object.assign({}, agg, {[k]: v}), {})"'].join('')},DEPGRAPH='dependency-graph.json',madge='madge --webpack-config webpack.config.js',build=function(a,b){void 0===b&&(b={});var c={scripts:Object.assign({dependencies:{script:series$1('nps dependencies.graph.base',allNPS('dependencies.graph.svg','dependencies.graph.dot','dependencies.graph.json')),description:'regenerate all dependencies',check:{script:'depcheck',description:'check dependencies'},graph:{base:{script:madge+' src --json | '+filterSpecs(a)+' > '+DEPGRAPH,desciption:'generate the base graph as a json file'},svg:{script:series$1('nps dependencies.graph.base','cat '+DEPGRAPH+' | '+madge+' --stdin --image dependencies.svg'),description:'generate a visual dependency graph'},json:{script:series$1('nps dependencies.graph.base','cat '+DEPGRAPH+' | '+madge+' --stdin --json'),description:'generate a visual dependency graph in json'},dot:{script:series$1('nps dependencies.graph.base','cat '+DEPGRAPH+' | '+madge+' --stdin --dot'),description:'generate a visual dependency graph in dot'}}},readme:{script:'documentation readme -s "API" src/**.js',description:'regenerate the readme'},lint:{description:'lint both the js and the jsdoc',script:allNPS('lint.src','lint.jsdoc'),src:{script:'eslint src/*.js',description:'lint js files'},jsdoc:{script:'documentation lint src/*/*.js',description:'lint jsdoc in files'}},test:{description:'run all tests with coverage',script:['jest src/*.spec.js --coverage','--coveragePathIgnorePatterns '+a+'.js node_modules/common-tags/*'].join(' '),unit:{description:'run unit tests',script:'jest src/*.spec.js'}},docs:{description:'auto regen the docs',script:'documentation build src/**.js -f html -o docs -a private -a public -a protected',serve:{description:'serve the documentation',script:'documentation serve src/**.js -a private -a public -a protected'}},bundle:{description:'generate bundles',script:allNPS('bundle.commonjs','bundle.es6'),commonjs:{description:'run the commonjs bundle task',script:'rollup -c rollup/config.commonjs.js'},es6:{description:'run the es6 bundle task',script:'rollup -c rollup/config.es6.js'}},build:{description:'convert files individually',script:'babel src -d lib --ignore *.spec.js'},care:{description:'run all the things',script:allNPS('lint','build','bundle','test','readme','dependencies')},precommit:'nps care'},b)};return c};function createCommonjsModule(a,b){return b={exports:{}},a(b,b.exports),b.exports}var filenameRegex=function(){return /([^\\\/]+)$/};var arrFlatten=function(a){return flat(a,[])};function flat(a,b){for(var c,d=0,e=a.length;d<e;d++)c=a[d],Array.isArray(c)?flat(c,b):b.push(c);return b}var slice=[].slice;function diff(a,b){var b,c=arguments.length,d=a.length,e=-1,f=[];if(1===c)return a;for(2<c&&(b=arrFlatten(slice.call(arguments,1)));++e<d;)~b.indexOf(a[e])||f.push(a[e]);return f}var arrDiff=diff;var arrayUnique=function(a){if(!Array.isArray(a))throw new TypeError('array-unique expects an array.');for(var b=a.length,c=-1;c++<b;)for(var d=c+1;d<a.length;++d)a[c]===a[d]&&a.splice(d--,1);return a},toString$1={}.toString,isarray=Array.isArray||function(a){return'[object Array]'==toString$1.call(a)};var isobject=function(a){return null!=a&&'object'==typeof a&&!1===isarray(a)},isBuffer_1=function(a){return null!=a&&(isBuffer(a)||isSlowBuffer(a)||!!a._isBuffer)};function isBuffer(a){return!!a.constructor&&'function'==typeof a.constructor.isBuffer&&a.constructor.isBuffer(a)}function isSlowBuffer(a){return'function'==typeof a.readFloatLE&&'function'==typeof a.slice&&isBuffer(a.slice(0,0))}var toString$2=Object.prototype.toString,kindOf=function(a){if('undefined'==typeof a)return'undefined';if(null===a)return'null';if(!0===a||!1===a||a instanceof Boolean)return'boolean';if('string'==typeof a||a instanceof String)return'string';if('number'==typeof a||a instanceof Number)return'number';if('function'==typeof a||a instanceof Function)return'function';if('undefined'!=typeof Array.isArray&&Array.isArray(a))return'array';if(a instanceof RegExp)return'regexp';if(a instanceof Date)return'date';var b=toString$2.call(a);return'[object RegExp]'===b?'regexp':'[object Date]'===b?'date':'[object Arguments]'===b?'arguments':'[object Error]'===b?'error':isBuffer_1(a)?'buffer':'[object Set]'===b?'set':'[object WeakSet]'===b?'weakset':'[object Map]'===b?'map':'[object WeakMap]'===b?'weakmap':'[object Symbol]'===b?'symbol':'[object Int8Array]'===b?'int8array':'[object Uint8Array]'===b?'uint8array':'[object Uint8ClampedArray]'===b?'uint8clampedarray':'[object Int16Array]'===b?'int16array':'[object Uint16Array]'===b?'uint16array':'[object Int32Array]'===b?'int32array':'[object Uint32Array]'===b?'uint32array':'[object Float32Array]'===b?'float32array':'[object Float64Array]'===b?'float64array':'object'};var isNumber=function(a){var b=kindOf(a);if('number'!==b&&'string'!==b)return!1;var c=+a;return 0<=c-c+1&&''!==a};var isNumber$2=function(a){var b=kindOf(a);if('string'===b){if(!a.trim())return!1;}else if('number'!==b)return!1;return 0<=a-a+1},toString$3=Object.prototype.toString,kindOf$2=function(a){if('undefined'==typeof a)return'undefined';if(null===a)return'null';if(!0===a||!1===a||a instanceof Boolean)return'boolean';if('string'==typeof a||a instanceof String)return'string';if('number'==typeof a||a instanceof Number)return'number';if('function'==typeof a||a instanceof Function)return'function';if('undefined'!=typeof Array.isArray&&Array.isArray(a))return'array';if(a instanceof RegExp)return'regexp';if(a instanceof Date)return'date';var b=toString$3.call(a);return'[object RegExp]'===b?'regexp':'[object Date]'===b?'date':'[object Arguments]'===b?'arguments':'[object Error]'===b?'error':'[object Promise]'===b?'promise':isBuffer_1(a)?'buffer':'[object Set]'===b?'set':'[object WeakSet]'===b?'weakset':'[object Map]'===b?'map':'[object WeakMap]'===b?'weakmap':'[object Symbol]'===b?'symbol':'[object Int8Array]'===b?'int8array':'[object Uint8Array]'===b?'uint8array':'[object Uint8ClampedArray]'===b?'uint8clampedarray':'[object Int16Array]'===b?'int16array':'[object Uint16Array]'===b?'uint16array':'[object Int32Array]'===b?'int32array':'[object Uint32Array]'===b?'uint32array':'[object Float32Array]'===b?'float32array':'[object Float64Array]'===b?'float64array':'object'};var randomatic_1=randomatic,type={lower:'abcdefghijklmnopqrstuvwxyz',upper:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',number:'0123456789',special:'~!@#$%^&()_+-={}[];\',.'};type.all=type.lower+type.upper+type.number+type.special;function randomatic(a,b,c){if('undefined'==typeof a)throw new Error('randomatic expects a string or number.');var d=!1;1===arguments.length&&('string'==typeof a?b=a.length:isNumber$2(a)&&(c={},b=a,a='*')),'object'===kindOf$2(b)&&b.hasOwnProperty('chars')&&(c=b,a=c.chars,b=a.length,d=!0);var e=c||{},f='',g='';for(-1!==a.indexOf('?')&&(f+=e.chars),-1!==a.indexOf('a')&&(f+=type.lower),-1!==a.indexOf('A')&&(f+=type.upper),-1!==a.indexOf('0')&&(f+=type.number),-1!==a.indexOf('!')&&(f+=type.special),-1!==a.indexOf('*')&&(f+=type.all),d&&(f+=a);b--;)g+=f.charAt(parseInt(Math.random()*f.length,10));return g}var cache,res='',repeatString=repeat;function repeat(a,b){if('string'!=typeof a)throw new TypeError('expected a string');if(1===b)return a;if(2===b)return a+a;var c=a.length*b;if(cache!==a||'undefined'==typeof cache)cache=a,res='';else if(res.length>=c)return res.substr(0,c);for(;c>res.length&&1<b;)1&b&&(res+=a),b>>=1,a+=a;return res+=a,res=res.substr(0,c),res}var repeatElement=function(a,b){for(var c=Array(b),d=0;d<b;d++)c[d]=a;return c};var fillRange_1=fillRange;function fillRange(c,d,e,f,g){if(null==c||null==d)throw new Error('fill-range expects the first and second args to be strings.');'function'==typeof e&&(g=e,f={},e=null),'function'==typeof f&&(g=f,f={}),isobject(e)&&(f=e,e='');var h,j=!1,k='',l=f||{};'undefined'==typeof l.silent&&(l.silent=!0),e=e||l.step;var n=c,o=d;if(d='-0'===d.toString()?0:d,(l.optimize||l.makeRe)&&(e=e?e+='~':e,h=!0,j=!0,k='~'),'string'==typeof e){var p=stepRe().exec(e);if(p){var q=p.index,i=p[0];if('+'===i)return repeatElement(c,d);if('?'===i)return[randomatic_1(c,d)];'>'===i?(e=e.substr(0,q)+e.substr(q+1),h=!0):'|'===i?(e=e.substr(0,q)+e.substr(q+1),h=!0,j=!0,k=i):'~'===i&&(e=e.substr(0,q)+e.substr(q+1),h=!0,j=!0,k=i)}else if(!isNumber(e)){if(!l.silent)throw new TypeError('fill-range: invalid step.');return null}}if(/[.&*()[\]^%$#@!]/.test(c)||/[.&*()[\]^%$#@!]/.test(d)){if(!l.silent)throw new RangeError('fill-range: invalid range arguments.');return null}if(!noAlphaNum(c)||!noAlphaNum(d)||hasBoth(c)||hasBoth(d)){if(!l.silent)throw new RangeError('fill-range: invalid range arguments.');return null}var m=isNumber(zeros(c)),r=isNumber(zeros(d));if(!m&&r||m&&!r){if(!l.silent)throw new TypeError('fill-range: first range argument is incompatible with second.');return null}var s=m,t=formatStep(e);s?(c=+c,d=+d):(c=c.charCodeAt(0),d=d.charCodeAt(0));var u=c>d;(0>c||0>d)&&(h=!1,j=!1);var v,w,x=isPadded(n,o),y=[],z=0;if(j&&shouldExpand(c,d,t,s,x,l))return('|'===k||'~'===k)&&(k=detectSeparator(c,d,t,s,u)),wrap$1([n,o],k,l);for(;u?c>=d:c<=d;)x&&s&&(w=x(c)),v='function'==typeof g?g(c,s,w,z++):s?formatPadding(c,w):j&&isInvalidChar(c)?null:String.fromCharCode(c),null!==v&&y.push(v),u?c-=t:c+=t;return(j||h)&&!l.noexpand?(('|'===k||'~'===k)&&(k=detectSeparator(c,d,t,s,u)),1===y.length||0>c||0>d?y:wrap$1(y,k,l)):y}function wrap$1(a,b,c){'~'===b&&(b='-');var d=a.join(b),e=c&&c.regexPrefix;return'|'===b&&(d=e?e+d:d,d='('+d+')'),'-'===b&&(d=e&&'^'===e?e+d:d,d='['+d+']'),[d]}function isCharClass(c,a,b,d,e){return!e&&(d?9>=c&&9>=a:!!(c<a)&&1===b)}function shouldExpand(c,a,b,d,e){return d&&(9<c||9<a)?!1:!e&&1===b&&c<a}function detectSeparator(c,a,b,d,e){var f=isCharClass(c,a,b,d,e);return f?'~':'|'}function formatStep(a){return Math.abs(a>>0)||1}function formatPadding(a,b){var c=b?b+a:a;return b&&'-'===a.toString().charAt(0)&&(c='-'+b+a.toString().substr(1)),c.toString()}function isInvalidChar(a){var b=toStr(a);return'\\'===b||'['===b||']'===b||'^'===b||'('===b||')'===b||'`'===b}function toStr(a){return String.fromCharCode(a)}function stepRe(){return /\?|>|\||\+|\~/g}function noAlphaNum(a){return /[a-z0-9]/i.test(a)}function hasBoth(a){return /[a-z][0-9]|[0-9][a-z]/i.test(a)}function zeros(a){return /^-*0+$/.test(a.toString())?'0':a}function hasZeros(a){return /[^.]\.|^-*0+[0-9]/.test(a)}function isPadded(a,b){if(hasZeros(a)||hasZeros(b)){var c=length(a),d=length(b),e=c>=d?c:d;return function(b){return repeatString('0',e-length(b))}}return!1}function length(a){return a.toString().length}var expandRange=function(a,b,c){if('string'!=typeof a)throw new TypeError('expand-range expects a string.');'function'==typeof b&&(c=b,b={}),'boolean'==typeof b&&(b={},b.makeRe=!0);var d=b||{},e=a.split('..'),f=e.length;return 3<f?a:1===f?e:('boolean'==typeof c&&!0===c&&(d.makeRe=!0),e.push(d),fillRange_1.apply(null,e.concat(c)))};var before=function(a,b){return a.replace(b,function(a){var b=randomize$1();return cache$1[b]=a,'__ID'+b+'__'})},after=function(a){return a.replace(/__ID(.{5})__/g,function(a,b){return cache$1[b]})};function randomize$1(){return Math.random().toString().slice(2,7)}var cache$1={},preserve={before:before,after:after};var braces_1=function(a,b){if('string'!=typeof a)throw new Error('braces expects a string');return braces(a,b)};function braces(a,b,c){if(''===a)return[];Array.isArray(b)||(c=b,b=[]);var d=c||{};b=b||[],'undefined'==typeof d.nodupes&&(d.nodupes=!0);var e,f=d.fn;'function'==typeof d&&(f=d,d={}),patternRe instanceof RegExp||(patternRe=patternRegex());var g=a.match(patternRe)||[],h=g[0];switch(h){case'\\,':return escapeCommas(a,b,d);case'\\.':return escapeDots(a,b,d);case'/.':return escapePaths(a,b,d);case' ':return splitWhitespace(a);case'{,}':return exponential(a,d,braces);case'{}':return emptyBraces(a,b,d);case'\\{':case'\\}':return escapeBraces(a,b,d);case'${':if(!/\{[^{]+\{/.test(a))return b.concat(a);e=!0,a=preserve.before(a,es6Regex());}braceRe instanceof RegExp||(braceRe=braceRegex());var j=braceRe.exec(a);if(null==j)return[a];var k=j[1],l=j[2];if(''===l)return[a];var m,n;if(-1!==l.indexOf('..'))m=expandRange(l,d,f)||l.split(','),n=m.length;else{if('"'===l[0]||'\''===l[0])return b.concat(a.split(/['"]/).join(''));if(m=l.split(','),d.makeRe)return braces(a.replace(k,wrap(m,'|')),d);n=m.length,1===n&&d.bash&&(m[0]=wrap(m[0],'\\'))}for(var o,p,q=m.length,r=0;q--;){if(p=m[r++],/(\.[^.\/])/.test(p))return 1<n?m:[a];if(o=splice(a,k,p),/\{[^{}]+?\}/.test(o))b=braces(o,b,d);else if(''!==o){if(d.nodupes&&-1!==b.indexOf(o))continue;b.push(e?preserve.after(o):o)}}return d.strict?filter$1(b,filterEmpty):b}function exponential(a,b,c){'function'==typeof b&&(c=b,b=null);var d,e=b||{},f='__ESC_EXP__',g=0,h=a.split('{,}');if(e.nodupes)return c(h.join(''),e);g=h.length-1,d=c(h.join(f),e);for(var j=d.length,k=[],l=0;j--;){var i=d[l++],m=i.indexOf(f);if(-1===m)k.push(i);else if(i=i.split('__ESC_EXP__').join(''),!!i&&!1!==e.nodupes)k.push(i);else{var n=Math.pow(2,g);k.push.apply(k,repeatElement(i,n))}}return k}function wrap(a,b){return'|'===b?'('+a.join(b)+')':','===b?'{'+a.join(b)+'}':'-'===b?'['+a.join(b)+']':'\\'===b?'\\{'+a+'\\}':void 0}function emptyBraces(a,b,c){return braces(a.split('{}').join('\\{\\}'),b,c)}function filterEmpty(a){return!!a&&'\\'!==a}function splitWhitespace(a){for(var b=a.split(' '),c=b.length,d=[],e=0;c--;)d.push.apply(d,braces(b[e++]));return d}function escapeBraces(a,b,c){return /\{[^{]+\{/.test(a)?(a=a.split('\\{').join('__LT_BRACE__'),a=a.split('\\}').join('__RT_BRACE__'),map(braces(a,b,c),function(a){return a=a.split('__LT_BRACE__').join('{'),a.split('__RT_BRACE__').join('}')})):b.concat(a.split('\\').join(''))}function escapeDots(a,b,c){return /[^\\]\..+\\\./.test(a)?(a=a.split('\\.').join('__ESC_DOT__'),map(braces(a,b,c),function(a){return a.split('__ESC_DOT__').join('.')})):b.concat(a.split('\\').join(''))}function escapePaths(a,b,c){return a=a.split('/.').join('__ESC_PATH__'),map(braces(a,b,c),function(a){return a.split('__ESC_PATH__').join('/.')})}function escapeCommas(a,b,c){return /\w,/.test(a)?(a=a.split('\\,').join('__ESC_COMMA__'),map(braces(a,b,c),function(a){return a.split('__ESC_COMMA__').join(',')})):b.concat(a.split('\\').join(''))}function patternRegex(){return /\${|( (?=[{,}])|(?=[{,}]) )|{}|{,}|\\,(?=.*[{}])|\/\.(?=.*[{}])|\\\.(?={)|\\{|\\}/}function braceRegex(){return /.*(\\?\{([^}]+)\})/}function es6Regex(){return /\$\{([^}]+)\}/}var braceRe,patternRe;function splice(a,b,c){var d=a.indexOf(b);return a.substr(0,d)+c+a.substr(d+b.length)}function map(a,b){if(null==a)return[];for(var c=a.length,d=Array(c),e=-1;++e<c;)d[e]=b(a[e],e,a);return d}function filter$1(a,b){if(null==a)return[];if('function'!=typeof b)throw new TypeError('braces: filter expects a callback function.');for(var c=a.length,d=a.slice(),e=0;c--;)b(a[c],e++)||d.splice(c,1);return d}var isPosixBracket=function(a){return'string'==typeof a&&/\[([:.=+])(?:[^\[\]]|)+\1\]/.test(a)};var POSIX={alnum:'a-zA-Z0-9',alpha:'a-zA-Z',blank:' \\t',cntrl:'\\x00-\\x1F\\x7F',digit:'0-9',graph:'\\x21-\\x7E',lower:'a-z',print:'\\x20-\\x7E',punct:'-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',space:' \\t\\r\\n\\v\\f',upper:'A-Z',word:'A-Za-z0-9_',xdigit:'A-Fa-f0-9'},expandBrackets=brackets;function brackets(c){if(!isPosixBracket(c))return c;var d=!1;-1!==c.indexOf('[^')&&(d=!0,c=c.split('[^').join('[')),-1!==c.indexOf('[!')&&(d=!0,c=c.split('[!').join('['));for(var e,f=c.split('['),a=c.split(']'),b=f.length!==a.length,g=c.split(/(?::\]\[:|\[?\[:|:\]\]?)/),h=g.length,j=0,i='',k='',l=[];h--;){e=g[j++],('^[!'===e||'[!'===e)&&(e='',d=!0);var m=d?'^':'',n=POSIX[e];n?l.push('['+m+n+']'):e&&(/^\[?\w-\w\]?$/.test(e)?j===g.length?l.push('['+m+e):1==j?l.push(m+e+']'):l.push(m+e):1==j?k+=e:j===g.length?i+=e:l.push('['+m+e+']'))}var o=l.join('|'),p=l.length||1;return 1<p&&(o='(?:'+o+')',p=1),k&&(p++,'['===k.charAt(0)&&(b?k='\\['+k.slice(1):k+=']'),o=k+o),i&&(p++,']'===i.slice(-1)&&(b?i=i.slice(0,i.length-1)+'\\]':i='['+i),o+=i),1<p&&(o=o.split('][').join(']|['),-1!==o.indexOf('|')&&!/\(\?/.test(o)&&(o='(?:'+o+')')),o=o.replace(/\[+=|=\]+/g,'\\b'),o}brackets.makeRe=function(a){try{return new RegExp(brackets(a))}catch(a){}},brackets.isMatch=function(a,b){try{return brackets.makeRe(b).test(a)}catch(a){return!1}},brackets.match=function(a,b){for(var c=a.length,d=0,e=a.slice(),f=brackets.makeRe(b);d<c;){var g=a[d++];f.test(g)&&e.splice(d,1)}return e};var isExtglob=function(a){return'string'==typeof a&&/[@?!+*]\(/.test(a)};var re,cache$2={},extglob_1=extglob;function extglob(a,b){b=b||{};var c={},d=0;a=a.replace(/!\(([^\w*()])/g,'$1!('),a=a.replace(/([*\/])\.!\([*]\)/g,function(a,b){return'/'===b?escape('\\/[^.]+'):escape('[^.]+')});var e=a+(!!b.regex+'')+(!!b.contains+'')+(!!b.escape+'');if(cache$2.hasOwnProperty(e))return cache$2[e];re instanceof RegExp||(re=regex()),b.negate=!1;for(var f;f=re.exec(a);){var g=f[1],h=f[3];'!'===g&&(b.negate=!0);var i='__EXTGLOB_'+d++ +'__';c[i]=wrap$2(h,g,b.escape),a=a.split(f[0]).join(i)}for(var j,k=Object.keys(c),l=k.length;l--;)j=k[l],a=a.split(j).join(c[j]);var m=b.regex?toRegex$1(a,b.contains,b.negate):a;return m=m.split('.').join('\\.'),cache$2[e]=m}function wrap$2(a,b,c){return c&&(a=escape(a)),'!'===b?'(?!'+a+')[^/]'+(c?'%%%~':'*?'):'@'===b?'(?:'+a+')':'+'===b?'(?:'+a+')+':'*'===b?'(?:'+a+')'+(c?'%%':'*'):'?'===b?'(?:'+a+'|)':a}function escape(a){return a=a.split('*').join('[^/]%%%~'),a=a.split('.').join('\\.'),a}function regex(){return /(\\?[@?!+*$]\\?)(\(([^()]*?)\))/}function negate(a){return'(?!^'+a+').*$'}function toRegex$1(a,b,c){var d=b?'^':'',e=b?'$':'';return a='(?:'+a+')'+e,c&&(a=d+negate(a)),new RegExp(d+a)}var isGlob=function(a){return'string'==typeof a&&(/[*!?{}(|)[\]]/.test(a)||isExtglob(a))},isWin='win32'===process.platform,removeTrailingSeparator=function(a){var b=a.length-1;if(2>b)return a;for(;isSeparator(a,b);)b--;return a.substr(0,b+1)};function isSeparator(a,b){var c=a[b];return 0<b&&('/'===c||isWin&&'\\'===c)}var normalizePath=function(a,b){if('string'!=typeof a)throw new TypeError('expected a string');return a=a.replace(/[\\\/]+/g,'/'),!1!==b&&(a=removeTrailingSeparator(a)),a};var isExtendable=function(a){return'undefined'!=typeof a&&null!==a&&('object'==typeof a||'function'==typeof a)};var forIn=function(a,b,c){for(var d in a)if(!1===b.call(c,a[d],d,a))break};var hasOwn=Object.prototype.hasOwnProperty,forOwn=function(a,b,c){forIn(a,function(d,e){if(hasOwn.call(a,e))return b.call(c,a[e],e,a)})};var object_omit=function(a,b){if(!isExtendable(a))return{};b=[].concat.apply([],[].slice.call(arguments,1));var c,d=b[b.length-1],e={};'function'==typeof d&&(c=b.pop());var f='function'==typeof c;return b.length||f?(forOwn(a,function(d,g){-1===b.indexOf(g)&&(f?c(d,g,a)&&(e[g]=d):e[g]=d)}),e):a};var globParent=function(a){a+='a';do a=path.dirname(a);while(isGlob(a));return a};var globBase=function(a){if('string'!=typeof a)throw new TypeError('glob-base expects a string.');var b={};return b.base=globParent(a),b.isGlob=isGlob(a),'.'===b.base?b.glob=a:(b.glob=a.substr(b.base.length),'/'===b.glob.charAt(0)&&(b.glob=b.glob.substr(1))),b.isGlob||(b.base=dirname(a),b.glob='.'===b.base?a:a.substr(b.base.length)),'./'===b.glob.substr(0,2)&&(b.glob=b.glob.substr(2)),'/'===b.glob.charAt(0)&&(b.glob=b.glob.substr(1)),b};function dirname(a){return'/'===a.slice(-1)?a:path.dirname(a)}var isDotfile=function(a){if(46===a.charCodeAt(0)&&-1===a.indexOf('/',1))return!0;var b=a.lastIndexOf('/');return-1!==b&&46===a.charCodeAt(b+1)},parseGlob=createCommonjsModule(function(a){'use strict';function b(a){return-1!==a.indexOf('/.')||'.'===a.charAt(0)&&'/'!==a.charAt(1)}function c(a,b,c){return a&&-1!==b.indexOf(c)}function d(a){var b=/\{([^{}]*?)}|\(([^()]*?)\)|\[([^\[\]]*?)\]/g;return a.replace(b,function(a,b,c,d){var f=b||c||d;return f?a.split(f).join(e(f)):a})}function e(a){return a=a.split('/').join('__SLASH__'),a=a.split('.').join('__DOT__'),a}function f(a){return a=a.split('__SLASH__').join('/'),a=a.split('__DOT__').join('.'),a}var g=a.exports.cache={};a.exports=function(a){if(g.hasOwnProperty(a))return g[a];var e={};e.orig=a,e.is={},a=d(a);var h=globBase(a);e.is.glob=h.isGlob,e.glob=h.glob,e.base=h.base;var i=/([^\/]*)$/.exec(a);e.path={},e.path.dirname='',e.path.basename=i[1]||'',e.path.dirname=a.split(e.path.basename).join('')||'';var j=(e.path.basename||'').split('.')||'';e.path.filename=j[0]||'',e.path.extname=j.slice(1).join('.')||'',e.path.ext='',isGlob(e.path.dirname)&&!e.path.basename&&(!/\/$/.test(e.glob)&&(e.path.basename=e.glob),e.path.dirname=e.base),-1!==a.indexOf('/')||e.is.globstar||(e.path.dirname='',e.path.basename=e.orig);var k=e.path.basename.indexOf('.');if(-1!==k&&(e.path.filename=e.path.basename.slice(0,k),e.path.extname=e.path.basename.slice(k)),'.'===e.path.extname.charAt(0)){var l=e.path.extname.split('.');e.path.ext=l[l.length-1]}e.glob=f(e.glob),e.path.dirname=f(e.path.dirname),e.path.basename=f(e.path.basename),e.path.filename=f(e.path.filename),e.path.extname=f(e.path.extname);var m=a&&e.is.glob;return e.is.negated=a&&'!'===a.charAt(0),e.is.extglob=a&&isExtglob(a),e.is.braces=c(m,a,'{'),e.is.brackets=c(m,a,'[:'),e.is.globstar=c(m,a,'**'),e.is.dotfile=isDotfile(e.path.basename)||isDotfile(e.path.filename),e.is.dotdir=b(e.path.dirname),g[a]=e}});var isPrimitive=function(a){return null==a||'function'!=typeof a&&'object'!=typeof a};var isEqualShallow=function(c,d){if(!c&&!d)return!0;if(!c&&d||c&&!d)return!1;var e,f=0,g=0;for(e in d)if(g++,!isPrimitive(d[e])||!c.hasOwnProperty(e)||c[e]!==d[e])return!1;for(e in c)f++;return f==g};var basic={},cache$3={},regexCache_1=regexCache;function regexCache(a,b,c){var d,e,f='_default_';if(!b&&!c)return'function'==typeof a?basic[f]||(basic[f]=a(b)):a;if('string'==typeof b){if(!c)return basic[b]||(basic[b]=a(b));f=b}else c=b;return(e=cache$3[f],e&&isEqualShallow(e.opts,c))?e.regex:(memo(f,c,d=a(b,c)),d)}function memo(a,b,c){cache$3[a]={regex:c,opts:b}}var cache_1=cache$3,basic_1=basic;regexCache_1.cache=cache_1,regexCache_1.basic=basic_1;var utils_1=createCommonjsModule(function(a){'use strict';var b=process&&'win32'===process.platform,c=a.exports;c.diff=arrDiff,c.unique=arrayUnique,c.braces=braces_1,c.brackets=expandBrackets,c.extglob=extglob_1,c.isExtglob=isExtglob,c.isGlob=isGlob,c.typeOf=kindOf,c.normalize=normalizePath,c.omit=object_omit,c.parseGlob=parseGlob,c.cache=regexCache_1,c.filename=function(a){var b=a.match(filenameRegex());return b&&b[0]},c.isPath=function(a,b){return b=b||{},function(d){var e=c.unixify(d,b);return b.nocase?a.toLowerCase()===e.toLowerCase():a===e}},c.hasPath=function(a,b){return function(d){return-1!==c.unixify(a,b).indexOf(d)}},c.matchPath=function(a,b){var d=b&&b.contains?c.hasPath(a,b):c.isPath(a,b);return d},c.hasFilename=function(a){return function(b){var d=c.filename(b);return d&&a.test(d)}},c.arrayify=function(a){return Array.isArray(a)?a:[a]},c.unixify=function(a,d){return d&&!1===d.unixify?a:d&&!0===d.unixify||b||'\\'===path.sep?c.normalize(a,!1):d&&!0===d.unescape?a?a.toString().replace(/\\(\w)/g,'$1'):'':a},c.escapePath=function(a){return a.replace(/[\\.]/g,'\\$&')},c.unescapeGlob=function(a){return a.replace(/[\\"']/g,'')},c.escapeRe=function(a){return a.replace(/[-[\\$*+?.#^\s{}(|)\]]/g,'\\$&')},a.exports=c});var unesc,temp,chars={};function reverse(a,b){return Object.keys(a).reduce(function(c,d){var e=b?b+d:d;return c[a[d]]=e,c},{})}chars.escapeRegex={"?":/\?/g,"@":/\@/g,"!":/\!/g,"+":/\+/g,"*":/\*/g,"(":/\(/g,")":/\)/g,"[":/\[/g,"]":/\]/g},chars.ESC={"?":'__UNESC_QMRK__',"@":'__UNESC_AMPE__',"!":'__UNESC_EXCL__',"+":'__UNESC_PLUS__',"*":'__UNESC_STAR__',",":'__UNESC_COMMA__',"(":'__UNESC_LTPAREN__',")":'__UNESC_RTPAREN__',"[":'__UNESC_LTBRACK__',"]":'__UNESC_RTBRACK__'},chars.UNESC=unesc||(unesc=reverse(chars.ESC,'\\')),chars.ESC_TEMP={"?":'__TEMP_QMRK__',"@":'__TEMP_AMPE__',"!":'__TEMP_EXCL__',"*":'__TEMP_STAR__',"+":'__TEMP_PLUS__',",":'__TEMP_COMMA__',"(":'__TEMP_LTPAREN__',")":'__TEMP_RTPAREN__',"[":'__TEMP_LTBRACK__',"]":'__TEMP_RTBRACK__'},chars.TEMP=temp||(temp=reverse(chars.ESC_TEMP));var chars_1=chars,glob=createCommonjsModule(function(a){'use strict';function c(a){return a=a.split('?').join('%~'),a=a.split('*').join('%%'),a}function b(a){return a=a.split('%~').join('?'),a=a.split('%%').join('*'),a}var d=a.exports=function a(b,c){return this instanceof a?void(this.options=c||{},this.pattern=b,this.history=[],this.tokens={},this.init(b)):new a(b,c)};d.prototype.init=function(a){this.orig=a,this.negated=this.isNegated(),this.options.track=this.options.track||!1,this.options.makeRe=!0},d.prototype.track=function(a){this.options.track&&this.history.push({msg:a,pattern:this.pattern})},d.prototype.isNegated=function(){return!(33!==this.pattern.charCodeAt(0))&&(this.pattern=this.pattern.slice(1),!0)},d.prototype.braces=function(){if(!0!==this.options.nobraces&&!0!==this.options.nobrace){var c=this.pattern.match(/[\{\(\[]/g),a=this.pattern.match(/[\}\)\]]/g);c&&a&&c.length!==a.length&&(this.options.makeRe=!1);var b=utils_1.braces(this.pattern,this.options);this.pattern=b.join('|')}},d.prototype.brackets=function(){!0!==this.options.nobrackets&&(this.pattern=utils_1.brackets(this.pattern))},d.prototype.extglob=function(){!0===this.options.noextglob||utils_1.isExtglob(this.pattern)&&(this.pattern=utils_1.extglob(this.pattern,{escape:!0}))},d.prototype.parse=function(a){return this.tokens=utils_1.parseGlob(a||this.pattern,!0),this.tokens},d.prototype._replace=function(d,e,b){this.track('before (find): "'+d+'" (replace with): "'+e+'"'),b&&(e=c(e)),this.pattern=d&&e&&'string'==typeof d?this.pattern.split(d).join(e):this.pattern.replace(d,e),this.track('after')},d.prototype.escape=function(a){this.track('before escape: ');var b=/["\\](['"]?[^"'\\]['"]?)/g;this.pattern=a.replace(b,function(a,b){var c=chars_1.ESC,d=c&&c[b];return d?d:/[a-z]/i.test(a)?a.split('\\').join(''):a}),this.track('after escape: ')},d.prototype.unescape=function(a){var c=/__([A-Z]+)_([A-Z]+)__/g;this.pattern=a.replace(c,function(a,b){return chars_1[b][a]}),this.pattern=b(this.pattern)}});var expand_1=expand;function expand(a,b){if('string'!=typeof a)throw new TypeError('micromatch.expand(): argument should be a string.');var c=new glob(a,b||{}),d=c.options;if(!utils_1.isGlob(a))return c.pattern=c.pattern.replace(/([\/.])/g,'\\$1'),c;if(c.pattern=c.pattern.replace(/(\+)(?!\()/g,'\\$1'),c.pattern=c.pattern.split('$').join('\\$'),'boolean'!=typeof d.braces&&'boolean'!=typeof d.nobraces&&(d.braces=!0),'.*'===c.pattern)return{pattern:'\\.'+star,tokens:e,options:d};if('*'===c.pattern)return{pattern:oneStar(d.dot),tokens:e,options:d};c.parse();var e=c.tokens;return e.is.negated=d.negated,(!0===d.dotfiles||e.is.dotfile)&&!1!==d.dot&&(d.dotfiles=!0,d.dot=!0),(!0===d.dotdirs||e.is.dotdir)&&!1!==d.dot&&(d.dotdirs=!0,d.dot=!0),/[{,]\./.test(c.pattern)&&(d.makeRe=!1,d.dot=!0),!0!==d.nonegate&&(d.negated=c.negated),'.'===c.pattern.charAt(0)&&'/'!==c.pattern.charAt(1)&&(c.pattern='\\'+c.pattern),c.track('before braces'),e.is.braces&&c.braces(),c.track('after braces'),c.track('before extglob'),e.is.extglob&&c.extglob(),c.track('after extglob'),c.track('before brackets'),e.is.brackets&&c.brackets(),c.track('after brackets'),c._replace('[!','[^'),c._replace('(?','(%~'),c._replace(/\[\]/,'\\[\\]'),c._replace('/[','/'+(d.dot?dotfiles:nodot)+'[',!0),c._replace('/?','/'+(d.dot?dotfiles:nodot)+'[^/]',!0),c._replace('/.','/(?=.)\\.',!0),c._replace(/^(\w):([\\\/]+?)/gi,'(?=.)$1:$2',!0),-1!==c.pattern.indexOf('[^')&&(c.pattern=negateSlash(c.pattern)),!1!==d.globstar&&'**'===c.pattern?c.pattern=globstar(d.dot):(c.pattern=balance(c.pattern,'[',']'),c.escape(c.pattern),e.is.globstar&&(c.pattern=collapse(c.pattern,'/**'),c.pattern=collapse(c.pattern,'**/'),c._replace('/**/','(?:/'+globstar(d.dot)+'/|/)',!0),c._replace(/\*{2,}/g,'**'),c._replace(/(\w+)\*(?!\/)/g,'$1[^/]*?',!0),c._replace(/\*\*\/\*(\w)/g,globstar(d.dot)+'\\/'+(d.dot?dotfiles:nodot)+'[^/]*?$1',!0),!0!==d.dot&&c._replace(/\*\*\/(.)/g,'(?:**\\/|)$1'),(''!==e.path.dirname||/,\*\*|\*\*,/.test(c.orig))&&c._replace('**',globstar(d.dot),!0)),c._replace(/\/\*$/,'\\/'+oneStar(d.dot),!0),c._replace(/(?!\/)\*$/,star,!0),c._replace(/([^\/]+)\*/,'$1'+oneStar(!0),!0),c._replace('*',oneStar(d.dot),!0),c._replace('?.','?\\.',!0),c._replace('?:','?:',!0),c._replace(/\?+/g,function(a){var b=a.length;return 1===b?qmark:qmark+'{'+b+'}'}),c._replace(/\.([*\w]+)/g,'\\.$1'),c._replace(/\[\^[\\\/]+\]/g,qmark),c._replace(/\/+/g,'\\/'),c._replace(/\\{2,}/g,'\\')),c.unescape(c.pattern),c._replace('__UNESC_STAR__','*'),c._replace('?.','?\\.'),c._replace('[^\\/]',qmark),1<c.pattern.length&&/^[\[?*]/.test(c.pattern)&&(c.pattern=(d.dot?dotfiles:nodot)+c.pattern),c}function collapse(a,b){var c=a.split(b),d=''===c[0],e=''===c[c.length-1];return c=c.filter(Boolean),d&&c.unshift(''),e&&c.push(''),c.join(b)}function negateSlash(a){return a.replace(/\[\^([^\]]*?)\]/g,function(a,b){return-1===b.indexOf('/')&&(b='\\/'+b),'[^'+b+']'})}function balance(c,d,a){var b=c.split(d),e=b.join('').length,f=c.split(a).join('').length;return e===f?c:(c=b.join('\\'+d),c.split(a).join('\\'+a))}var qmark='[^/]',star=qmark+'*?',nodot='(?!\\.)(?=.)',dotfileGlob='(?:\\/|^)\\.{1,2}($|\\/)',dotfiles='(?!'+dotfileGlob+')(?=.)',twoStarDot='(?:(?!'+dotfileGlob+').)*?';function oneStar(a){return a?'(?!'+dotfileGlob+')(?=.)'+star:nodot+star}function globstar(a){return a?twoStarDot:'(?:(?!(?:\\/|^)\\.).)*?'}function micromatch(a,b,c){if(!a||!b)return[];if(c=c||{},'undefined'==typeof c.cache&&(c.cache=!0),!Array.isArray(b))return match(a,b,c);for(var d,e=b.length,f=0,g=[],h=[];e--;)d=b[f++],'string'==typeof d&&33===d.charCodeAt(0)?g.push.apply(g,match(a,d.slice(1),c)):h.push.apply(h,match(a,d,c));return utils_1.diff(h,g)}function match(a,b,c){if('string'!==utils_1.typeOf(a)&&!Array.isArray(a))throw new Error(msg('match','files','a string or array'));a=utils_1.arrayify(a),c=c||{};var d=c.negate||!1,e=b;'string'==typeof b&&(d='!'===b.charAt(0),d&&(b=b.slice(1)),!0===c.nonegate&&(d=!1));for(var f=matcher(b,c),g=a.length,h=0,i=[];h<g;){var j=a[h++],k=utils_1.unixify(j,c);f(k)&&i.push(k)}if(0===i.length){if(!0===c.failglob)throw new Error('micromatch.match() found no matches for: "'+e+'".');(c.nonull||c.nullglob)&&i.push(utils_1.unescapeGlob(e))}return d&&(i=utils_1.diff(a,i)),c.ignore&&c.ignore.length&&(b=c.ignore,c=utils_1.omit(c,['ignore']),i=utils_1.diff(i,micromatch(i,b,c))),c.nodupes?utils_1.unique(i):i}function filter(a,b){if(!Array.isArray(a)&&'string'!=typeof a)throw new TypeError(msg('filter','patterns','a string or array'));a=utils_1.arrayify(a);for(var c=a.length,d=0,e=Array(c);d<c;)e[d]=matcher(a[d++],b);return function(a){if(null==a)return[];var c=e.length,d=0,f=!0;for(a=utils_1.unixify(a,b);d<c;){var g=e[d++];if(!g(a)){f=!1;break}}return f}}function isMatch(a,b,c){if('string'!=typeof a)throw new TypeError(msg('isMatch','filepath','a string'));return a=utils_1.unixify(a,c),'object'===utils_1.typeOf(b)?matcher(a,b):matcher(b,c)(a)}function contains(a,b,c){if('string'!=typeof a)throw new TypeError(msg('contains','pattern','a string'));return c=c||{},c.contains=''!==b,a=utils_1.unixify(a,c),c.contains&&!utils_1.isGlob(b)?-1!==a.indexOf(b):matcher(b,c)(a)}function any(a,b,c){if(!Array.isArray(b)&&'string'!=typeof b)throw new TypeError(msg('any','patterns','a string or array'));b=utils_1.arrayify(b);var d=b.length;for(a=utils_1.unixify(a,c);d--;){var e=matcher(b[d],c);if(e(a))return!0}return!1}function matchKeys(a,b,c){if('object'!==utils_1.typeOf(a))throw new TypeError(msg('matchKeys','first argument','an object'));var d=matcher(b,c),e={};for(var f in a)a.hasOwnProperty(f)&&d(f)&&(e[f]=a[f]);return e}function matcher(a,b){if('function'==typeof a)return a;if(a instanceof RegExp)return function(b){return a.test(b)};if('string'!=typeof a)throw new TypeError(msg('matcher','pattern','a string, regex, or function'));if(a=utils_1.unixify(a,b),!utils_1.isGlob(a))return utils_1.matchPath(a,b);var c=makeRe(a,b);return b&&b.matchBase?utils_1.hasFilename(c,b):function(a){return a=utils_1.unixify(a,b),c.test(a)}}function toRegex(a,b){var c=Object.create(b||{}),d=c.flags||'';c.nocase&&-1===d.indexOf('i')&&(d+='i');var e=expand_1(a,c);c.negated=c.negated||e.negated,c.negate=c.negated,a=wrapGlob(e.pattern,c);var f;try{return f=new RegExp(a,d),f}catch(a){if(a.reason='micromatch invalid regex: ('+f+')',c.strict)throw new SyntaxError(a)}return /$^/}function wrapGlob(a,b){var c=b&&!b.contains?'^':'',d=b&&!b.contains?'$':'';return a='(?:'+a+')'+d,b&&b.negate?c+('(?!^'+a+').*$'):c+a}function makeRe(a,b){if('string'!==utils_1.typeOf(a))throw new Error(msg('makeRe','glob','a string'));return utils_1.cache(toRegex,a,b)}function msg(a,b,c){return'micromatch.'+a+'(): '+b+' should be '+c+'.'}micromatch.any=any,micromatch.braces=micromatch.braceExpand=utils_1.braces,micromatch.contains=contains,micromatch.expand=expand_1,micromatch.filter=filter,micromatch.isMatch=isMatch,micromatch.makeRe=makeRe,micromatch.match=match,micromatch.matcher=matcher,micromatch.matchKeys=matchKeys;var micromatch_1=micromatch,extractors={Identifier:function(a,b){a.push(b.name)},ObjectPattern:function(a,b){b.properties.forEach(function(b){extractors[b.key.type](a,b.key)})},ArrayPattern:function(a,b){b.elements.forEach(function(b){b&&extractors[b.type](a,b)})},RestElement:function(a,b){extractors[b.argument.type](a,b.argument)},AssignmentPattern:function(a,b){return extractors[b.left.type](a,b.left)}};function extractNames(a){var b=[];return extractors[a.type](b,a),b}var Scope=function(a){var b=this;a=a||{},this.parent=a.parent,this.isBlockScope=!!a.block,this.declarations=Object.create(null),a.params&&a.params.forEach(function(a){extractNames(a).forEach(function(a){b.declarations[a]=!0})})};Scope.prototype.addDeclaration=function(a,b,c){var d=this;!b&&this.isBlockScope?this.parent.addDeclaration(a,b,c):extractNames(a.id).forEach(function(a){d.declarations[a]=!0})},Scope.prototype.contains=function(a){return this.declarations[a]||!!this.parent&&this.parent.contains(a)};function ensureArray(a){return Array.isArray(a)?a:void 0==a?[]:[a]}function createFilter(a,b){var c=function(a){return isRegexp(a)?a:{test:micromatch_1.matcher(resolve$1(a))}};return a=ensureArray(a).map(c),b=ensureArray(b).map(c),function(c){if('string'!=typeof c)return!1;if(/\0/.test(c))return!1;c=c.split(sep).join('/');for(var d,e=0;e<b.length;++e)if(d=b[e],d.test(c))return!1;for(var f,g=0;g<a.length;++g)if(f=a[g],f.test(c))return!0;return!a.length}}function isRegexp(a){return a instanceof RegExp}var reservedWords=['break','case','class','catch','const','continue','debugger','default','delete','do','else','export','extends','finally','for','function','if','import','in','instanceof','let','new','return','super','switch','this','throw','try','typeof','var','void','while','with','yield','enum','await','implements','package','protected','static','interface','private','public'],builtins=['arguments','Infinity','NaN','undefined','null','true','false','eval','uneval','isFinite','isNaN','parseFloat','parseInt','decodeURI','decodeURIComponent','encodeURI','encodeURIComponent','escape','unescape','Object','Function','Boolean','Symbol','Error','EvalError','InternalError','RangeError','ReferenceError','SyntaxError','TypeError','URIError','Number','Math','Date','String','RegExp','Array','Int8Array','Uint8Array','Uint8ClampedArray','Int16Array','Uint16Array','Int32Array','Uint32Array','Float32Array','Float64Array','Map','Set','WeakMap','WeakSet','SIMD','ArrayBuffer','DataView','JSON','Promise','Generator','GeneratorFunction','Reflect','Proxy','Intl'],blacklisted=Object.create(null);reservedWords.concat(builtins).forEach(function(a){return blacklisted[a]=!0});function makeLegalIdentifier(a){return a=a.replace(/-(\w)/g,function(a,b){return b.toUpperCase()}).replace(/[^$_a-zA-Z0-9]/g,'_'),(/\d/.test(a[0])||blacklisted[a])&&(a='_'+a),a}function json(a){void 0===a&&(a={});var b=createFilter(a.include,a.exclude);return{name:'json',transform:function(c,d){if('.json'!==d.slice(-5))return null;if(!b(d))return null;var e=JSON.parse(c),f='',g={type:'Program',sourceType:'module',start:0,end:null,body:[]};if('[object Object]'!==Object.prototype.toString.call(e))f='export default '+c+';',g.body.push({type:'ExportDefaultDeclaration',start:0,end:f.length,declaration:{type:'Literal',start:15,end:f.length-1,value:null,raw:'null'}});else{var h='indent'in a?a.indent:'\t',i=[],j=[];Object.keys(e).forEach(function(a){a===makeLegalIdentifier(a)?i.push(a):j.push(a)});var k=0;i.forEach(function(b){var c=a.preferConst?'const':'var',d='export '+c+' '+b+' = '+JSON.stringify(e[b])+';',h=k,i=h+d.length;g.body.push({type:'ExportNamedDeclaration',start:k,end:k+d.length,declaration:{type:'VariableDeclaration',start:h+7,end:i,declarations:[{type:'VariableDeclarator',start:h+7+c.length+1,end:i-1,id:{type:'Identifier',start:h+7+c.length+1,end:h+7+c.length+1+b.length,name:b},init:{type:'Literal',start:h+7+c.length+1+b.length+3,end:i-1,value:null,raw:'null'}}],kind:c},specifiers:[],source:null}),k=i+1,f+=d+'\n'});var l={type:'ExportDefaultDeclaration',start:k,end:null,declaration:{type:'ObjectExpression',start:k+15,end:null,properties:[]}};k+=17+h.length;var m=i.map(function(a){var b=a+': '+a,c=k,d=c+b.length;return l.declaration.properties.push({type:'Property',start:c,end:d,method:!1,shorthand:!1,computed:!1,key:{type:'Identifier',start:c,end:c+a.length,name:a},value:{type:'Identifier',start:c+a.length+2,end:d,name:a},kind:'init'}),k+=b.length+(2+h.length),b}).concat(j.map(function(a){return'"'+a+'": '+JSON.stringify(e[a])}));f+='export default {\n'+h+m.join(',\n'+h)+'\n};',g.body.push(l);var n=f.length;l.declaration.end=n-1,l.end=n}return g.end=f.length,{ast:g,code:f,map:{mappings:''}}}}}var I=function(a){return a},rollup=function(a){var b=a.name,c=a.alias,d=a.external;void 0===d&&(d=[]);var e=a.alterPlugins;void 0===e&&(e=I);var f=a.customize;return void 0===f&&(f=I),f({exports:'named',external:d,globals:{},name:b,plugins:e([generateAlias(c),progress(),json(),commonjs({extensions:['.js'],include:'node_modules/**',namedExports:{}}),buble(),resolve({jsnext:!0,main:!0}),cleanup({comments:'none'}),babili({})])})},bundle=function(a){var b=a.name,c=a.alias,d=a.external,e=a.input,f=a.output,g=a.alterPlugins;void 0===g&&(g=I);var h=a.customize;return void 0===h&&(h=I),h(Object.assign({},rollup({name:b,alias:c,external:d,alterPlugins:g,customize:I}),{input:e,output:f}))},t={plan:function(a){return expect.assertions(a)},is:function(c,a){return expect(c).toBe(a)},not:function(c,a){return expect(c).not.toBe(a)},deepEqual:function(c,a){return expect(c).toEqual(a)},notDeepEqual:function(c,a){return expect(c).not.toEqual(a)},truthy:function(a){return expect(a).toBeTruthy()},true:function(a){return expect(a).toBe(!0)},falsy:function(a){return expect(a).toBeFalsy()},false:function(a){return expect(a).toBe(!1)},throws:function(a,b){return expect(a).toThrow(b)}},version=version$1;export{version,build,rollup,bundle,t};