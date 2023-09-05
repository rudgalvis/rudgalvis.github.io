const POST_PREFAB_SELECTOR = '[data-prefab="instagram-post"]'

const getInstagramPosts = new Promise((res) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === xhr.DONE) {
            res(JSON.parse(xhr.response));
        }
    });

    xhr.open("GET", "https://instagram-fetcher.rudgalvis.com/bajoras/9");
    xhr.send();
})

const prefab = document.querySelector(POST_PREFAB_SELECTOR)

if (prefab) {
    const list = prefab.parentElement

    getInstagramPosts.then(posts => {
        console.log(posts)

        posts.forEach(post => {
            const postEl = prefab.cloneNode(true)
            postEl.style.backgroundImage = `url(${post.media_url})`
            list.appendChild(postEl)
        })

        list.removeChild(prefab)
    })
}
