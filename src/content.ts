import { Message } from './message.type';

chrome.runtime.onMessage.addListener((message: Message, _, sendResponse) => {
    const pgn = [...document.querySelectorAll('vertical-move-list > .move')].map((turnEl, i) => {
        const [whiteMove, blackMove] = [...turnEl.children].map((moveEl) => {
            const piece = moveEl.children[0]?.getAttribute('data-figurine') ?? '';
            const move = moveEl.textContent ?? '';
            return move?.endsWith('=') ? move + piece : piece + move;
        });
        return `${i + 1}. ${whiteMove ?? ''} ${blackMove ?? ''}`;
    });

    sendResponse(pgn.join(' \n'));
});
