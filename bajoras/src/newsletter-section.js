const NEWSLETTER_SELECTOR = '.newsletter-section--newsletter'
const TO_PAD_SELECTOR = '.newsletter-section'

const toPad = document.querySelector(TO_PAD_SELECTOR);

const newsletter = document.querySelectorAll(NEWSLETTER_SELECTOR);

const growCof = 100/54

const calculatePadding = () => {
    // Defaults to desktop
    let A = newsletter[0].clientHeight * growCof // newsletter final height
    const B = window.innerHeight // viewport
    const C = () => (A - B) / 2 + (A * .105) // overflow

    let tabletAddition = 0

    if(window.innerWidth < 991) { // Tablet
        A = newsletter[1].clientHeight * growCof // newsletter finale height
        tabletAddition = (A * .655)
    }

    if(window.innerWidth < 768) {
        toPad.style.marginBottom = 0 + 'px'
    } else if (toPad && C() > 0) {
        toPad.style.marginBottom = C() + tabletAddition + 'px'
    }
}

window.addEventListener('resize', calculatePadding)
window.addEventListener('load', calculatePadding)
