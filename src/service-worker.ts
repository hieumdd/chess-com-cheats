chrome.action.onClicked.addListener(() => {
    chrome.windows.create({
        url: chrome.runtime.getURL('index.html'),
        type: 'popup',
        width: 400,
        height: 302,
    });
});
