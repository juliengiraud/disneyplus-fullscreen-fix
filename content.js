(() => {

    let fullscreenRequired = false
    let fullscreenButton = null
    let exitButtonClicked = false
    let lastUrl = location.href;

    function checkUrlChange() {
        const currentUrl = location.href
        if (currentUrl === lastUrl) {
            return
        }
        const oldEpisodeId = lastUrl.split('/').pop()
        const newEpisodeId = currentUrl.split('/').pop()
        lastUrl = currentUrl
        console.log('[Disney+ Fullscreen Fix] URL changed:', oldEpisodeId, '->', newEpisodeId)
        fullscreenButton = null
        // if (shouldRestoreFullscreen && !restoreInterval) {
        //     startRetrying('URL change');
        // }
    }

    function isFullscreen() {
        return !!(document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement);
    }

    function handleFullscreenChange() {
        if (isFullscreen()) {
            console.log("[Disney+ Fullscreen Fix] Enter fullscreen")
            // isWorkerOn = true
        } else {
            console.log("[Disney+ Fullscreen Fix] Exit fullscreen")
            // isWorkerOn = false
            if (exitButtonClicked) {
                console.log("[Disney+ Fullscreen Fix] Nothing to do")
                // exitButtonClicked = false
            } else {
                console.log("[Disney+ Fullscreen Fix] Will have to put back fullscreen")
            }
        }
    }

    function handleFullscreenButtonClick() {
        const isGoingToBeFullscreen = isFullscreen()
        if (isGoingToBeFullscreen) {
            console.log("[Disney+ Fullscreen Fix] Click to exit fullscreen")
            // fullscreenRequired = false
            // exitButtonClicked = true
        } else {
            console.log("[Disney+ Fullscreen Fix] Click to enter fullscreen")
            // fullscreenRequired = true
        }
    }

    function init() {
        if (fullscreenButton == null) {
            const shadowRoot = document.querySelector('toggle-fullscreen')?.shadowRoot
            fullscreenButton = shadowRoot?.querySelector('info-tooltip button')
            if (fullscreenButton != null) {
                console.log("[Disney+ Fullscreen Fix] worker listen to fullscreenButton", fullscreenButton)
                fullscreenButton.addEventListener('click', handleFullscreenButtonClick)
            }
        }
        checkUrlChange()
    }

    setInterval(() => {
        init()
        if (fullscreenRequired) {
            console.log("[Disney+ Fullscreen Fix] Startup worker ON", fullscreenRequired)
        } else {
            console.log("[Disney+ Fullscreen Fix] Startup worker OFF", fullscreenRequired)
            return
        }
        if (isFullscreen()) {
            console.log("[Disney+ Fullscreen Fix] Already in fullscreen => END")
            return
        }
        // const videoElement = document.querySelectorAll('disney-web-player video')[1]
        if (fullscreenButton == null) {
            console.log("[Disney+ Fullscreen Fix] Failed to restore fullscreen => END")
            return
        }
        // videoElement.requestFullscreen()
        console.log("[Disney+ Fullscreen Fix] Restored fullscreen => END", fullscreenButton)
    }, 1000)

    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', handleFullscreenChange);



    console.log('[Disney+ Fullscreen Fix] Extension loaded and monitoring')
})();
