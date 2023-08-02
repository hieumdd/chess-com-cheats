import { useEffect, useMemo, useRef, useState } from 'react';
import { Chess } from 'chess.js';

import { EvaluationOptions } from '../evaluation.type';

type BestMove = Partial<{ bestMove: string; ponder: string }>;

export const useChess = ({ depth, enabled }: EvaluationOptions) => {
    const stockfishOptions = useMemo(() => ({ lines: 1 }), []);

    const timerRef = useRef<number | null>(null);
    const game = useMemo(() => new Chess(), []);

    const [bestMove, setBestMove] = useState<BestMove>({ bestMove: undefined, ponder: undefined });

    const stockfish = useMemo(() => {
        const worker = new Worker(`stockfish.js#stockfish.wasm`);
        worker.onmessage = (e) => {
            console.debug(e.data);

            const commands = e.data.split(' ');
            if (commands[0] === 'bestmove') {
                setBestMove({ bestMove: commands[1], ponder: commands[3] });
            }
        };
        worker.postMessage(`setoption name MultiPV value ${stockfishOptions.lines}`);
        return worker;
    }, [stockfishOptions.lines]);

    const [fen, setFen] = useState('start');

    useEffect(() => {
        if (enabled) {
            timerRef.current = setInterval(async () => {
                const [tab] = await chrome.tabs.query({ active: true, url: '*://*.chess.com/*' });
                if (tab && tab.id) {
                    const pgn = await chrome.tabs.sendMessage<any, string>(tab.id, undefined);
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
        stockfish.postMessage(`position fen ${fen}`);
        stockfish.postMessage(`go ${depth}`);
    }, [stockfish, fen, depth]);

    return { bestMove };
};
