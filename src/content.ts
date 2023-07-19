import { Message } from './message.type';

chrome.runtime.onMessage.addListener((message: Message, _, sendResponse) => {
    const pgn = [...document.querySelectorAll('vertical-move-list > .move')].map((turnEl, i) => {
        const [whiteMove, blackMove] = [...turnEl.children].map(
            (moveEl) => moveEl.textContent ?? '',
        );
        return `${i + 1}. ${whiteMove} ${blackMove}`;
    });

    sendResponse(pgn.join(' \n'));
});
