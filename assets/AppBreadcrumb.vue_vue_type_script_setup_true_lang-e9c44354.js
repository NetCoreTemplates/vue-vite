import{o as t,c as s,b as e,f as u,y as p,r as x,a as r,w as c,F as f,h as v,d as g,t as i}from"./index-e03d9f34.js";const y={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},w=e("path",{fill:"currentColor",d:"M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42Z"},null,-1),k=[w];function B(a,o){return t(),s("svg",y,[...k])}const C={name:"mdi-chevron-right",render:B},$={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},L=e("path",{fill:"currentColor",d:"M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z"},null,-1),b=[L];function M(a,o){return t(),s("svg",$,[...b])}const F={name:"mdi-home",render:M},H={class:"flex","aria-label":"Breadcrumb"},N={role:"list",class:"flex items-center sm:space-x-4 flex-wrap sm:flex-nowrap"},V={class:"text-gray-600 hover:text-gray-700"},Z=e("span",{class:"sr-only"},"Home",-1),A={class:"flex items-center"},D={class:"ml-1 sm:ml-4 sm:text-2xl text-gray-500 hover:text-gray-700"},E={class:"flex items-center"},R=["aria-current"],S=["aria-current"],z=u({__name:"AppBreadcrumb",props:{crumbs:{default:()=>[]},name:{},href:{},current:{type:Boolean,default:!0}},setup(a){const{current:o}=a,h=p(()=>o?"page":void 0);return(n,j)=>{const m=F,l=x("router-link"),_=C;return t(),s("nav",H,[e("ol",N,[e("li",null,[e("div",null,[r(l,{to:"/"},{default:c(()=>[e("a",V,[r(m,{class:"flex-shrink-0 h-10 w-10","aria-hidden":"true"}),Z])]),_:1})])]),(t(!0),s(f,null,v(n.crumbs,d=>(t(),s("li",null,[e("div",A,[r(_,{class:"flex-shrink-0 h-8 w-8 text-gray-400","aria-hidden":"true"}),r(l,{to:d.href},{default:c(()=>[e("a",D,i(d.name),1)]),_:2},1032,["to"])])]))),256)),e("li",null,[e("div",E,[r(_,{class:"flex-shrink-0 h-8 w-8 text-gray-400","aria-hidden":"true"}),n.href?(t(),g(l,{key:0,to:n.href},{default:c(()=>[e("a",{class:"ml-1 sm:ml-4 sm:text-2xl text-gray-500 hover:text-gray-700","aria-current":h.value},i(n.name),9,R)]),_:1},8,["to"])):(t(),s("span",{key:1,class:"ml-1 sm:ml-4 sm:text-3xl text-gray-700","aria-current":h.value},i(n.name),9,S))])])])])}}});export{z as _,C as a};