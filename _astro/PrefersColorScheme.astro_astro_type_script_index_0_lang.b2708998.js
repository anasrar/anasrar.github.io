/*! js-cookie v3.0.1 | MIT */function l(n){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var d in s)n[d]=s[d]}return n}var m={read:function(n){return n[0]==='"'&&(n=n.slice(1,-1)),n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(n){return encodeURIComponent(n).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function u(n,t){function s(o,i,e){if(!(typeof document>"u")){e=l({},t,e),typeof e.expires=="number"&&(e.expires=new Date(Date.now()+e.expires*864e5)),e.expires&&(e.expires=e.expires.toUTCString()),o=encodeURIComponent(o).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var r="";for(var c in e)e[c]&&(r+="; "+c,e[c]!==!0&&(r+="="+e[c].split(";")[0]));return document.cookie=o+"="+n.write(i,o)+r}}function d(o){if(!(typeof document>"u"||arguments.length&&!o)){for(var i=document.cookie?document.cookie.split("; "):[],e={},r=0;r<i.length;r++){var c=i[r].split("="),g=c.slice(1).join("=");try{var f=decodeURIComponent(c[0]);if(e[f]=n.read(g,f),o===f)break}catch{}}return o?e[o]:e}}return Object.create({set:s,get:d,remove:function(o,i){s(o,"",l({},i,{expires:-1}))},withAttributes:function(o){return u(this.converter,l({},this.attributes,o))},withConverter:function(o){return u(l({},this.converter,o),this.attributes)}},{attributes:{value:Object.freeze(t)},converter:{value:Object.freeze(n)}})}var p=u(m,{path:"/"});const a=document.querySelectorAll("[toggle-colorscheme]");for(const n of a)n.addEventListener("click",()=>{const t=document.documentElement.classList.contains("light");document.documentElement.classList.toggle("light"),p.set("colorscheme",t?"dark":"light",{expires:365})});const h=p.get("colorscheme")==="light";h&&document.documentElement.classList.add("light");export{p as a};
