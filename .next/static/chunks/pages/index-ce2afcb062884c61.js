(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[332,679],{1604:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>c});var r=a(7876),s=a(4232);a(7328);var i=a(6603),l=a(8847);let n=a.n(l)()(()=>Promise.all([a.e(27),a.e(644)]).then(a.bind(a,4644)),{loadableGenerated:{webpack:()=>[4644]},ssr:!1}),o=[{value:20,label:"Years of Experience working with Data"},{value:30,label:"Years of Domain Experience Across Healthcare"},{value:10,label:"Years of Domain Experience in Manufacturing & Financial Services"}],c=function(e){let t=(0,s.useRef)(null),l=(0,s.useRef)([]);return(0,s.useEffect)(()=>{let e=async()=>{let e=(await Promise.all([a.e(742),a.e(941)]).then(a.bind(a,6941))).default,r=(await a.e(276).then(a.t.bind(a,6276,23))).ScrollTrigger;e.registerPlugin(r),t.current&&e.fromTo(t.current,{y:50,opacity:0},{y:0,opacity:1,duration:1,ease:"power3.out",scrollTrigger:{trigger:t.current,start:"top 85%",toggleActions:"play none none reverse"}}),l.current.forEach((t,a)=>{t&&e.fromTo(t,{y:20,opacity:0},{y:0,opacity:1,duration:.4,ease:"power3.out",scrollTrigger:{trigger:t,start:"top 90%",toggleActions:"play none none reverse"},delay:.1*a})})};setTimeout(()=>{e()},100)},[]),(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(i.A,{children:(0,r.jsx)("section",{id:"Experience",className:"w-full px-6 py-16 text-gray-800 dark:text-gray-100","aria-labelledby":"experience-heading",children:(0,r.jsxs)("div",{className:"mx-auto",children:[(0,r.jsx)("h2",{id:"experience-heading",ref:t,className:"text-4xl md:text-5xl font-afacad font-bold mb-10 text-black/70 dark:text-white",children:"We Have the Right Team"}),(0,r.jsx)("div",{className:"grid gap-8 mx-4 grid-cols-1 md:grid-cols-3",children:o.map((e,t)=>(0,r.jsxs)("div",{ref:e=>l.current[t]=e,className:"p-6 hover:shadow-lg transition duration-300 border-x hover:bg-black/40",children:[(0,r.jsx)(n,{from:0,to:e.value,separator:",",direction:"up",duration:1,className:"text-5xl font-bebas_neue_r dark:text-white/50 text-black/90 mb-4"}),(0,r.jsx)("p",{className:"text-lg font-Poppins text-gray-700 dark:text-gray-200",children:e.label})]},t))})]})})})})}},2898:(e,t,a)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(7428)}])},3679:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>s});var r=a(7876);let s=e=>{let{text:t,disabled:a=!1,speed:s=5,className:i=""}=e;return(0,r.jsx)("div",{className:"shiny-text ".concat(a?"disabled":""," ").concat(i),style:{animationDuration:"".concat(s,"s")},children:t})}},5024:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>d});var r=a(7876),s=a(4232);a(7328);var i=a(8230),l=a.n(i),n=a(3834),o=a(6603),c=a(7398);function d(){let[e,t]=(0,s.useState)([]),[i,d]=(0,s.useState)(!0),u=(0,s.useRef)(null);(0,s.useEffect)(()=>{(async()=>{try{let e=(await c.A.getService()).documents.map(e=>({...e,points:JSON.parse(e.points)}));t(e)}catch(e){console.log(e)}finally{d(!1)}})()}),console.log(e);let p=(0,s.useRef)(null),f=(0,s.useRef)(null),m=(0,s.useRef)([]),[x,g]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{g(!0)},[]),(0,s.useEffect)(()=>{if(!x)return;let t=async()=>{let t=(await Promise.all([a.e(742),a.e(941)]).then(a.bind(a,6941))).default,r=(await a.e(276).then(a.t.bind(a,6276,23))).ScrollTrigger;return t.registerPlugin(r),m.current=m.current.slice(0,e.length),p.current&&t.fromTo(p.current,{opacity:0,y:20},{opacity:1,y:0,duration:.8,scrollTrigger:{trigger:u.current,start:"top 80%",toggleActions:"play none none none"}}),f.current&&m.current.length>0&&t.fromTo(m.current.filter(Boolean),{opacity:0,y:30},{opacity:1,y:0,duration:.6,stagger:.1,ease:"power2.out",scrollTrigger:{trigger:f.current,start:"top 80%",toggleActions:"play none none none"}}),()=>{r.getAll().forEach(e=>e.kill())}};setTimeout(()=>{t()},100)},[x]),(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{ref:u,className:"w-full py-16 relative overflow-hidden",children:[(0,r.jsx)("div",{className:"absolute inset-0 bg-gradient-to-br from-white to-purple-50/10 dark:hidden"}),(0,r.jsx)("div",{className:"absolute inset-0 bg-gradient-to-br from-black to-purple-900/10 hidden dark:block"}),(0,r.jsx)(o.A,{children:(0,r.jsx)("section",{id:"Services",className:"relative z-10","aria-labelledby":"analytics-services-heading",children:(0,r.jsxs)("div",{className:"flex flex-col xl:flex-row justify-between items-start gap-10 px-4 sm:px-6",children:[(0,r.jsxs)("h2",{id:"analytics-services-heading",ref:p,className:"text-3xl md:text-4xl xl:text-5xl font-afacad font-bold text-black dark:text-white xl:w-1/4 relative",children:["Advanced Analytics Services",(0,r.jsx)("span",{className:"absolute -bottom-3 left-0 w-16 h-1 bg-purple-400/70"})]}),(0,r.jsx)("div",{ref:f,className:"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 flex-1 w-full",children:e.map((e,t)=>(0,r.jsxs)("div",{ref:e=>m.current[t]=e,className:"rounded-2xl bg-white dark:bg-gray-900 px-6 py-8 flex flex-col justify-between shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 group",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"uppercase text-md font-bold text-black dark:text-white font-afacad mb-4",children:e.title}),(0,r.jsx)("ul",{className:"text-gray-700 dark:text-gray-300 font-afacad space-y-2 mb-6",children:e.points.map((e,t)=>(0,r.jsxs)("li",{className:"flex items-start gap-2",children:[(0,r.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-purple-400/70 mt-2","aria-hidden":"true"}),(0,r.jsx)("span",{children:e.title})]},t))})]}),(0,r.jsxs)(l(),{href:"/services/".concat(e.$id),className:"text-sm font-afacad text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-2 border-t pt-4 border-gray-200 dark:border-gray-700 w-fit","aria-label":"Learn more about ".concat(e.title),children:[(0,r.jsx)("span",{className:"border-b border-purple-400/70",children:"Know more"}),(0,r.jsx)(n.A,{size:16,className:"group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform","aria-hidden":"true"})]})]},t))})]})})})]})})}},7428:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>d});var r=a(7876);a(4232);var s=a(8934),i=a(708),l=a(1604),n=a(8170),o=a(9297),c=a(5024);let d=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.default,{}),(0,r.jsx)(o.default,{}),(0,r.jsx)(l.default,{}),(0,r.jsx)(s.default,{}),(0,r.jsx)(c.default,{}),(0,r.jsx)(i.default,{})]})}},7685:(e,t,a)=>{"use strict";a.d(t,{l$:()=>ec,oR:()=>O});var r,s=a(4232);let i={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||i,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,d=(e,t)=>{let a="",r="",s="";for(let i in e){let l=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+l+";":r+="f"==i[1]?d(l,i):i+"{"+d(l,"k"==i[1]?"":t)+"}":"object"==typeof l?r+=d(l,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=l&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,l):i+":"+l+";")}return a+(t&&s?t+"{"+s+"}":s)+r},u={},p=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+p(e[a]);return t}return e},f=(e,t,a,r,s)=>{let i=p(e),l=u[i]||(u[i]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(i));if(!u[l]){let t=i!==e?e:(e=>{let t,a,r=[{}];for(;t=n.exec(e.replace(o,""));)t[4]?r.shift():t[3]?(a=t[3].replace(c," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(c," ").trim();return r[0]})(e);u[l]=d(s?{["@keyframes "+l]:t}:t,a?"":"."+l)}let f=a&&u.g?u.g:null;return a&&(u.g=u[l]),((e,t,a,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=a?e+t.data:t.data+e)})(u[l],t,r,f),l},m=(e,t,a)=>e.reduce((e,r,s)=>{let i=t[s];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function x(e){let t=this||{},a=e.call?e(t.p):e;return f(a.unshift?a.raw?m(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}x.bind({g:1});let g,h,b,y=x.bind({k:1});function v(e,t){let a=this||{};return function(){let r=arguments;function s(i,l){let n=Object.assign({},i),o=n.className||s.className;a.p=Object.assign({theme:h&&h()},n),a.o=/ *go\d+/.test(o),n.className=x.apply(a,r)+(o?" "+o:""),t&&(n.ref=l);let c=e;return e[0]&&(c=n.as||e,delete n.as),b&&c[0]&&b(n),g(c,n)}return t?t(s):s}}var w=e=>"function"==typeof e,j=(e,t)=>w(e)?e(t):e,k=(()=>{let e=0;return()=>(++e).toString()})(),N=(()=>{let e;return()=>{if(void 0===e&&"u">typeof window){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),E=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return E(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},T=[],S={toasts:[],pausedAt:void 0},A=e=>{S=E(S,e),T.forEach(e=>{e(S)})},P={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=(e={})=>{let[t,a]=(0,s.useState)(S),r=(0,s.useRef)(S);(0,s.useEffect)(()=>(r.current!==S&&a(S),T.push(a),()=>{let e=T.indexOf(a);e>-1&&T.splice(e,1)}),[]);let i=t.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||P[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...t,toasts:i}},C=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||k()}),D=e=>(t,a)=>{let r=C(t,e,a);return A({type:2,toast:r}),r.id},O=(e,t)=>D("blank")(e,t);O.error=D("error"),O.success=D("success"),O.loading=D("loading"),O.custom=D("custom"),O.dismiss=e=>{A({type:3,toastId:e})},O.remove=e=>A({type:4,toastId:e}),O.promise=(e,t,a)=>{let r=O.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?j(t.success,e):void 0;return s?O.success(s,{id:r,...a,...null==a?void 0:a.success}):O.dismiss(r),e}).catch(e=>{let s=t.error?j(t.error,e):void 0;s?O.error(s,{id:r,...a,...null==a?void 0:a.error}):O.dismiss(r)}),e};var $=(e,t)=>{A({type:1,toast:{id:e,height:t}})},R=()=>{A({type:5,time:Date.now()})},_=new Map,I=1e3,M=(e,t=I)=>{if(_.has(e))return;let a=setTimeout(()=>{_.delete(e),A({type:4,toastId:e})},t);_.set(e,a)},F=e=>{let{toasts:t,pausedAt:a}=z(e);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),r=t.map(t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(a<0){t.visible&&O.dismiss(t.id);return}return setTimeout(()=>O.dismiss(t.id),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[t,a]);let r=(0,s.useCallback)(()=>{a&&A({type:6,time:Date.now()})},[a]),i=(0,s.useCallback)((e,a)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:i}=a||{},l=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=l.findIndex(t=>t.id===e.id),o=l.filter((e,t)=>t<n&&e.visible).length;return l.filter(e=>e.visible).slice(...r?[o+1]:[0,o]).reduce((e,t)=>e+(t.height||0)+s,0)},[t]);return(0,s.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)M(e.id,e.removeDelay);else{let t=_.get(e.id);t&&(clearTimeout(t),_.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:$,startPause:R,endPause:r,calculateOffset:i}}},H=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,B=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,W=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Y=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,G=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Y} 1s linear infinite;
`,V=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,X=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,U=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${V} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${X} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Z=v("div")`
  position: absolute;
`,q=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,J=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${J} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Q=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(K,null,t):t:"blank"===a?null:s.createElement(q,null,s.createElement(G,{...r}),"loading"!==a&&s.createElement(Z,null,"error"===a?s.createElement(W,{...r}):s.createElement(U,{...r})))},ee=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,et=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ea=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,er=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,es=(e,t)=>{let a=e.includes("top")?1:-1,[r,s]=N()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ee(a),et(a)];return{animation:t?`${y(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ei=s.memo(({toast:e,position:t,style:a,children:r})=>{let i=e.height?es(e.position||t||"top-center",e.visible):{opacity:0},l=s.createElement(Q,{toast:e}),n=s.createElement(er,{...e.ariaProps},j(e.message,e));return s.createElement(ea,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof r?r({icon:l,message:n}):s.createElement(s.Fragment,null,l,n))});r=s.createElement,d.p=void 0,g=r,h=void 0,b=void 0;var el=({id:e,className:t,style:a,onHeightUpdate:r,children:i})=>{let l=s.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return s.createElement("div",{ref:l,className:t,style:a},i)},en=(e,t)=>{let a=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:N()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...r}},eo=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ec=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:i,containerStyle:l,containerClassName:n})=>{let{toasts:o,handlers:c}=F(a);return s.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},o.map(a=>{let l=a.position||t,n=en(l,c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return s.createElement(el,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?eo:"",style:n},"custom"===a.type?j(a.message,a):i?i(a):s.createElement(ei,{toast:a,position:l}))}))}},8170:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>v});var r=a(7876),s=a(4232),i=a(6941),l=a(3679),n=a(1338),o=a(9204),c=a(3623),d=a(5152),u=a(7212);function p(e){let{children:t,className:a="",onClick:i,mouseX:l,spring:u,distance:p,magnification:f,baseItemSize:m}=e,x=(0,s.useRef)(null),g=(0,n.d)(0),h=(0,o.G)(l,e=>{var t,a;return e-(null!=(a=null==(t=x.current)?void 0:t.getBoundingClientRect())?a:{x:0,width:m}).x-m/2}),b=(0,o.G)(h,[-p,0,p],[m,f,m]),y=(0,c.z)(b,u);return(0,r.jsx)(d.P.div,{ref:x,style:{width:y,height:y},onHoverStart:()=>g.set(1),onHoverEnd:()=>g.set(0),onFocus:()=>g.set(1),onBlur:()=>g.set(0),onClick:i,className:"relative inline-flex items-center justify-center rounded-full bg-[#060606] border-neutral-700 border-2 shadow-md ".concat(a),tabIndex:0,role:"button","aria-haspopup":"true",children:s.Children.map(t,e=>(0,s.cloneElement)(e,{isHovered:g}))})}function f(e){let{children:t,className:a="",...i}=e,{isHovered:l}=i,[n,o]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{let e=l.on("change",e=>{o(1===e)});return()=>e()},[l]),(0,r.jsx)(u.N,{children:n&&(0,r.jsx)(d.P.div,{initial:{opacity:0,y:0},animate:{opacity:1,y:-10},exit:{opacity:0,y:0},transition:{duration:.2},className:"".concat(a," absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060606] px-2 py-0.5 text-xs text-white"),role:"tooltip",style:{x:"-50%"},children:t})})}function m(e){let{children:t,className:a=""}=e;return(0,r.jsx)("div",{className:"flex items-center justify-center ".concat(a),children:t})}function x(e){let{items:t,className:a="",spring:i={mass:.1,stiffness:150,damping:12},magnification:l=70,distance:u=200,panelHeight:x=64,dockHeight:g=0,baseItemSize:h=50}=e,b=(0,n.d)(1/0),y=(0,n.d)(0),v=(0,s.useMemo)(()=>Math.max(g,l+l/2+4),[l,g]),w=(0,o.G)(y,[0,1],[x,v]),j=(0,c.z)(w,i);return(0,r.jsx)(d.P.div,{style:{height:j,scrollbarWidth:"none"},className:"mx-2 flex max-w-full items-center",children:(0,r.jsx)(d.P.div,{onMouseMove:e=>{let{pageX:t}=e;y.set(1),b.set(t)},onMouseLeave:()=>{y.set(0),b.set(1/0)},className:"".concat(a," absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 rounded-2xl  pb-2 px-4"),style:{height:x},role:"toolbar","aria-label":"Application dock",children:t.map((e,t)=>(0,r.jsxs)(p,{onClick:e.onClick,className:e.className,mouseX:b,spring:i,distance:u,magnification:l,baseItemSize:h,children:[(0,r.jsx)(m,{children:e.icon}),(0,r.jsx)(f,{children:e.label})]},t))})})}var g=a(5709),h=a(7396),b=a(1011),y=a(715);let v=function(){let e=(0,s.useRef)(null),t=(0,s.useRef)(null),a=e=>{let t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth"})},n=[{icon:(0,r.jsx)(g.A,{size:18}),label:"Offerings",onClick:()=>a("Offerings")},{icon:(0,r.jsx)(h.A,{size:18}),label:"Team",onClick:()=>a("Experience")},{icon:(0,r.jsx)(b.A,{size:18}),label:"Blogs",onClick:()=>a("Blogs")},{icon:(0,r.jsx)(y.A,{size:18}),label:"Services",onClick:()=>a("Services")}];return(0,s.useEffect)(()=>{i.gsap.timeline({defaults:{ease:"power3.out",duration:1.2}}).fromTo(e.current,{x:-100,opacity:0,filter:"blur(8px)"},{x:0,opacity:1,filter:"blur(0px)"}).fromTo(t.current,{x:-80,opacity:0,filter:"blur(8px)"},{x:0,opacity:1,filter:"blur(0px)"},"-=0.6")},[]),(0,r.jsxs)("section",{className:"relative w-full h-screen overflow-hidden",children:[(0,r.jsx)("video",{className:"absolute invert dark:invert-0 top-0 left-0 w-full h-full object-cover",src:"/assets/Video2.mp4",autoPlay:!0,muted:!0,playsInline:!0}),(0,r.jsx)("div",{className:"absolute backdrop-blur-sm inset-0 bg-black/40 dark:bg-black/50 z-0"}),(0,r.jsxs)("div",{className:"relative z-10 h-full flex flex-col justify-center mx-8 md:mx-16",children:[(0,r.jsx)("div",{ref:e,children:(0,r.jsx)(l.default,{text:"Inventiff Analytics",disabled:!1,speed:3,className:"text-xl md:text-xl font-bold mb-2 drop-shadow-md text-red-600 font-afacad"})}),(0,r.jsxs)("p",{ref:t,className:"text-slate-800 dark:text-slate-600 font-semibold text-6xl max-w-4xl drop-shadow-lg font-afacad",children:[(0,r.jsx)("span",{className:"dark:text-white/50",children:"Shaping"})," Tomorrow Through Cutting-Edge ",(0,r.jsx)("span",{className:"text-white/50",children:"Data Science"})," and"," ",(0,r.jsx)("span",{className:"text-white/50",children:"Artificial Intelligence"})," ","Solutions Tailored for Your"," ",(0,r.jsx)("span",{className:"text-white/50",children:"Success"}),"."]}),(0,r.jsx)(x,{items:n,panelHeight:68,baseItemSize:40,magnification:55})]}),(0,r.jsx)("div",{className:"absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-b from-transparent to-white/80 dark:to-black pointer-events-none"})]})}},9297:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>n});var r=a(7876),s=a(4232);a(7328);var i=a(6603);let l=[{title:"Project-Based Analytics",description:"Execute clearly scoped projects with defined deliverables. Our team develops comprehensive analytics solutions tailored to your business goals.",points:["Defined business problems and goals","End-to-end solution development","Milestone tracking and deliverable-focused","Best suited for projects with specific timelines and budgets"]},{title:"Analytics Services",description:"We offer dedicated analytics support to function either as a standalone team or as an extension of your internal analytics capability.",points:["Support for both ongoing and ad-hoc projects","Data profiling, model development, and reporting","Fast execution due to domain expertise","Flexible engagement models"]},{title:"Operationalizing Analytics",description:"We help validate and deploy statistical models into production, ensuring they meet business goals and maintain integrity.",points:["Model validation and integrity checks","Review for significant variables and predictive strength","Deployment of production-ready models","Ideal for teams with existing Data Science workflows"]}],n=function(){let e=(0,s.useRef)(null),t=(0,s.useRef)(null),[n,o]=(0,s.useState)(!1),[c,d]=(0,s.useState)(!1),u=(0,s.useRef)(null);return(0,s.useEffect)(()=>{d(!0)},[]),(0,s.useEffect)(()=>{let e;if(!c)return;let t=window.matchMedia("(min-width: 768px)"),a=()=>{o(!t.matches)};a();let r=()=>{clearTimeout(e),e=setTimeout(a,100)};return window.addEventListener("resize",r),()=>{window.removeEventListener("resize",r),clearTimeout(e)}},[c]),(0,s.useEffect)(()=>{if(!c)return;let r=async()=>{let r=(await Promise.all([a.e(742),a.e(941)]).then(a.bind(a,6941))).default,s=(await a.e(276).then(a.t.bind(a,6276,23))).ScrollTrigger;if(r.registerPlugin(s),u.current&&(u.current.forEach(e=>e.kill()),u.current=null),!n&&e.current&&t.current){let a=t.current.scrollHeight-e.current.clientHeight;u.current=[];let i=s.create({trigger:e.current,start:"top top",end:"+=".concat(a),pin:!0,pinSpacing:!0,anticipatePin:1,invalidateOnRefresh:!0}),l=r.to(t.current,{y:-a,ease:"none",scrollTrigger:{trigger:e.current,start:"top top",end:"+=".concat(a),scrub:.1,invalidateOnRefresh:!0}});u.current.push(i,l.scrollTrigger),setTimeout(()=>{s.refresh()},200)}};return setTimeout(()=>{r()},100),()=>{u.current&&(u.current.forEach(e=>e.kill()),u.current=null)}},[n,c]),(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("section",{id:"Offerings",className:"relative",children:(0,r.jsxs)(i.A,{children:[(0,r.jsx)("div",{className:"absolute inset-0 bg-gradient-to-br from-white to-purple-100 dark:hidden"}),(0,r.jsx)("div",{className:"absolute inset-0 bg-gradient-to-br from-black to-purple-900/30 hidden dark:block"}),(0,r.jsx)("section",{ref:e,className:"relative overflow-hidden backdrop-blur-sm","aria-labelledby":"offerings-heading",children:(0,r.jsxs)("div",{className:"flex flex-col md:flex-row md:h-screen",children:[(0,r.jsxs)("div",{className:"w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center transition",children:[(0,r.jsx)("h1",{id:"offerings-heading",className:"text-3xl md:text-5xl font-bold text-black dark:text-white mb-4 md:mb-6 drop-shadow-lg font-afacad transition-all",children:"Data Science Offerings"}),(0,r.jsx)("p",{className:"text-base font-Poppins md:text-lg text-gray-700 dark:text-gray-300",children:"Leverage your data to make smarter, faster business decisions. We offer flexible, scalable solutions tailored to your data science journey."})]}),(0,r.jsx)("div",{className:"w-full md:w-1/2",children:(0,r.jsx)("div",{ref:t,className:"flex flex-col gap-6 p-6 pb-10",style:{willChange:n?"auto":"transform",backfaceVisibility:"hidden",transform:"translateZ(0)"},children:l.map((e,t)=>(0,r.jsxs)("div",{className:"relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl hover:scale-105 transition-all p-6 text-left font-Poppins overflow-hidden",children:[(0,r.jsx)("h2",{className:"text-3xl font-afacad text-black dark:text-white mb-2",children:e.title}),(0,r.jsx)("p",{className:"text-gray-700 dark:text-gray-300 mb-4 font-Poppins",children:e.description}),(0,r.jsx)("ul",{className:"list-disc list-inside text-gray-600 font-Poppins dark:text-gray-400 space-y-1",children:e.points.map((e,t)=>(0,r.jsx)("li",{children:e},t))})]},t))})})]})})]})})})}}},e=>{var t=t=>e(e.s=t);e.O(0,[513,742,883,941,27,522,556,207,708,711,636,593,792],()=>t(2898)),_N_E=e.O()}]);