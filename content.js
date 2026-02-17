(() => {
    function isFullscreen() {
        return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement)
    }

    let fullscreenRequired = false
    let lastUrl = location.href

    document.addEventListener('fullscreenchange', () => {
        if (isFullscreen()) {
            fullscreenRequired = true
            console.log(`[Disney+ Fullscreen Fix] Entering fullscreen`)
        } else {
            const currentUrl = location.href
            if (currentUrl !== lastUrl) {
                lastUrl = currentUrl
                fullscreenRequired = true
                console.log('[Disney+ Fullscreen Fix] URL changed after fullscreen lost => put it back')
            } else {
                fullscreenRequired = false
                console.log(`[Disney+ Fullscreen Fix] Fullscreen lost`)
            }
        }
    });

    setInterval(() => {
        const shadowRoot = document.querySelector('toggle-fullscreen')?.shadowRoot
        const fullscreenButton = shadowRoot?.querySelector('info-tooltip button')
        if (isFullscreen() || !fullscreenRequired || fullscreenButton == null) {
            return
        }
        fullscreenButton.click()
    }, 1000)

})()
