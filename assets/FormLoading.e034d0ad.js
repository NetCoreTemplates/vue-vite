import{e as b,b as u,d as l,M as y,L as g,o as n,c as o,a as r,m as f,f as d,C as c,h,q as x}from"./vendor.0d495957.js";const v={class:"relative flex items-start"},_={class:"flex items-center h-5"},C=["id","name"],N={class:"ml-3 text-sm"},L=["for"],w={key:0,class:"mt-2 text-sm text-red-500",id:"`${id}-error`"},M={key:1,class:"mt-2 text-sm text-gray-500",id:"`${id}-description`"},A=b({props:{status:null,id:null,label:null,help:null},setup(e){const t=e,s=u(()=>{var i;return(i=t.label)!=null?i:l.humanize(l.toPascalCase(t.id))}),m=u(()=>l.omit(y(),[...Object.keys(t)]));let a=g("ApiState",void 0);const p=u(()=>{var i;return l.errorResponse.call({responseStatus:(i=t.status)!=null?i:a==null?void 0:a.error.value},t.id)});return(i,S)=>(n(),o("div",v,[r("div",_,[r("input",f({id:e.id,name:e.id,type:"checkbox",value:"true",class:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"},d(m)),null,16,C)]),r("div",N,[r("label",{for:e.id,class:"font-medium text-gray-700 select-none"},c(d(s)),9,L),d(p)?(n(),o("p",w,c(d(p)),1)):e.help?(n(),o("p",M,c(e.help),1)):h("",!0)])]))}}),T={key:0,class:"flex",title:"loading..."},X={key:0,xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",width:"24px",height:"30px",viewBox:"0 0 24 30"},k=x('<rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate></rect>',3),$=[k],B={class:"ml-2 mt-1 text-gray-400"},V=b({props:{loading:{type:Boolean},icon:{type:Boolean,default:!0},text:{default:"loading..."}},setup(e){const t=e;let s=g("ApiState",void 0),m=u(()=>{var a;return(a=t.loading)!=null?a:s==null?void 0:s.loading.value});return(a,p)=>d(m)?(n(),o("div",T,[e.icon?(n(),o("svg",X,$)):h("",!0),r("span",B,c(e.text),1)])):h("",!0)}});export{A as _,V as a};
