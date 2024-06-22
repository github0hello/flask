"use strict";(self.webpackChunkamis_editor_demo=self.webpackChunkamis_editor_demo||[]).push([[7578],{27578:function(e,t,r){r.r(t),r.d(t,{default:function(){return O}});var n=r(87462),a=r(67294),o=r(70798),i=r(42063),l=r(92487),c=r(5513),s=function(){return a.createElement(i.TXS,{links:a.createElement(c.rU,{to:"/",className:"list-group-item"},a.createElement("i",{className:"fa fa-chevron-right text-muted"}),a.createElement("i",{className:"fa fa-fw fa-mail-forward m-r-xs"}),"去首页"),footerText:""})},p=r(63366),u=r(94578),f=r(67090),d=r(80129),m=r.n(d),y=["router","match","location","history","store","schema","jumpTo","updateLocation","embedMode"];function h(e,t,r){var c;void 0===r&&(r="page");var s=(c=function(o){function l(){for(var e,t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return(e=o.call.apply(o,[this].concat(r))||this).env=void 0,e}(0,u.Z)(l,o);var c=l.prototype;return c.getEnv=function(){var e=this;if(this.env)return this.env;var t=this.props,a=t.store,o=(0,f.dU)(a),l=function(t,r){if(/^\/api\//.test(t))return t;t=t||"";var n=e.props.history.location,a=m().parse(n.search.substring(1));(t=(0,i.hXT)(t.replace(/\$\$/g,m().stringify(a)),a))&&"#"===t[0]?t=n.pathname+n.search+t:t&&"?"===t[0]&&(t=n.pathname+t);var o=t.indexOf("?"),l=t.indexOf("#"),c=~o?t.substring(0,o):~l?t.substring(0,l):t,s=~o?t.substring(o,~l?l:void 0):"",p=~l?t.substring(l):r?n.hash:"";if(c){if("/"!=c[0]&&!/^\w+\:/.test(c)){var u,f=n.pathname.split("/");for(f.pop();u=/^\.\.?\//.exec(c);)"../"===u[0]&&f.pop(),c=c.substring(u[0].length);c=f.concat(c).join("/")}}else c=n.pathname;return c+s+p},c=function(t){var r=e.props.history,n=l(t),a=r.location,o=n,i="",c=n.indexOf("?");if(~c&&(o=n.substring(0,c),i=n.substring(c)),i){if(o!==a.pathname||!a.search)return!1;var s=m().parse(a.search.substring(1)),p=m().parse(i.substring(1));return Object.keys(p).every((function(e){return p[e]===s[e]}))}return o===a.pathname};return this.env=(0,n.Z)({},o,{session:r,isCurrentUrl:c,updateLocation:t.updateLocation||function(t,r){var n=e.props.history;return"goBack"===t?n.goBack():/^https?\:\/\//.test(t)?window.location.href=t:void n[r?"replace":"push"](l(t,r))},jumpTo:t.jumpTo||function(t,r){var n=e.props.history;if("goBack"===t)return n.goBack();t=l(t),c(t)||(r&&"url"===r.actionType?!1===r.blank?window.location.href=t:window.open(t,"_blank"):r&&r.blank?window.open(t,"_blank"):/^https?:\/\//.test(t)?window.location.href=t:n.push(t))},affixOffsetTop:t.embedMode?0:50})},c.render=function(){var r,o=this.props,l=(o.router,o.match),c=o.location,s=(o.history,o.store),u=o.schema,f=(o.jumpTo,o.updateLocation,o.embedMode,(0,p.Z)(o,y)),d=u||e;return d.type||(d=(0,n.Z)({},d,{type:"page"})),r=(0,i.sYA)(d,(0,n.Z)({data:i.P6Y.createObject((0,n.Z)({},l.params,{amisStore:s,pathname:c.pathname,params:l.params}))},f,{fetcher:s.fetcher,notify:s.notify,alert:s.alert,copy:s.copy,propsTransform:t,theme:s.theme}),this.getEnv()),a.createElement(a.Fragment,null,r)},l}(a.Component),c.displayName="SchemaRenderer",c);return s=function(e,t,r,n){var a,o=arguments.length,i=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var l=e.length-1;l>=0;l--)(a=e[l])&&(i=(o<3?a(i):o>3?a(t,r,i):a(t,r))||i);return o>3&&i&&Object.defineProperty(t,r,i),i}([(0,o.f3)("store"),o.Pi],s),(0,l.EN)(s)}var g=h({type:"page",body:"It works"}),b=["onConfirm","pages"],v=h({type:"dialog",title:"新增页面",body:{type:"form",controls:[{type:"text",label:"名称",name:"label",validations:{maxLength:20},required:!0},{type:"text",label:"路径",name:"path",validations:{isUrlPath:!0},required:!0,validate:function(e,t){return e.pages.filter((function(e){return e.path===t})).length?"当前路径已被占用，请换一个":""}},{type:"icon-picker",label:"图标",name:"icon"}]}},(function(e){var t=e.onConfirm,r=e.pages,a=(0,p.Z)(e,b);return(0,n.Z)({},a,{data:{pages:r},onConfirm:function(e){return t&&t(e[0])}})})),O=(0,o.f3)("store")((0,o.Pi)((function(e){var t,r,o=e.store,p=e.location,u=e.history;return a.createElement(i.Ar2,{aside:(t=o.pages.map((function(e){return{label:e.label,path:"/"+e.path,icon:e.icon}})),r=t.map((function(e){return e.path})),a.createElement(i.zot,{key:o.asideFolded?"folded-aside":"aside",navigations:[{label:"导航",children:t}],renderLink:function(e){var t=e.link,n=e.toggleExpand,l=e.classnames,s=e.depth;if(t.hidden)return null;var p=[];return t.children&&p.push(a.createElement("span",{key:"expand-toggle",className:l("AsideNav-itemArrow"),onClick:function(e){return n(t,e)}})),t.badge&&p.push(a.createElement("b",{key:"badge",className:l("AsideNav-itemBadge",t.badgeClassName||"bg-info")},t.badge)),t.icon?p.push(a.createElement("i",{key:"icon",className:l("AsideNav-itemIcon",t.icon)})):o.asideFolded&&1===s&&p.push(a.createElement("i",{key:"icon",className:l("AsideNav-itemIcon",t.children?"fa fa-folder":"fa fa-info")})),t.active||p.push(a.createElement("i",{key:"delete","data-tooltip":"删除","data-position":"bottom",className:"navbtn fa fa-times",onClick:function(e){e.preventDefault(),(0,i.iGu)("确认要删除").then((function(e){e&&o.removePageAt(r.indexOf(t.path))}))}})),p.push(a.createElement("i",{key:"edit","data-tooltip":"编辑","data-position":"bottom",className:"navbtn fa fa-pencil",onClick:function(e){e.preventDefault(),u.push("/edit/"+r.indexOf(t.path))}})),p.push(a.createElement("span",{key:"label",className:l("AsideNav-itemLabel")},t.label)),t.path?t.active?a.createElement("a",null,p):a.createElement(c.rU,{to:"/"===t.path[0]?t.path:""+t.path},p):a.createElement("a",{onClick:t.onClick?t.onClick:t.children?function(){return n(t)}:void 0},p)},isActive:function(e){return function(e,t){return!!(0,l.LX)(null==t?void 0:t.pathname,{path:e?e.replace(/\?.*$/,""):"",exact:!0,strict:!0})}(e.path&&"/"===e.path[0]?e.path:""+e.path,p)}})),header:a.createElement(a.Fragment,null,a.createElement("div",{className:"cxd-Layout-brandBar"},a.createElement("div",{className:"cxd-Layout-brand text-ellipsis"},a.createElement("i",{className:"fa fa-paw"}),a.createElement("span",{className:"hidden-folded m-l-sm"},"AMIS 示例"))),a.createElement("div",{className:"cxd-Layout-headerBar"},a.createElement("div",{className:"hidden-xs p-t-sm ml-auto px-2"},a.createElement(i.zxk,{size:"sm",className:"m-r-xs",level:"success",disabled:!0},"全部导出"),a.createElement(i.zxk,{size:"sm",level:"info",onClick:function(){return o.setAddPageIsOpen(!0)}},"新增页面")))),folded:o.asideFolded,offScreen:o.offScreen},a.createElement(l.rs,null,o.pages.map((function(e){return a.createElement(l.AW,{key:e.id,path:"/"+e.path,render:function(){return a.createElement(g,{schema:e.schema})}})})),a.createElement(l.AW,{component:s})),a.createElement(v,{show:o.addPageIsOpen,onClose:function(){return o.setAddPageIsOpen(!1)},onConfirm:function(e){o.addPage((0,n.Z)({},e,{schema:{type:"page",title:e.label,body:"这是你刚刚新增的页面。"}})),o.setAddPageIsOpen(!1)},pages:o.pages.concat()}))})))},55798:function(e){var t=String.prototype.replace,r=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return t.call(e,r,"+")},RFC3986:function(e){return String(e)}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},80129:function(e,t,r){var n=r(58261),a=r(55235),o=r(55798);e.exports={formats:o,parse:a,stringify:n}},55235:function(e,t,r){var n=r(12769),a=Object.prototype.hasOwnProperty,o={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:n.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},i=function(e,t,r){if(e){var n=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,o=/(\[[^[\]]*])/g,i=/(\[[^[\]]*])/.exec(n),l=i?n.slice(0,i.index):n,c=[];if(l){if(!r.plainObjects&&a.call(Object.prototype,l)&&!r.allowPrototypes)return;c.push(l)}for(var s=0;null!==(i=o.exec(n))&&s<r.depth;){if(s+=1,!r.plainObjects&&a.call(Object.prototype,i[1].slice(1,-1))&&!r.allowPrototypes)return;c.push(i[1])}return i&&c.push("["+n.slice(i.index)+"]"),function(e,t,r){for(var n=t,a=e.length-1;a>=0;--a){var o,i=e[a];if("[]"===i&&r.parseArrays)o=[].concat(n);else{o=r.plainObjects?Object.create(null):{};var l="["===i.charAt(0)&&"]"===i.charAt(i.length-1)?i.slice(1,-1):i,c=parseInt(l,10);r.parseArrays||""!==l?!isNaN(c)&&i!==l&&String(c)===l&&c>=0&&r.parseArrays&&c<=r.arrayLimit?(o=[])[c]=n:"__proto__"!==l&&(o[l]=n):o={0:n}}n=o}return n}(c,t,r)}};e.exports=function(e,t){var r=t?n.assign({},t):{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!=typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.ignoreQueryPrefix=!0===r.ignoreQueryPrefix,r.delimiter="string"==typeof r.delimiter||n.isRegExp(r.delimiter)?r.delimiter:o.delimiter,r.depth="number"==typeof r.depth?r.depth:o.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:o.arrayLimit,r.parseArrays=!1!==r.parseArrays,r.decoder="function"==typeof r.decoder?r.decoder:o.decoder,r.allowDots="boolean"==typeof r.allowDots?r.allowDots:o.allowDots,r.plainObjects="boolean"==typeof r.plainObjects?r.plainObjects:o.plainObjects,r.allowPrototypes="boolean"==typeof r.allowPrototypes?r.allowPrototypes:o.allowPrototypes,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:o.parameterLimit,r.strictNullHandling="boolean"==typeof r.strictNullHandling?r.strictNullHandling:o.strictNullHandling,""===e||null==e)return r.plainObjects?Object.create(null):{};for(var l="string"==typeof e?function(e,t){for(var r={},n=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,i=t.parameterLimit===1/0?void 0:t.parameterLimit,l=n.split(t.delimiter,i),c=0;c<l.length;++c){var s,p,u=l[c],f=u.indexOf("]="),d=-1===f?u.indexOf("="):f+1;-1===d?(s=t.decoder(u,o.decoder),p=t.strictNullHandling?null:""):(s=t.decoder(u.slice(0,d),o.decoder),p=t.decoder(u.slice(d+1),o.decoder)),a.call(r,s)?r[s]=[].concat(r[s]).concat(p):r[s]=p}return r}(e,r):e,c=r.plainObjects?Object.create(null):{},s=Object.keys(l),p=0;p<s.length;++p){var u=s[p],f=i(u,l[u],r);c=n.merge(c,f,r)}return n.compact(c)}},58261:function(e,t,r){var n=r(12769),a=r(55798),o={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},i=Array.isArray,l=Array.prototype.push,c=function(e,t){l.apply(e,i(t)?t:[t])},s=Date.prototype.toISOString,p={delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,serializeDate:function(e){return s.call(e)},skipNulls:!1,strictNullHandling:!1},u=function e(t,r,a,o,l,s,u,f,d,m,y,h){var g=t;if("function"==typeof u?g=u(r,g):g instanceof Date&&(g=m(g)),null===g){if(o)return s&&!h?s(r,p.encoder):r;g=""}if("string"==typeof g||"number"==typeof g||"boolean"==typeof g||n.isBuffer(g))return s?[y(h?r:s(r,p.encoder))+"="+y(s(g,p.encoder))]:[y(r)+"="+y(String(g))];var b,v=[];if(void 0===g)return v;if(i(u))b=u;else{var O=Object.keys(g);b=f?O.sort(f):O}for(var j=0;j<b.length;++j){var k=b[j];l&&null===g[k]||(i(g)?c(v,e(g[k],a(r,k),a,o,l,s,u,f,d,m,y,h)):c(v,e(g[k],r+(d?"."+k:"["+k+"]"),a,o,l,s,u,f,d,m,y,h)))}return v};e.exports=function(e,t){var r=e,l=t?n.assign({},t):{};if(null!==l.encoder&&void 0!==l.encoder&&"function"!=typeof l.encoder)throw new TypeError("Encoder has to be a function.");var s=void 0===l.delimiter?p.delimiter:l.delimiter,f="boolean"==typeof l.strictNullHandling?l.strictNullHandling:p.strictNullHandling,d="boolean"==typeof l.skipNulls?l.skipNulls:p.skipNulls,m="boolean"==typeof l.encode?l.encode:p.encode,y="function"==typeof l.encoder?l.encoder:p.encoder,h="function"==typeof l.sort?l.sort:null,g=void 0!==l.allowDots&&l.allowDots,b="function"==typeof l.serializeDate?l.serializeDate:p.serializeDate,v="boolean"==typeof l.encodeValuesOnly?l.encodeValuesOnly:p.encodeValuesOnly;if(void 0===l.format)l.format=a.default;else if(!Object.prototype.hasOwnProperty.call(a.formatters,l.format))throw new TypeError("Unknown format option provided.");var O,j,k=a.formatters[l.format];"function"==typeof l.filter?r=(j=l.filter)("",r):i(l.filter)&&(O=j=l.filter);var w,x=[];if("object"!=typeof r||null===r)return"";w=l.arrayFormat in o?l.arrayFormat:"indices"in l?l.indices?"indices":"repeat":"indices";var E=o[w];O||(O=Object.keys(r)),h&&O.sort(h);for(var A=0;A<O.length;++A){var N=O[A];d&&null===r[N]||c(x,u(r[N],N,E,f,d,m?y:null,j,h,g,b,k,v))}var C=x.join(s),P=!0===l.addQueryPrefix?"?":"";return C.length>0?P+C:""}},12769:function(e){var t=Object.prototype.hasOwnProperty,r=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),n=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)void 0!==e[n]&&(r[n]=e[n]);return r};e.exports={arrayToObject:n,assign:function(e,t){return Object.keys(t).reduce((function(e,r){return e[r]=t[r],e}),e)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var a=t[n],o=a.obj[a.prop],i=Object.keys(o),l=0;l<i.length;++l){var c=i[l],s=o[c];"object"==typeof s&&null!==s&&-1===r.indexOf(s)&&(t.push({obj:o,prop:c}),r.push(s))}return function(e){for(var t;e.length;){var r=e.pop();if(t=r.obj[r.prop],Array.isArray(t)){for(var n=[],a=0;a<t.length;++a)void 0!==t[a]&&n.push(t[a]);r.obj[r.prop]=n}}return t}(t)},decode:function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},encode:function(e){if(0===e.length)return e;for(var t="string"==typeof e?e:String(e),n="",a=0;a<t.length;++a){var o=t.charCodeAt(a);45===o||46===o||95===o||126===o||o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122?n+=t.charAt(a):o<128?n+=r[o]:o<2048?n+=r[192|o>>6]+r[128|63&o]:o<55296||o>=57344?n+=r[224|o>>12]+r[128|o>>6&63]+r[128|63&o]:(a+=1,o=65536+((1023&o)<<10|1023&t.charCodeAt(a)),n+=r[240|o>>18]+r[128|o>>12&63]+r[128|o>>6&63]+r[128|63&o])}return n},isBuffer:function(e){return null!=e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},merge:function e(r,a,o){if(!a)return r;if("object"!=typeof a){if(Array.isArray(r))r.push(a);else{if(!r||"object"!=typeof r)return[r,a];(o&&(o.plainObjects||o.allowPrototypes)||!t.call(Object.prototype,a))&&(r[a]=!0)}return r}if(!r||"object"!=typeof r)return[r].concat(a);var i=r;return Array.isArray(r)&&!Array.isArray(a)&&(i=n(r,o)),Array.isArray(r)&&Array.isArray(a)?(a.forEach((function(n,a){if(t.call(r,a)){var i=r[a];i&&"object"==typeof i&&n&&"object"==typeof n?r[a]=e(i,n,o):r.push(n)}else r[a]=n})),r):Object.keys(a).reduce((function(r,n){var i=a[n];return t.call(r,n)?r[n]=e(r[n],i,o):r[n]=i,r}),i)}}}}]);