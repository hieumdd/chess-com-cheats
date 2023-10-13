import { useEffect, useMemo, useRef, useState } from 'react';
import { Chess } from 'chess.js';

export type UseChessOptions = { enabled: boolean };

export const useChess = ({ enabled }: UseChessOptions) => {
    const stockfishOptions = useMemo(() => ({ depth: 21, lines: 1 }), []);
    const game = useMemo(() => new Chess(), []);
    const timerRef = useRef<number | null>(null);

    const [input, setInput] = useState<{ pgn: string; fen: string }>({
        pgn: '',
        fen: 'start',
    });
    const [output, setOutput] = useState<{ bestMove?: string; ponder?: string }>({
        bestMove: undefined,
        ponder: undefined,
    });

    const stockfish = useMemo(() => {
        const worker = new Worker(`stockfish.js#stockfish.wasm`);
        worker.onmessage = (e) => {
            console.debug(e.data);
            const commands = e.data.split(' ');
            if (commands[0] === 'bestmove') {
                setOutput({ bestMove: commands[1], ponder: commands[3] });
            }
        };
        worker.postMessage(`setoption name MultiPV value ${stockfishOptions.lines}`);
        return worker;
    }, [stockfishOptions.lines]);

    useEffect(() => {
        const clear = () => {
            timerRef.current && clearInterval(timerRef.current);
        };

        if (!enabled && timerRef.current) {
            clear();
            return;
        }

        timerRef.current = setInterval(async () => {
            const [tab] = await chrome.tabs.query({ active: true, url: '*://*.chess.com/*' });
            if (tab && tab.id) {
                const pgn = await chrome.tabs.sendMessage<any, string>(tab.id, undefined);
                setInput((state) => ({ ...state, pgn }));
                try {
                    game.loadPgn(pgn);
                    setInput((state) => ({ ...state, fen: game.fen() }));
                } catch (error) {
                    console.log({ pgn, error });
                }
            }
        }, 2_000);

        return clear;
    }, [game, enabled]);

    useEffect(() => {
        stockfish.postMessage(`position fen ${input.fen}`);
        stockfish.postMessage(`go ${stockfishOptions.depth}`);
    }, [stockfish, stockfishOptions.depth, input.fen]);

    return { input, output };
};
