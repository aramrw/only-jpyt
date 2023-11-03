const toggleButton = document.querySelector('button') as HTMLButtonElement;

// check local storage for the state of the toggle button
const disabled = localStorage.getItem('disabled');
if (disabled === 'true') {
    toggleButton.classList.add('disabled');
    toggleButton.textContent = 'OFF';

} else if (disabled === 'false') {
    toggleButton.classList.remove('disable');
    toggleButton.textContent = 'ON';

}


toggleButton.addEventListener("click", () => {

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const activeTab = tabs[0];
        //console.log(activeTab.url);
        if (!activeTab.url?.includes('youtube')) {
            alert('Please open a youtube tab first');
        } else {
            toggleButton.classList.toggle('disabled');

            if (toggleButton.classList.contains('disabled')) {
                toggleButton.textContent = 'OFF';

                //save the state to local storage
                localStorage.setItem('disabled', 'true');

                // send a message to the content script
                chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                    const activeTab = tabs[0];
                    //console.log(activeTab.url);
                    if (activeTab.url?.includes('youtube')) {
                        chrome.tabs.sendMessage(activeTab.id!, { message: 'enable' });
                        console.log('sending message to disable');
                    }
                });

            } else {
                toggleButton.textContent = 'ON';

                //save the state to local storage
                localStorage.setItem('disabled', 'false');

                // send a message to the content script
                chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                    const activeTab = tabs[0];
                    //console.log(activeTab.url);
                    if (activeTab.url?.includes('youtube')) {
                        chrome.tabs.sendMessage(activeTab.id!, { message: 'disable' });
                        console.log('sending message to enable');
                    }
                });


            }
        }
    });



});
