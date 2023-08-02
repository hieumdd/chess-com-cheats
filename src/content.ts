chrome.runtime.onMessage.addListener((message: any, _, sendResponse) => {
    const pgn = [...document.querySelectorAll('vertical-move-list > .move')].map((turnEl) => {
        const turn = turnEl.getAttribute('data-whole-move-number') ?? '';

        const [whiteMove, blackMove] = [...turnEl.querySelectorAll('.node')].map((moveEl) => {
            const piece = moveEl.children[0]?.getAttribute('data-figurine') ?? '';
            const move = moveEl.textContent ?? '';
            return move?.endsWith('=') ? move + piece : piece + move;
        });
        return `${turn}. ${whiteMove ?? ''} ${blackMove ?? ''}`;
    });

    sendResponse(pgn.join(' \n'));
});
