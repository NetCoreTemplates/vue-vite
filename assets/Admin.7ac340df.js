import{o as a,c as o,a as e,e as h,f as t,j as g,w as d,h as v,k as m,C as i,D as y,F as j,l as k}from"./vendor.0d495957.js";import{_ as A}from"./AppPage.d3be4a97.js";import{a as u,s as $,b as w}from"./index.436d083a.js";import"./AppBreadcrumb.3fc4e167.js";const B={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},C=e("path",{d:"M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4m0 4a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m5.13 12A9.69 9.69 0 0 1 12 20.92A9.69 9.69 0 0 1 6.87 17c-.34-.5-.63-1-.87-1.53c0-1.65 2.71-3 6-3s6 1.32 6 3c-.24.53-.53 1.03-.87 1.53z",fill:"currentColor"},null,-1),N=[C];function V(_,s){return a(),o("svg",B,N)}var b={name:"mdi-shield-account",render:V};const M={class:"flex flex-col items-center justify-center"},S={class:"mt-2"},D=k("Sign Out"),E=h({setup(_){var r,c;const s=u.value,p=(c=(r=u.value)==null?void 0:r.roles)!=null?c:[];return(f,l)=>{const x=b;return t(s)?(a(),g(A,{key:0,title:"Admin Page",class:"max-w-prose flex justify-center"},{default:d(()=>[e("div",M,[m(x,{class:"w-36 h-36 text-gray-700"}),e("div",null,i(t(s).displayName),1),e("div",null,i(t(s).userName),1),e("div",S,[(a(!0),o(j,null,y(t(p),n=>(a(),o("span",{key:n,class:"ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800"},i(n),1))),128))]),m(w,{class:"mt-8",onClick:l[0]||(l[0]=n=>t($)(f.$router,"/admin"))},{default:d(()=>[D]),_:1})])]),_:1})):v("",!0)}}});export{E as default};
