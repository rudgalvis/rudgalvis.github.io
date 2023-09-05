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
        if(posts.length === 0) {
            const igSectionEl = document.querySelector('.instagram-section')
            igSectionEl.parentElement.removeChild(igSectionEl)

            list.removeChild(prefab)
        } else {
            posts.forEach(post => {
                const postEl = prefab.cloneNode(true)
                postEl.style.backgroundImage = `url(${post.media_url})`
                list.appendChild(postEl)
            })
        }



    })
}
