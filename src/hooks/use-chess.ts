import { useEffect, useMemo, useRef, useState } from 'react';
import { Chess } from 'chess.js';

import { EvaluationOptions } from '../evaluation.type';

export const useChess = ({ lines, depth, enabled }: EvaluationOptions) => {
    const timerRef = useRef<number | null>(null);
    const game = useMemo(() => new Chess(), []);
    const stockfish = useMemo(() => new Worker(`stockfish.js#stockfish.wasm`), []);

    const [fen, setFen] = useState('start');
    const [uci, setUCI] = useState('');

    useEffect(() => {
        if (enabled) {
            timerRef.current = setInterval(() => {
                chrome.tabs.query({ active: true, url: '*://*.chess.com/play*' }).then(([tab]) => {
                    if (tab) {
                        chrome.tabs
                            .sendMessage(tab.id as number, {
                                type: 'GET_PGN',
                            })
                            .then((pgn) => {
                                game.loadPgn(pgn);
                                setFen(game.fen());
                            });
                    }
                });
            }, 2_000);
        } else {
            clearInterval(timerRef.current as number);
        }
    }, [game, enabled]);

    useEffect(() => {
        stockfish.onmessage = (e) => {
            setUCI(e.data);
        };
    }, []);

    useEffect(() => {
        stockfish.postMessage(`setoption name MultiPV value ${lines}`);
    }, [lines]);

    useEffect(() => {
        stockfish.postMessage(`position fen ${fen}`);
        stockfish.postMessage(`go ${depth}`);
    }, [fen, depth]);

    return { uci };
};
