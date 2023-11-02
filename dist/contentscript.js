"use strict";
const handleYoutubeLoaded = () => {
    const youtubeLogo = document.querySelector('#logo');
    const videoLinks = Array.from(document.querySelectorAll('#video-title'));
    if (youtubeLogo) {
        for (const link of videoLinks) {
            const videoTitle = link.textContent; // Get the text content of the link
            const richGridRow = link.closest('ytd-rich-grid-row');
            const sectionRenderer = link.closest('ytd-video-renderer');
            // remove all shorts videos
            const shortsRenderer = link.closest('ytd-reel-shelf-renderer');
            if (shortsRenderer) {
                shortsRenderer?.remove();
            }
            if (videoTitle) {
                if (!containsJapaneseCharacter(videoTitle)) {
                    // console.log('Removing link: ', videoTitle);
                    richGridRow?.remove();
                    if (sectionRenderer) {
                        sectionRenderer?.remove();
                    }
                }
            }
        }
    }
};
function containsJapaneseCharacter(text) {
    // Check if the text contains any character from the Unicode ranges for Japanese scripts
    return /[一-龯ぁ-んァ-ヶ]/.test(text);
}
// get the state of the toggle button from local storage
if (localStorage.getItem('disabled') === 'true') {
    localStorage.setItem('disabled', 'true');
    const mutationObserver = new MutationObserver(handleYoutubeLoaded);
    mutationObserver.observe(document, {
        childList: true,
        subtree: true
    });
}
else {
    // do nothing since the program is disabled
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "enable") {
        localStorage.setItem('disabled', 'false');
    }
    else {
        localStorage.setItem('disabled', 'true');
        // do nothings since the program is disabled
    }
});
