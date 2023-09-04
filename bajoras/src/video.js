run = () => {
    let running = false
    const contactButton = document.querySelector('.contact-us-button')

    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 991) {
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
                if (!running) {
                    running = true

                    const clear = () => {
                        running = false
                        contactButton.style.animation = null
                        contactButton.removeEventListener('animationend', clear)
                    }

                    contactButton.addEventListener('animationend', clear)
                    contactButton.style.animation = 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both'
                }
            }
        }
    })
}

window.addEventListener('load', run)