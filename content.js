(() => {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function isFullscreen() {
        return !!(document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement);
    }

    async function getFullscreenButton() {
        max_retry = 1000
        retry = 0
        while (retry < max_retry) {
            try {
                const shadowRoot = document.querySelector('toggle-fullscreen').shadowRoot
                const fullscreenButton = shadowRoot.querySelector('info-tooltip button')
                if (fullscreenButton == null) {
                    throw Error()
                }
                return fullscreenButton
            } catch (e) {
                console.log("[Disney+ Fullscreen Fix] Failed to retrieve fullscreen button")
                await sleep(100)
            }
        }
    }



    setInterval(() => {
        console.log("[Disney+ Fullscreen Fix] Startup worker ON")
        if (isFullscreen()) {
            console.log("[Disney+ Fullscreen Fix] Already in fullscreen => END")
            return
        }
        const shadowRoot = document.querySelector('toggle-fullscreen')
        if (shadowRoot == null) {
            console.log("[Disney+ Fullscreen Fix] documentShadowRoot is null => END")
            return
        }
        const fullscreenButton = shadowRoot.shadowRoot.querySelector('info-tooltip button')
        if (fullscreenButton == null) {
            console.log("[Disney+ Fullscreen Fix] fullscreenButton is null => END")
            return
        }

        fullscreenButton.click()
        console.log("[Disney+ Fullscreen Fix] Restored fullscreen => END", fullscreenButton)
    }, 1000)

    async function enterFullscreen() {
        const fullscreenButton = await getFullscreenButton()
        fullscreenButton.click()
        console.log('[Disney+ Fullscreen Fix] Restored fullscreen');
    }

    // const playerUI = document.querySelector('disney-web-player-ui')
    // const shadowRoot = playerUI.shadowRoot;




    // // Stop the retry interval
    // function stopRetrying() {
    //     if (restoreInterval) {
    //         clearInterval(restoreInterval);
    //         restoreInterval = null;
    //         console.log('[Disney+ Fullscreen Fix] Stopped retry attempts');
    //     }
    // }

    // // Start retry interval
    // function startRetrying(reason) {
    //     stopRetrying(); // Clear any existing interval

    //     console.log(`[Disney+ Fullscreen Fix] Starting retry attempts (trigger: ${reason})`);

    //     let attemptCount = 0;

    //     restoreInterval = setInterval(() => {
    //         if (!shouldRestoreFullscreen || !fullscreenExitTime) {
    //             stopRetrying();
    //             return;
    //         }

    //         const timeSinceExit = Date.now() - fullscreenExitTime;

    //         if (timeSinceExit > RESTORE_WINDOW_MS) {
    //             console.log('[Disney+ Fullscreen Fix] Restore window expired, assuming manual exit');
    //             shouldRestoreFullscreen = false;
    //             wasFullscreen = false;
    //             fullscreenExitTime = null;
    //             stopRetrying();
    //             return;
    //         }

    //         // Check if we're ready to restore
    //         const video = document.querySelector('video');
    //         if (video && !isFullscreen() && shouldRestoreFullscreen) {
    //             attemptCount++;
    //             console.log(`[Disney+ Fullscreen Fix] Attempt #${attemptCount} (${timeSinceExit}ms since exit)`);

    //             const clicked = clickFullscreenButton();

    //             // Check if it worked after a short delay
    //             setTimeout(() => {
    //                 if (isFullscreen()) {
    //                     console.log('[Disney+ Fullscreen Fix] ✓ Successfully restored fullscreen!');
    //                     shouldRestoreFullscreen = false;
    //                     stopRetrying();
    //                 }
    //             }, 200);
    //         }
    //     }, RETRY_INTERVAL_MS);
    // }

    // Track fullscreen changes
    // function handleFullscreenChange(event) {
    //     const currentlyFullscreen = isFullscreen();
    //     console.log(`[Disney+ Fullscreen Fix] Is full screen : ${currentlyFullscreen}`)
    //     console.log('event', event)

        // if (currentlyFullscreen) {
        //     wasFullscreen = true;
        //     shouldRestoreFullscreen = false;
        //     fullscreenExitTime = null;
        //     stopRetrying();
        //     console.log('[Disney+ Fullscreen Fix] ✓ Entered fullscreen');
        // } else {
        //     if (wasFullscreen) {
        //         fullscreenExitTime = Date.now();
        //         shouldRestoreFullscreen = true;
        //         console.log('[Disney+ Fullscreen Fix] Exited fullscreen, will attempt to restore');

        //         // Start trying to restore
        //         startRetrying('fullscreen exit');
        //     }
        // }
    // }

    // Listen for fullscreen changes
    // document.addEventListener('fullscreenchange', handleFullscreenChange);
    // document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    // document.addEventListener('mozfullscreenchange', handleFullscreenChange);

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

    function handleManualExitFullscreen(event) {
        if (event.code === 'Escape') {
            console.log('[Disney+ Fullscreen Fix] Escape key pressed')

        }
    }

    document.addEventListener('keydown', e => console.log('[Disney+ Fullscreen Fix] keydown', e))
    // enterFullscreen()

    console.log('[Disney+ Fullscreen Fix] Extension loaded and monitoring')
})();
