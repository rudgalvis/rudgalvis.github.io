const POST_PREFAB_SELECTOR='[data-prefab="instagram-post"]',getInstagramPosts=new Promise(e=>{const t=new XMLHttpRequest;t.addEventListener("readystatechange",()=>{t.readyState===t.DONE&&e(JSON.parse(t.response))}),t.open("GET","https://instagram-fetcher.rudgalvis.com/bajoras/9"),t.send()}),prefab=document.querySelector(POST_PREFAB_SELECTOR);if(prefab){const c=prefab.parentElement;getInstagramPosts.then(e=>{var t;0===e.length?((t=document.querySelector(".instagram-section")).parentElement.removeChild(t),c.removeChild(prefab)):e.forEach(e=>{var t=prefab.cloneNode(!0);t.style.backgroundImage=`url(${e.media_url})`,c.appendChild(t)})})}