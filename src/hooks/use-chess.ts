import { useEffect, useMemo, useRef, useState } from 'react';
import { Chess } from 'chess.js';

import { EvaluationOptions } from '../evaluation.type';

export const useChess = ({ lines, depth, enabled }: EvaluationOptions) => {
    const timerRef = useRef<number | null>(null);
    const game = useMemo(() => new Chess(), []);
    const stockfish = useMemo(() => {
        const worker = new Worker(`stockfish.js#stockfish.wasm`);
        worker.onmessage = (e) => setUCI(e.data);
        return worker;
    }, []);

    const [fen, setFen] = useState('start');
    const [uci, setUCI] = useState('');

    useEffect(() => {
        if (enabled) {
            timerRef.current = setInterval(async () => {
                const [tab] = await chrome.tabs.query({ active: true, url: '*://*.chess.com/*' });
                if (tab && tab.id) {
                    const pgn = await chrome.tabs.sendMessage(tab.id, null);
                    try {
                        game.loadPgn(pgn);
                        setFen(game.fen());
                    } catch (error) {
                        console.log({ pgn, error });
                    }
                }
            }, 2_000);
        } else {
            clearInterval(timerRef.current as number);
        }
    }, [game, enabled]);

    useEffect(() => {
        stockfish.postMessage(`setoption name MultiPV value ${lines}`);
    }, [stockfish, lines]);

    useEffect(() => {
        stockfish.postMessage(`position fen ${fen}`);
        stockfish.postMessage(`go ${depth}`);
    }, [stockfish, fen, depth]);

    return { uci };
};
