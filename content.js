(() => {

    function isFullscreen() {
        return !!(document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement);
    }

    let isWorkerOn = false

    setInterval(() => {
        if (isWorkerOn) {
            console.log("[Disney+ Fullscreen Fix] Startup worker ON", isWorkerOn)
        } else {
            console.log("[Disney+ Fullscreen Fix] Startup worker OFF", isWorkerOn)
            return
        }
        if (isFullscreen()) {
            console.log("[Disney+ Fullscreen Fix] Already in fullscreen => END")
            return
        }
        const shadowRoot = document.querySelector('toggle-fullscreen')?.shadowRoot
        const fullscreenButton = shadowRoot?.querySelector('info-tooltip button')
        if (fullscreenButton == null) {
            console.log("[Disney+ Fullscreen Fix] Failed to restore fullscreen => END")
            return
        }

        fullscreenButton.click()
        console.log("[Disney+ Fullscreen Fix] Restored fullscreen => END", fullscreenButton)
    }, 1000)

    function handleFullscreenChange() {
        if (isFullscreen()) {
            console.log("[Disney+ Fullscreen Fix] Enter fullscreen")
            isWorkerOn = false
        } else {
            console.log("[Disney+ Fullscreen Fix] Exit fullscreen")
            isWorkerOn = true
        }
    }

    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // // Listen for clicks to trigger restore if needed
    // document.addEventListener('click', (e) => {
    //     if (shouldRestoreFullscreen && !restoreInterval) {
    //         console.log('[Disney+ Fullscreen Fix] Click detected, starting retry attempts');
    //         startRetrying('click event');
    //     }
    // }, true);

    // // Monitor for URL changes (when episode changes)
    // let lastUrl = location.href;
    // new MutationObserver(() => {
    //     const currentUrl = location.href;
    //     if (currentUrl !== lastUrl) {
    //         const oldEpisodeId = lastUrl.split('/').pop();
    //         const newEpisodeId = currentUrl.split('/').pop();
    //         lastUrl = currentUrl;

    //         console.log('[Disney+ Fullscreen Fix] URL changed:', oldEpisodeId, '->', newEpisodeId);

    //         if (shouldRestoreFullscreen && !restoreInterval) {
    //             startRetrying('URL change');
    //         }
    //     }
    // }).observe(document, { subtree: true, childList: true });

    // this function is working very badly as there is no event trigger the first time i press escape
    // HEWEVER i exit the fullscreen so let's try to trigger this instead
    // BUT be careful not to trigger it at episode end later
    function manualExitFullscreenWorker(event) {
        console.log('[Disney+ Fullscreen Fix] keyX', event)
        // if (event.code === 'Escape') {
        //     console.log('[Disney+ Fullscreen Fix] Escape key pressed')
        //     isWorkerOn = false
        //     return
        // }
    }

    document.addEventListener('keydown', manualExitFullscreenWorker)
    document.addEventListener('keypress', manualExitFullscreenWorker)
    document.addEventListener('keyup', manualExitFullscreenWorker)
    // enterFullscreen()

    console.log('[Disney+ Fullscreen Fix] Extension loaded and monitoring')
})();
