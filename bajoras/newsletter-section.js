const e=".newsletter-section--newsletter",t=".newsletter-section",o=document.querySelector(t),r=document.querySelectorAll(e),d=100/54,n=()=>{let e=r[0].clientHeight*d;const t=window.innerHeight;var n=()=>(e-t)/2+.105*e;let i=0;window.innerWidth<991&&(e=r[1].clientHeight*d,i=.655*e),window.innerWidth<768?o.style.marginBottom="0px":o&&0<n()&&(o.style.marginBottom=n()+i+"px")};window.addEventListener("resize",n),window.addEventListener("load",n);