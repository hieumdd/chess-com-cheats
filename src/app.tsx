import { useForm } from 'react-hook-form';

import { UseChessOptions, useChess } from './hooks/use-chess';

function App() {
    const { register, watch } = useForm<UseChessOptions>({ defaultValues: { enabled: false } });
    const { input, output } = useChess(watch());

    return (
        <div className="flex flex-col gap-4 p-2">
            <div className="shadow card card-compact">
                <form className="card-body">
                    <div className="grid grid-cols-2 gap-4">
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
                        {output.bestMove && (
                            <div className="stat">
                                <div className="stat-title">Best move</div>
                                <div className="stat-value">{output.bestMove}</div>
                            </div>
                        )}
                        {output.ponder && (
                            <div className="stat">
                                <div className="stat-title">Ponder</div>
                                <span className="stat-value">{output.ponder}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="break-all alert">{input.pgn}</div>
            <div className="break-all alert">{input.fen}</div>
        </div>
    );
}

export default App;
