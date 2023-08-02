import { useForm } from 'react-hook-form';

import { EvaluationOptions } from './evaluation.type';
import { useChess } from './hooks/use-chess';

function App() {
    const { register, watch } = useForm<EvaluationOptions>({
        defaultValues: {
            depth: '21',
            enabled: false,
        },
    });

    const { bestMove } = useChess(watch());

    return (
        <div className="flex flex-col gap-4 p-2">
            <div className="shadow card card-compact">
                <form className="card-body">
                    <div className="grid grid-cols-2 gap-4">
                        <h3>Depth</h3>
                        <div className="form-control">
                            <input {...register('depth')} type="range" min={1} max={31} className="range" />
                        </div>
                        <h3>Enabled</h3>
                        <div className="form-control">
                            <input {...register('enabled')} type="checkbox" className="toggle" />
                        </div>
                    </div>
                </form>
            </div>
            <div className="shadow card card-compact">
                <div className="card-body">
                    <div className="stats min-h-[80px]">
                        {bestMove.bestMove && (
                            <div className="stat">
                                <div className="stat-title">Best move</div>
                                <div className="stat-value">{bestMove.bestMove}</div>
                            </div>
                        )}
                        {bestMove.ponder && (
                            <div className="stat">
                                <div className="stat-title">Ponder</div>
                                <span className="stat-value">{bestMove.ponder}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
