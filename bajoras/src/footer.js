const VIMEO_VIDEO_ID = 717479112

let player
let isFullscreen

const init = () => {
    const optoions = {
        id: VIMEO_VIDEO_ID,
        width: '100%',
        loop: true,
        quality: '1080p'
    };

    player = new Vimeo.Player('landing-video', optoions);

    player.ready().then(function () {
        player.element.addEventListener('fullscreenchange', onFullscreenChange);
        player.element.addEventListener('webkitfullscreenchange', onFullscreenChange);
    });
}


const onFullscreenChange = () => {
    isFullscreen = !isFullscreen

    if (isFullscreen) {
        player.play()
        player.element.style.pointerEvents = 'all'
    } else {
        player.element.style.pointerEvents = 'none'
        player.pause()
        player.setCurrentTime(0)
    }
}


// Initialize the player
init()

// Export
window.playLandingVideo = () => {
    // Get your full screen element
    const video = player.element
    const rfs = video.requestFullscreen || video.webkitRequestFullScreen || video.mozRequestFullScreen || video.msRequestFullscreen;
    rfs.call(video);
}