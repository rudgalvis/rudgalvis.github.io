const PRELOADER = '.preloader'
const BACKGROUND = '.preloader--background-2'
const JACKET_GAP_FILLER_SELECTOR = '.preloader--jacket-gap-filler'
const JACKET_SELECTOR = '.preloader--jacket'
const JACKET_LEFT_SELECTOR = '.preloader--left'
const JACKET_RIGHT_SELECTOR = '.preloader--right'
const BUTTON_SELECTOR = '.preloader--button'
const LOADER_SELECTOR = '.loader'

const preloader = document.querySelector(PRELOADER)
const background = document.querySelector(BACKGROUND)
const jacketGapFiller = document.querySelector(JACKET_GAP_FILLER_SELECTOR)
const jacket = document.querySelector(JACKET_SELECTOR)
const jacketLeft = jacket.querySelector(JACKET_LEFT_SELECTOR)
const jacketRight = jacket.querySelector(JACKET_RIGHT_SELECTOR)
const button = document.querySelector(BUTTON_SELECTOR)
const buttonImage = button.querySelector('img')
const loader = document.querySelector(LOADER_SELECTOR)

const config = {
    buttonChangeY: 0
}

const ease = Linear.easeNone
const duration = .7
const lastSegmentModifier = 2

let timeline

const calculateTimeline = () => {
    timeline = gsap.timeline({paused: true})
        .addLabel("reset")
        .set(jacketLeft, {x: undefined, ease})
        .set(jacketRight, {x: undefined, ease})
        .set(button, {x: undefined, ease})
        .set(jacket, {opacity: undefined, ease})
        .set(button, {top: undefined, ease})
        .set(loader, {opacity: undefined, ease})
        .set(buttonImage, {rotate: '-90', ease})
        .set(loader.firstElementChild, {width: undefined, ease})
        .set(background, {backgroundColor: undefined, ease})
        .addPause()
        .addLabel("loadAndSpin")
        .to(loader.firstElementChild, {width: '100%', ease})
        .to(buttonImage, {rotate: '0', ease}, '<')
        .addLabel("finishLoading")
        .to(loader, {opacity: 0, duration: duration / 3})
        .to(button, {top: (config.buttonChangeY || null), duration}, '<')
        .to(jacket, {opacity: 1, duration}, '<')
        .to(jacketGapFiller, {x: '0', duration}, '<')
        .to(background, {backgroundColor: 'transparent', duration: 0})
        .call(() => window.scrollTo(0, 0))
        .addLabel("openCurtains")
        .to(jacketLeft, {x: '-100%', duration: duration * lastSegmentModifier}, '<')
        .to(jacketRight, {x: '106%', duration: duration * lastSegmentModifier}, '<')
        .to(jacketGapFiller, {x: '100%', duration: duration * lastSegmentModifier}, '<')
        .to(button, {x: jacketRight.scrollWidth * .895, duration: duration * lastSegmentModifier}, '<')
        .to(preloader, {opacity: 0, pointerEvents: 'none', duration: 0})
        .addLabel("end")
}

let timeout
let tween
const setProgress = (percentage) => {
    if (timeline) {
        const lerp = (a, b, amount) => (1 - amount) * a + amount * b

        if (percentage === 1) {
            clearTimeout(timeout)
            tween = timeline.tweenTo(timeline.labels.finishLoading, {
                duration: .3,
                ease, onComplete: () => timeline.play()
            })
        } else {
            clearTimeout(timeout)
            const to = lerp(timeline.labels.loadAndSpin, timeline.labels.finishLoading, percentage)
            tween = timeline.tweenTo(to, {
                ease,
                duration: 3
            })
        }
    }
}

let loadsDone = 0
let loadsRequired = 1

const registerLoad = (event) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {setProgress(1)}, 4000) // Loader timeouts after 2000 of delay. Opens up the web afterwards

    loadsDone++

    setProgress(loadsDone / loadsRequired)
}

const initialise = () => {
    // Layout calculations
    const k = window.innerWidth / window.innerHeight

    const percentOfWhInPx = (value) => (value * k / 100) * window.innerHeight

    const x = percentOfWhInPx(37)
    const y = window.innerHeight / 2
    const z = y - x

    config.buttonChangeY = 0

    if (z > 0) { // Keep jacket stuck to the top, and find button sticking position
        config.buttonChangeY = y - z
        // button.style.top = `${config.buttonChangeY}px`
        jacket.style.top = ''
    } else { // Keep the button in the center in the screen
        jacket.style.top = `${z}px`
        button.style.top = ''
    }
}

const imageLoader = () => {
    const images = document.querySelectorAll('[data-preload]')

    images.forEach(e => {
        loadsRequired++

        let imageUrl
        const src = e.getAttribute('src')
        if (src) {
            imageUrl = src
        } else {
            const url = getComputedStyle(e).backgroundImage.slice(5, -2)
            imageUrl = url
        }

        let preloaderImg = document.createElement("img");
        preloaderImg.src = imageUrl;

        preloaderImg.addEventListener('load', (event) => {
            registerLoad('image loaded')
        });
    })
}

initialise()
calculateTimeline()
imageLoader()

window.addEventListener('resize', () => {
    initialise()
    calculateTimeline()
})

window.addEventListener('load', () => {
    registerLoad('on windows load')

    console.log({loadsRequired})
})




