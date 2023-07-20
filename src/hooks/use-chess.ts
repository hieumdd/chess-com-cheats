import { useEffect, useRef } from 'react';

import { EvaluationOptions } from '../services/evaluation.service';

export const useChess = ({ enabled }: EvaluationOptions) => {
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (enabled) {
            timerRef.current = setInterval(() => {
                console.log(123);
            }, 5000);
        } else {
            clearInterval(timerRef.current as number);
        }
    });
};
