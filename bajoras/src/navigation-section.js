/**
 * Selectors
 * */
const NAV_BLOCK_SELECTOR = '[data-navigation="block"]'
const NAV_LIST_SELECTOR = '[data-navigation="list"]'
const CLOSE_BUTTON_SELECTOR = '[data-navigation="close-button"]'
const OVERLAY_SELECTOR = '[data-navigation="overlay"]'
const SPACER_SELECTOR = '[data-navigation="spacer"]'
const VIDEO_PLAY_BUTTON_SELECTOR = '[data-play="landing-video"]'
const SECTION_CONNECTOR_SELECTOR = '.section-connector'

/**
 * Elements
 * */
const navigationBlocks = document.querySelectorAll(NAV_BLOCK_SELECTOR)
const navigationLists = document.querySelectorAll(NAV_LIST_SELECTOR)
const closeButtons = document.querySelectorAll(CLOSE_BUTTON_SELECTOR)
const overlay = document.querySelector(OVERLAY_SELECTOR)
const spacer = document.querySelector(SPACER_SELECTOR)
const playButton = document.querySelector(VIDEO_PLAY_BUTTON_SELECTOR)
const sectionConnector = document.querySelector(SECTION_CONNECTOR_SELECTOR)

const preventScroll = () => {
    document.body.style.height = window.innerHeight + 'px'
    document.body.style.overflow = 'hidden'
}

const enableScroll = () => {
    document.body.style.height = null
    document.body.style.overflow = null
}

/**
 * Logic
 * */
