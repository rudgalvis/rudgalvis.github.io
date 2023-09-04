(() => {
    setTimeout(() => {
        new Swiper('[data-swiper="hero"]', {
            // Optional parameters
            // loop: true,
            allowTouchMove: false,
            autoplay: {
                delay: 5000,
                stopOnLastSlide: true,
            },

            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            on: {
                init: function () {
                    if (window.innerWidth < 991) {
                        this.disable()
                        this.autoplay.stop()
                        console.log('stos??')
                    } else {
                        this.enable()
                        this.autoplay.start()
                    }
                },
                beforeResize: function () {
                    if (window.innerWidth < 991) {
                        this.slideTo(0)
                        this.disable()
                        this.autoplay.stop()
                    } else {
                        this.enable()
                        this.autoplay.start()
                    }
                }
            }
        })
    }, 5000)
})()