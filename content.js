(() => {

    let fullscreenRequired = false
    let fullscreenButton = null
    let lastUrl = location.href
    let lastClickOnButton = null

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
    }

    function isFullscreen() {
        return !!(document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement);
    }

    function handleFullscreenChange() {
        const oneSecondAgo = new Date(new Date().getTime() - 1000)
        const isUserInput = oneSecondAgo < lastClickOnButton
        if (isFullscreen()) {
            if (isUserInput) {
                console.log("[Disney+ Fullscreen Fix] User asked to enter fullscreen")
                fullscreenRequired = true
            } else {
                console.log("[Disney+ Fullscreen Fix] User Double click ???")
                fullscreenRequired = true
            }
        } else {
            if (isUserInput) {
                console.log("[Disney+ Fullscreen Fix] User asked to exit fullscreen")
                fullscreenRequired = false
            } else {
                console.log("[Disney+ Fullscreen Fix] Fullscreen lost")
            }
        }
    }

    function handleFullscreenButtonClick() {
        lastClickOnButton = new Date()
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
        } else {
            return
        }
        if (isFullscreen()) {
            return
        }
        if (fullscreenButton == null) {
            return
        }
        fullscreenButton.click()
    }, 1000)

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    console.log('[Disney+ Fullscreen Fix] Extension loaded and monitoring')
})();
