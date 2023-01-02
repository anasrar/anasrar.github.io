(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[195],{5739:function(e,t,r){"use strict";r.d(t,{r:function(){return H}});var n=r(2983),o=r(6143),l=r(7684);let[i,a]=(0,l.R)("Grid component was not found in tree");var s=r(2792),u=r(7076),d=Object.defineProperty,c=Object.getOwnPropertySymbols,f=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,m=(e,t,r)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,h=(e,t)=>{for(var r in t||(t={}))f.call(t,r)&&m(e,r,t[r]);if(c)for(var r of c(t))p.call(t,r)&&m(e,r,t[r]);return e};let b=(e,t)=>"content"===e?"auto":"auto"===e?"0px":e?`${100/(t/e)}%`:void 0,g=(e,t,r)=>r||"auto"===e||"content"===e?"unset":b(e,t),y=(e,t)=>{if(e)return"auto"===e||t?1:0},v=(e,t)=>0===e?0:e?`${100/(t/e)}%`:void 0,_=(e,t)=>void 0!==e?t.fn.size({size:e,sizes:t.spacing})/2:void 0;var x=(0,u.k)((e,{gutter:t,gutterXs:r,gutterSm:n,gutterMd:o,gutterLg:l,gutterXl:i,grow:a,offset:u,offsetXs:d,offsetSm:c,offsetMd:f,offsetLg:p,offsetXl:m,columns:x,span:w,xs:j,sm:O,md:D,lg:T,xl:C,order:E,orderXs:P,orderSm:k,orderMd:S,orderLg:L,orderXl:G})=>({col:h({boxSizing:"border-box",flexGrow:y(w,a),order:E,padding:_(t,e),marginLeft:v(u,x),flexBasis:b(w,x),flexShrink:0,width:"content"===w?"auto":void 0,maxWidth:g(w,x,a)},function({sizes:e,offsets:t,orders:r,theme:n,columns:o,gutters:l,grow:i}){return s.j1.reduce((a,s)=>(a[`@media (min-width: ${n.breakpoints[s]}px)`]={order:r[s],flexBasis:b(e[s],o),padding:_(l[s],n),flexShrink:0,width:"content"===e[s]?"auto":void 0,maxWidth:g(e[s],o,i),marginLeft:v(t[s],o),flexGrow:y(e[s],i)},a),{})}({sizes:{xs:j,sm:O,md:D,lg:T,xl:C},offsets:{xs:d,sm:c,md:f,lg:p,xl:m},orders:{xs:P,sm:k,md:S,lg:L,xl:G},gutters:{xs:r,sm:n,md:o,lg:l,xl:i},theme:e,columns:x,grow:a}))})),w=r(4006),j=Object.defineProperty,O=Object.getOwnPropertySymbols,D=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable,C=(e,t,r)=>t in e?j(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,E=(e,t)=>{for(var r in t||(t={}))D.call(t,r)&&C(e,r,t[r]);if(O)for(var r of O(t))T.call(t,r)&&C(e,r,t[r]);return e},P=(e,t)=>{var r={};for(var n in e)D.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&O)for(var n of O(e))0>t.indexOf(n)&&T.call(e,n)&&(r[n]=e[n]);return r};let k={},S=(0,n.forwardRef)((e,t)=>{let r=(0,o.N4)("GridCol",k,e),{children:l,span:i,offset:s,offsetXs:u,offsetSm:d,offsetMd:c,offsetLg:f,offsetXl:p,xs:m,sm:h,md:b,lg:g,xl:y,order:v,orderXs:_,orderSm:j,orderMd:O,orderLg:D,orderXl:T,className:C,id:S,unstyled:L}=r,G=P(r,["children","span","offset","offsetXs","offsetSm","offsetMd","offsetLg","offsetXl","xs","sm","md","lg","xl","order","orderXs","orderSm","orderMd","orderLg","orderXl","className","id","unstyled"]),z=a(),N=i||z.columns,{classes:M,cx:R}=x({gutter:z.gutter,gutterXs:z.gutterXs,gutterSm:z.gutterSm,gutterMd:z.gutterMd,gutterLg:z.gutterLg,gutterXl:z.gutterXl,offset:s,offsetXs:u,offsetSm:d,offsetMd:c,offsetLg:f,offsetXl:p,xs:m,sm:h,md:b,lg:g,xl:y,order:v,orderXs:_,orderSm:j,orderMd:O,orderLg:D,orderXl:T,grow:z.grow,columns:z.columns,span:N},{unstyled:L,name:"Grid"});return!("auto"===N||"content"===N||"number"==typeof N&&N>0&&N%1==0)||N>z.columns?null:n.createElement(w.x,E({className:R(M.col,C),ref:t},G),l)});S.displayName="@mantine/core/Col";var L=Object.defineProperty,G=Object.getOwnPropertySymbols,z=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable,M=(e,t,r)=>t in e?L(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,R=(e,t)=>{for(var r in t||(t={}))z.call(t,r)&&M(e,r,t[r]);if(G)for(var r of G(t))N.call(t,r)&&M(e,r,t[r]);return e},B=(0,u.k)((e,{justify:t,align:r,gutter:n,gutterXs:o,gutterSm:l,gutterMd:i,gutterLg:a,gutterXl:u})=>{var d,c;return{root:R({margin:-e.fn.size({size:n,sizes:e.spacing})/2,display:"flex",flexWrap:"wrap",justifyContent:t,alignItems:r},(d={xs:o,sm:l,md:i,lg:a,xl:u},c=e,s.j1.reduce((e,t)=>(void 0!==d[t]&&(e[`@media (min-width: ${c.breakpoints[t]}px)`]={margin:-c.fn.size({size:d[t],sizes:c.spacing})/2}),e),{})))}}),X=Object.defineProperty,A=Object.getOwnPropertySymbols,I=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable,W=(e,t,r)=>t in e?X(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Z=(e,t)=>{for(var r in t||(t={}))I.call(t,r)&&W(e,r,t[r]);if(A)for(var r of A(t))V.call(t,r)&&W(e,r,t[r]);return e},$=(e,t)=>{var r={};for(var n in e)I.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&A)for(var n of A(e))0>t.indexOf(n)&&V.call(e,n)&&(r[n]=e[n]);return r};let F={gutter:"md",justify:"flex-start",align:"stretch",columns:12},H=(0,n.forwardRef)((e,t)=>{let r=(0,o.N4)("Grid",F,e),{gutter:l,gutterXs:a,gutterSm:s,gutterMd:u,gutterLg:d,gutterXl:c,children:f,grow:p,justify:m,align:h,columns:b,className:g,id:y,unstyled:v}=r,_=$(r,["gutter","gutterXs","gutterSm","gutterMd","gutterLg","gutterXl","children","grow","justify","align","columns","className","id","unstyled"]),{classes:x,cx:j}=B({gutter:l,justify:m,align:h,gutterXs:a,gutterSm:s,gutterMd:u,gutterLg:d,gutterXl:c},{unstyled:v,name:"Grid"});return n.createElement(i,{value:{gutter:l,gutterXs:a,gutterSm:s,gutterMd:u,gutterLg:d,gutterXl:c,grow:p,columns:b}},n.createElement(w.x,Z({className:j(x.root,g),ref:t},_),f))});H.Col=S,H.displayName="@mantine/core/Grid"},64:function(e,t,r){"use strict";var n,o;e.exports=(null==(n=r.g.process)?void 0:n.env)&&"object"==typeof(null==(o=r.g.process)?void 0:o.env)?r.g.process:r(2121)},8887:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog",function(){return r(9295)}])},9295:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return x}});var n=r(7458),o=r(9989),l=r.n(o),i=r(4204),a=r(1911),s=r(554),u=r(6982),d=r(7231),c=r(5739),f=r(64);let p=l()(()=>r.e(700).then(r.bind(r,5700)).then(e=>e.Head),{loadableGenerated:{webpack:()=>[5700]}}),m=l()(()=>r.e(397).then(r.bind(r,5397)).then(e=>e.OpenGraph),{loadableGenerated:{webpack:()=>[5397]}}),h=l()(()=>r.e(441).then(r.bind(r,6441)).then(e=>e.LinkedDataJSON),{loadableGenerated:{webpack:()=>[6441]}}),b=l()(()=>Promise.resolve().then(r.bind(r,8072)).then(e=>e.A),{loadableGenerated:{webpack:()=>[8072]}}),g=l()(()=>r.e(812).then(r.bind(r,7136)).then(e=>e.BlogCard),{loadableGenerated:{webpack:()=>[7136]}}),y="Blog - Anas Rin",v="Mostly write all about programming, projects, and technology. I also post on DEV Community \uD83D\uDC69‍\uD83D\uDCBB\uD83D\uDC68‍\uD83D\uDCBB.",_=e=>{let{posts:t}=e,{pathname:r}=(0,i.useRouter)();return(0,n.jsxs)("main",{children:[(0,n.jsx)(p,{title:y,description:v}),(0,n.jsx)(m,{basic:{title:y,description:v,type:"website",image:"https://avatars.githubusercontent.com/u/38805204",url:"".concat(f.env.SITE_URL).concat(r,"/"),locale:"en_US",site_name:"Anas Rin"},data:null,twitter:{card:"summary",title:y,site:"@rrrriiiiiinnnn",description:v,image:"https://avatars.githubusercontent.com/u/38805204"}}),(0,n.jsx)(h,{data:{"@context":"https://schema.org","@type":"WebPage",name:y,description:v,publisher:{"@type":"ProfilePage",name:"Anas Rin"}}}),(0,n.jsx)(a.W,{size:"sm",p:"sm",pb:"xl",children:(0,n.jsxs)(s.K,{spacing:"lg",pt:"xl",children:[(0,n.jsxs)(s.K,{spacing:0,children:[(0,n.jsx)(u.D,{size:"h3",order:2,children:"Blog"}),(0,n.jsxs)(d.x,{weight:600,size:"sm",color:"dimmed",children:["Mostly write all about programming, projects, and technology. I also post on"," ",(0,n.jsx)(b,{href:"//dev.to/anasrin",newTab:!0,children:"DEV Community \uD83D\uDC69‍\uD83D\uDCBB\uD83D\uDC68‍\uD83D\uDCBB"}),"."]})]}),(0,n.jsx)(c.r,{gutter:"lg",justify:"center",children:t.map((e,t)=>(0,n.jsx)(c.r.Col,{span:12,xs:6,children:(0,n.jsx)(g,{hideTumbnail:!0,...e})},t))})]})})]})};var x=!0;t.default=_},1205:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){let r=l.default,o=(null==t?void 0:t.suspense)?{}:{loading(e){let{error:t,isLoading:r,pastDelay:n}=e;return null}};if(e instanceof Promise?o.loader=()=>e:"function"==typeof e?o.loader=e:"object"==typeof e&&(o=n({},o,e)),(o=n({},o,t)).suspense&&(delete o.ssr,delete o.loading),o.loadableGenerated&&delete(o=n({},o,o.loadableGenerated)).loadableGenerated,"boolean"==typeof o.ssr&&!o.suspense){if(!o.ssr)return delete o.ssr,i(r,o);delete o.ssr}return r(o)},t.noSSR=i;var n=r(834).Z,o=r(1997).Z,l=(o(r(2983)),o(r(1828)));function i(e,t){return delete t.webpack,delete t.modules,e(t)}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1836:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LoadableContext=void 0;var n=(0,r(1997).Z)(r(2983));let o=n.default.createContext(null);t.LoadableContext=o},1828:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(834).Z,o=(0,r(792).Z)(r(2983)),l=r(1836);let i=[],a=[],s=!1;function u(e){let t=e(),r={loading:!0,loaded:null,error:null};return r.promise=t.then(e=>(r.loading=!1,r.loaded=e,e)).catch(e=>{throw r.loading=!1,r.error=e,e}),r}class d{promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state=n({},this._state,{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading},e),this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}}function c(e){return function(e,t){let r=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null,suspense:!1},t);r.suspense&&(r.lazy=o.default.lazy(r.loader));let i=null;function u(){if(!i){let t=new d(e,r);i={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return i.promise()}if(!s){let c=r.webpack?r.webpack():r.modules;c&&a.push(e=>{for(let t of c)if(-1!==e.indexOf(t))return u()})}function f(){u();let e=o.default.useContext(l.LoadableContext);e&&Array.isArray(r.modules)&&r.modules.forEach(t=>{e(t)})}let p=r.suspense?function(e,t){return f(),o.default.createElement(r.lazy,n({},e,{ref:t}))}:function(e,t){f();let n=o.useSyncExternalStore(i.subscribe,i.getCurrentValue,i.getCurrentValue);return o.default.useImperativeHandle(t,()=>({retry:i.retry}),[]),o.default.useMemo(()=>{var t;return n.loading||n.error?o.default.createElement(r.loading,{isLoading:n.loading,pastDelay:n.pastDelay,timedOut:n.timedOut,error:n.error,retry:i.retry}):n.loaded?o.default.createElement((t=n.loaded)&&t.__esModule?t.default:t,e):null},[e,n])};return p.preload=()=>u(),p.displayName="LoadableComponent",o.default.forwardRef(p)}(u,e)}function f(e,t){let r=[];for(;e.length;){let n=e.pop();r.push(n(t))}return Promise.all(r).then(()=>{if(e.length)return f(e,t)})}c.preloadAll=()=>new Promise((e,t)=>{f(i).then(e,t)}),c.preloadReady=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return new Promise(t=>{let r=()=>(s=!0,t());f(a,e).then(r,r)})},window.__NEXT_PRELOADREADY=c.preloadReady,t.default=c},2121:function(e){!function(){var t={229:function(e){var t,r,n,o=e.exports={};function l(){throw Error("setTimeout has not been defined")}function i(){throw Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===l||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:l}catch(e){t=l}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(n){r=i}}();var s=[],u=!1,d=-1;function c(){u&&n&&(u=!1,n.length?s=n.concat(s):d=-1,s.length&&f())}function f(){if(!u){var e=a(c);u=!0;for(var t=s.length;t;){for(n=s,s=[];++d<t;)n&&n[d].run();d=-1,t=s.length}n=null,u=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(n){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];s.push(new p(e,t)),1!==s.length||u||a(f)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw Error("process.chdir is not supported")},o.umask=function(){return 0}}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var l=r[e]={exports:{}},i=!0;try{t[e](l,l.exports,n),i=!1}finally{i&&delete r[e]}return l.exports}n.ab="//";var o=n(229);e.exports=o}()},9989:function(e,t,r){e.exports=r(1205)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8887)}),_N_E=e.O()}]);