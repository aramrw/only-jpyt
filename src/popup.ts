const toggleButton = document.querySelector('button') as HTMLButtonElement;

// check local storage for the state of the toggle button

const disabled = localStorage.getItem('disabled');
if (disabled === 'true') {
    toggleButton.classList.add('disabled');
    toggleButton.textContent = 'OFF';

    // send a message to the content script
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const activeTab = tabs[0];
        if (activeTab) {
            chrome.tabs.sendMessage(activeTab.id!, { message: 'disable' });
        }
    });

} else {
    toggleButton.classList.remove('disabled');
    toggleButton.textContent = 'ON';

    // send a message to the content script
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const activeTab = tabs[0];
        if (activeTab) {
            chrome.tabs.sendMessage(activeTab.id!, { message: 'enable' });
        }
    });
}


toggleButton.addEventListener("click", () => {
    toggleButton.classList.toggle('disabled');

    if (toggleButton.classList.contains('disabled')) {
        toggleButton.textContent = 'OFF';

        //save the state to local storage
        localStorage.setItem('disabled', 'true');

        // reload the window
        chrome.tabs.reload();


    } else {
        toggleButton.textContent = 'ON';

        //save the state to local storage
        localStorage.setItem('disabled', 'false');

        // reload the window
        chrome.tabs.reload();


    }
});