const newsletterSection = () => {
    let animationRunning = false
    const getThisNavBlock = (e) => e.closest(NAV_BLOCK_SELECTOR)
    const getThisNavList = (e) => e.querySelector(NAV_LIST_SELECTOR)
    const getThisCloseButton = (e) => e.querySelector(CLOSE_BUTTON_SELECTOR)
    const isOpen = (e) => +e.getAttribute('data-is-open') === 1
    const setOpen = (e, value) => e.setAttribute('data-is-open', value)

    const childrenScrollHeights = (el, exclude = []) => {
        let sum = 0
        el.childNodes.forEach(e => {
            if (!exclude.some(selector => el.querySelector(selector) === e)) {
                sum += e.scrollHeight
            }
        })

        return sum
    }

    const setClosedState = (el) => {
        console.log('setClosedState')
        el.style.maxHeight = childrenScrollHeights(el, [NAV_LIST_SELECTOR]) + 'px'
        getThisNavList(el).style.maxHeight = 0
        getThisNavList(el).style.opacity = 0
    }

    const setOpenState = (el) => {
        console.log('setOpenStates')
        el.style.opacity = 1
        el.style.maxHeight = childrenScrollHeights(el) + 'px'
        getThisNavList(el).style.maxHeight = getThisNavList(el).scrollHeight + 'px'
        getThisNavList(el).style.opacity = 1

        enableScroll()

        handleNavBlockClick(el)
    }

    const getSiblingBlock = (e) => {
        let res

        navigationBlocks.forEach(_e => {
            if (_e !== e) {
                res = _e
            }
        })

        return res
    }

    const ease = 'linear'
    const duration = .5

    // On block click
    const handleNavBlockClick = (el, force = false) => () => {
        if (window.innerWidth > 479 && !force) {
            return
        }

        // If block closed
        if ((!isOpen(el) && !animationRunning) || force) {
            window.scrollTo(0, 0, {behavior: 'smooth'})
            preventScroll()
            animationRunning = true

            setOpen(el, 1)

            // Pull in the overlay
            gsap.timeline({ease})
                .to(overlay, {y: '0%', duration: duration / 4})
                .to(spacer, {height: 0, duration: duration / 2}, '<')
                .to(sectionConnector, {opacity: 0, duration: duration / 2}, '<')
                .to(getSiblingBlock(el), {maxHeight: 0, opacity: 0}, '<')
                .to(getThisCloseButton(getSiblingBlock(el)), {opacity: 0, duration: duration / 4}, '<')
                // Expand inner
                .to(el, {
                    maxHeight: childrenScrollHeights(el),
                    paddingBottom: getThisCloseButton(el).scrollHeight,
                    delay: duration / 4
                })
                .to(getThisNavList(el), {
                    maxHeight: getThisNavList(el).scrollHeight,
                    opacity: 1
                }, '<')
                .to(getThisCloseButton(el), {y: '-3em', rotate: 180,}, '<')
                .call(() => animationRunning = false)
        }
    }

    // On close button click
    const handleCloseButtonClick = (el) => (ev) => {
        if (window.innerWidth > 479) {
            return
        }


        enableScroll()

        const parentBlock = getThisNavBlock(el)
        if (isOpen(parentBlock) && !animationRunning) {
            animationRunning = true

            // Do not trigger block click handler
            ev.stopPropagation()

            // Flag as closed
            setOpen(parentBlock, 0)

            gsap.timeline({ease})
                .to(el.parentElement, {
                    maxHeight: childrenScrollHeights(el.parentElement, [NAV_LIST_SELECTOR]),
                    paddingBottom: '2em'
                })
                .to(getThisCloseButton(el.parentElement), {y: '0', rotate: 0}, '<')
                .to(getThisNavList(el.parentElement), {
                    maxHeight: 0,
                    opacity: 0
                }, '<')
                .to(spacer, {height: '20em', duration: duration / 2, delay: duration / 2})
                .to(getSiblingBlock(el.parentElement), {
                    opacity: 1,
                    maxHeight: childrenScrollHeights(getSiblingBlock(el.parentElement), [NAV_LIST_SELECTOR])
                }, '<')
                .to(overlay, {y: '-100%', duration: duration / 4}, `-=${duration / 4 * 3}`)
                .to(sectionConnector, {opacity: 1, duration: duration / 2}, '<')
                .to(getThisCloseButton(getSiblingBlock(el.parentElement)), {opacity: 1, duration: duration / 4}, '<')
                .call(() => animationRunning = false)
        }

    }

    // On link click
    const handleLinkClick = (el) => (ev) => {
        if (window.innerWidth > 479) {
            return
        }


        ev.stopPropagation()

        // Perform action
        // Get this block close button element
        // Perform on close button click
    }

    // Calculate scrollHeights
    if (!window.calcScrollHeights) {
        window.calcScrollHeights = () => {
            const els = document.querySelectorAll('[data-scroll-height="-1"]')
            const childrenScrollHeights = (e) => {
                let sum = 0
                e.childNodes.forEach(e => sum += e.scrollHeight)
                return sum
            }
            els.forEach(e => e.setAttribute('data-scroll-height', childrenScrollHeights(e)))
        }
    }
    window.calcScrollHeights()

    // Add listeners to
    if (!window.registerEvent) {
        window.registerEvent = (el, event, callback) => {
            el.removeEventListener(event, callback)
            el.addEventListener(event, callback)
        }
    }

    navigationBlocks.forEach(e => {
        if (window.innerWidth < 479) {
            setClosedState(e)
        } else {
            setOpenState(e)
        }
    })

    // Navigation blocks -> fn - on block click
    navigationBlocks.forEach(e => registerEvent(e, 'click', handleNavBlockClick(e)))
    // Navigation list items -> fn - on link click
    navigationLists.forEach(e => registerEvent(e, 'click', handleLinkClick(e)))
    // Close buttons -> fn - on close button click
    closeButtons.forEach(e => registerEvent(e, 'click', handleCloseButtonClick(e)))

    registerEvent(playButton, 'click', window.playLandingVideo)
}

/**
 * Run
 * */
window.addEventListener('load', newsletterSection)

let lastRatio = window.innerWidth / window.innerHeight
window.addEventListener('resize', () => {
    const currentRatio = window.innerWidth / window.innerHeight

    if ((lastRatio > 1 && currentRatio < 1) || (lastRatio < 1 && currentRatio > 1) || lastRatio === -1) {
        newsletterSection()
    }

    lastRatio = currentRatio
})
