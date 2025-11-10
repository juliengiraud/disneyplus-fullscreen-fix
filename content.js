(function() {
  'use strict';

  let wasFullscreen = false;
  let urlChangeWhileFullscreen = false;

  // Check if document is currently in fullscreen
  function isFullscreen() {
    return !!(document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement);
  }

  // Request fullscreen on the video element or document
  function enterFullscreen() {
    const video = document.querySelector('video');
    const targetElement = video || document.documentElement;

    if (targetElement.requestFullscreen) {
      targetElement.requestFullscreen();
    } else if (targetElement.mozRequestFullScreen) {
      targetElement.mozRequestFullScreen();
    } else if (targetElement.webkitRequestFullscreen) {
      targetElement.webkitRequestFullscreen();
    } else if (targetElement.msRequestFullscreen) {
      targetElement.msRequestFullscreen();
    }

    console.log('[Disney+ Fullscreen Fix] Restored fullscreen');
  }

  // Track fullscreen changes
  function handleFullscreenChange() {
    const currentlyFullscreen = isFullscreen();

    if (currentlyFullscreen) {
      wasFullscreen = true;
      console.log('[Disney+ Fullscreen Fix] Entered fullscreen');
    } else {
      console.log('[Disney+ Fullscreen Fix] Exited fullscreen');

      // If we just lost fullscreen and a URL change triggered it, restore it
      if (urlChangeWhileFullscreen) {
        console.log('[Disney+ Fullscreen Fix] Fullscreen lost due to URL change, restoring...');
        urlChangeWhileFullscreen = false;

        // Wait for video to be ready
        setTimeout(() => {
          const video = document.querySelector('video');
          if (video && !isFullscreen()) {
            enterFullscreen();
          }
        }, 800);
      } else {
        // User manually exited fullscreen
        wasFullscreen = false;
      }
    }
  }

  // Listen for fullscreen changes
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.addEventListener('mozfullscreenchange', handleFullscreenChange);

  // Monitor for URL changes (Disney+ is a SPA)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      console.log('[Disney+ Fullscreen Fix] URL changed from', lastUrl.split('/').pop(), 'to', currentUrl.split('/').pop());

      // If we're in fullscreen when URL changes, mark it
      if (wasFullscreen) {
        console.log('[Disney+ Fullscreen Fix] URL changed while fullscreen was active, will restore');
        urlChangeWhileFullscreen = true;
      }
    }
  }).observe(document, { subtree: true, childList: true });

  console.log('[Disney+ Fullscreen Fix] Extension loaded and monitoring');
})();
