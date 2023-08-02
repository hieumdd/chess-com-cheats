chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (!tab.url) {
        return;
    }
    const url = new URL(tab.url);

    chrome.sidePanel.setOptions({
        tabId,
        path: 'index.html',
        enabled: url.origin === 'https://www.chess.com',
    });
});

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));
