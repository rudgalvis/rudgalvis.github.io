const e=".preloader",t=".preloader--background-2",o=".preloader--jacket-gap-filler",a=".preloader--jacket",n=".preloader--left",d=".preloader--right",r=".preloader--button",i=".loader",l=document.querySelector(e),s=document.querySelector(t),u=document.querySelector(o),c=document.querySelector(a),p=c.querySelector(n),g=c.querySelector(d),m=document.querySelector(r),w=m.querySelector("img"),y=document.querySelector(i),b={buttonChangeY:0},h=Linear.easeNone,v=.7,S=2;let L;const C=()=>{L=gsap.timeline({paused:!0}).addLabel("reset").set(p,{x:void 0,ease:h}).set(g,{x:void 0,ease:h}).set(m,{x:void 0,ease:h}).set(c,{opacity:void 0,ease:h}).set(m,{top:void 0,ease:h}).set(y,{opacity:void 0,ease:h}).set(w,{rotate:"-90",ease:h}).set(y.firstElementChild,{width:void 0,ease:h}).set(s,{backgroundColor:void 0,ease:h}).addPause().addLabel("loadAndSpin").to(y.firstElementChild,{width:"100%",ease:h}).to(w,{rotate:"0",ease:h},"<").addLabel("finishLoading").to(y,{opacity:0,duration:v/3}).to(m,{top:b.buttonChangeY||null,duration:v},"<").to(c,{opacity:1,duration:v},"<").to(u,{x:"0",duration:v},"<").to(s,{backgroundColor:"transparent",duration:0}).call(()=>window.scrollTo(0,0)).addLabel("openCurtains").to(p,{x:"-100%",duration:v*S},"<").to(g,{x:"106%",duration:v*S},"<").to(u,{x:"100%",duration:v*S},"<").to(m,{x:.895*g.scrollWidth,duration:v*S},"<").to(l,{opacity:0,pointerEvents:"none",duration:0}).addLabel("end")};let q,x;const f=e=>{var t,o;L&&(x=1===e?(clearTimeout(q),L.tweenTo(L.labels.finishLoading,{duration:.3,ease:h,onComplete:()=>L.play()})):(clearTimeout(q),t=L.labels.loadAndSpin,o=L.labels.finishLoading,t=(1-e)*t+e*o,L.tweenTo(t,{ease:h,duration:3})))};let E=0,T=1;const k=e=>{clearTimeout(q),q=setTimeout(()=>{f(1)},4e3),E++,f(E/T)},A=()=>{const e=window.innerWidth/window.innerHeight;var t=37*e/100*window.innerHeight,o=window.innerHeight/2,t=o-t;(b.buttonChangeY=0)<t?(b.buttonChangeY=o-t,c.style.top=""):(c.style.top=t+"px",m.style.top="")},Y=()=>{document.querySelectorAll("[data-preload]").forEach(e=>{T++;let t;var o=e.getAttribute("src"),o=(t=o||getComputedStyle(e).backgroundImage.slice(5,-2),document.createElement("img"));o.src=t,o.addEventListener("load",e=>{k("image loaded")})})};A(),C(),Y(),window.addEventListener("resize",()=>{A(),C()}),window.addEventListener("load",()=>{k("on windows load")});