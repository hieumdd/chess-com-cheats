import { useEffect, useRef, useState } from 'react';
import { Chess } from 'chess.js';

import { EvaluationOptions } from '../services/evaluation.service';

export const useChess = ({ lines, depth, enabled }: EvaluationOptions) => {
    const timerRef = useRef<number | null>(null);
    const gameRef = useRef(new Chess());
    const stockfish = useRef(new Worker('stockfish.js'));

    const [fen, setFen] = useState('start');
    const [uci, setUCI] = useState('');

    useEffect(() => {
        if (enabled) {
            timerRef.current = setInterval(() => {
                chrome.tabs.query({ active: true, url: '*://*.chess.com/play*' }).then(([tab]) => {
                    if (tab) {
                        chrome.tabs.sendMessage(tab.id as number, { type: 'GET_PGN' }).then((pgn) => {
                            gameRef.current.loadPgn(pgn);
                            setFen(gameRef.current.fen());
                        })
                    }
                })
            }, 2_000)
        } else {
            clearInterval(timerRef.current as number);
        }

        return () => clearInterval(timerRef.current as number);
    }, [enabled]);

    useEffect(() => {
        stockfish.current.onmessage = (e) => {
            setUCI(e.data);
        };
    }, [])

    useEffect(() => {
        stockfish.current.postMessage(`setoption name MultiPV value ${lines}`);
    }, [lines])

    useEffect(() => {
        stockfish.current.postMessage(`position fen ${fen}`);
        stockfish.current.postMessage(`go ${depth}`);
    }, [fen, depth])

    return { uci }
};
