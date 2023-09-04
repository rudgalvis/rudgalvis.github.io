const NAV_BLOCK_SELECTOR='[data-navigation="block"]',NAV_LIST_SELECTOR='[data-navigation="list"]',CLOSE_BUTTON_SELECTOR='[data-navigation="close-button"]',OVERLAY_SELECTOR='[data-navigation="overlay"]',SPACER_SELECTOR='[data-navigation="spacer"]',VIDEO_PLAY_BUTTON_SELECTOR='[data-play="landing-video"]',SECTION_CONNECTOR_SELECTOR=".section-connector",navigationBlocks=document.querySelectorAll(NAV_BLOCK_SELECTOR),navigationLists=document.querySelectorAll(NAV_LIST_SELECTOR),closeButtons=document.querySelectorAll(CLOSE_BUTTON_SELECTOR),overlay=document.querySelector(OVERLAY_SELECTOR),spacer=document.querySelector(SPACER_SELECTOR),playButton=document.querySelector(VIDEO_PLAY_BUTTON_SELECTOR),sectionConnector=document.querySelector(SECTION_CONNECTOR_SELECTOR),preventScroll=()=>{document.body.style.height=window.innerHeight+"px",document.body.style.overflow="hidden"},enableScroll=()=>{document.body.style.height=null,document.body.style.overflow=null},newsletterSection=()=>{let n=!1;const i=t=>t.querySelector(NAV_LIST_SELECTOR),a=t=>t.querySelector(CLOSE_BUTTON_SELECTOR),l=t=>1==+t.getAttribute("data-is-open"),r=(t,e)=>t.setAttribute("data-is-open",e),c=(o,t=[])=>{let n=0;return o.childNodes.forEach(e=>{t.some(t=>o.querySelector(t)===e)||(n+=e.scrollHeight)}),n},d=e=>{let o;return navigationBlocks.forEach(t=>{t!==e&&(o=t)}),o},s="linear",E=.5,o=(t,e=!1)=>()=>{479<window.innerWidth&&!e||(l(t)||n)&&!e||(window.scrollTo(0,0,{behavior:"smooth"}),preventScroll(),n=!0,r(t,1),gsap.timeline({ease:s}).to(overlay,{y:"0%",duration:E/4}).to(spacer,{height:0,duration:E/2},"<").to(sectionConnector,{opacity:0,duration:E/2},"<").to(d(t),{maxHeight:0,opacity:0},"<").to(a(d(t)),{opacity:0,duration:E/4},"<").to(t,{maxHeight:c(t),paddingBottom:a(t).scrollHeight,delay:E/4}).to(i(t),{maxHeight:i(t).scrollHeight,opacity:1},"<").to(a(t),{y:"-3em",rotate:180},"<").call(()=>n=!1))},e=o=>t=>{var e;479<window.innerWidth||(enableScroll(),e=o.closest(NAV_BLOCK_SELECTOR),l(e)&&!n&&(n=!0,t.stopPropagation(),r(e,0),gsap.timeline({ease:s}).to(o.parentElement,{maxHeight:c(o.parentElement,[NAV_LIST_SELECTOR]),paddingBottom:"2em"}).to(a(o.parentElement),{y:"0",rotate:0},"<").to(i(o.parentElement),{maxHeight:0,opacity:0},"<").to(spacer,{height:"20em",duration:E/2,delay:E/2}).to(d(o.parentElement),{opacity:1,maxHeight:c(d(o.parentElement),[NAV_LIST_SELECTOR])},"<").to(overlay,{y:"-100%",duration:E/4},"-="+E/4*3).to(sectionConnector,{opacity:1,duration:E/2},"<").to(a(d(o.parentElement)),{opacity:1,duration:E/4},"<").call(()=>n=!1)))};window.calcScrollHeights||(window.calcScrollHeights=()=>{var t=document.querySelectorAll('[data-scroll-height="-1"]');t.forEach(t=>t.setAttribute("data-scroll-height",(t=>{let e=0;return t.childNodes.forEach(t=>e+=t.scrollHeight),e})(t)))}),window.calcScrollHeights(),window.registerEvent||(window.registerEvent=(t,e,o)=>{t.removeEventListener(e,o),t.addEventListener(e,o)}),navigationBlocks.forEach(t=>{var e;window.innerWidth<479?((e=t).style.maxHeight=c(e,[NAV_LIST_SELECTOR])+"px",i(e).style.maxHeight=0,i(e).style.opacity=0):((e=t).style.opacity=1,e.style.maxHeight=c(e)+"px",i(e).style.maxHeight=i(e).scrollHeight+"px",i(e).style.opacity=1,enableScroll(),o(e))}),navigationBlocks.forEach(t=>registerEvent(t,"click",o(t))),navigationLists.forEach(t=>registerEvent(t,"click",t=>{479<window.innerWidth||t.stopPropagation()})),closeButtons.forEach(t=>registerEvent(t,"click",e(t))),registerEvent(playButton,"click",window.playLandingVideo)};window.addEventListener("load",newsletterSection);let lastRatio=window.innerWidth/window.innerHeight;window.addEventListener("resize",()=>{var t=window.innerWidth/window.innerHeight;(1<lastRatio&&t<1||lastRatio<1&&1<t||-1===lastRatio)&&newsletterSection(),lastRatio=t});