(() => {
    function isFullscreen() {
        return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement)
    }

    function findVideoElement(root = document) {
        const videos = []

        function walk(node) {
            if (node.tagName === 'VIDEO' && node.readyState > 2) {
                videos.push(node)
            }

            const children = node.children || []
            for (const child of children) {
                walk(child)
            }

            if (node.shadowRoot) {
                walk(node.shadowRoot)
            }
        }

        const startNodes = root.children || root.childNodes
        for (const node of startNodes) {
            walk(node)
        }

        return videos[0]
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
        const video = findVideoElement()
        if (isFullscreen() || !fullscreenRequired || video == null) {
            return
        }
        video.requestFullscreen()
    }, 1000)

})()
