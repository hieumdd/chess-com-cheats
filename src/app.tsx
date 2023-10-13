import { useForm } from 'react-hook-form';

import { UseChessOptions, useChess } from './hooks/use-chess';

function App() {
    const { register, watch } = useForm<UseChessOptions>({ defaultValues: { enabled: false } });
    const { input, output } = useChess(watch());

    return (
        <div className="flex flex-col gap-4 p-2">
            <form className="flex flex-row justify-end mt-2">
                <div className="p-2 shadow rounded-2xl form-control">
                    <input {...register('enabled')} type="checkbox" className="toggle" />
                </div>
            </form>
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
            <div className="shadow card card-compact">
                <div className="card-body">
                    <div className="collapse">
                        <input type="checkbox" />
                        <div className="text-xl font-medium collapse-title">...</div>
                        <div className="p-0 collapse-content">
                            {input.pgn && (
                                <div className="chat chat-start">
                                    <div className="text-sm chat-header">PGN</div>
                                    <div className="chat-bubble">{input.pgn}</div>
                                </div>
                            )}
                            {input.fen && (
                                <div className="chat chat-start">
                                    <div className="text-sm chat-header">FEN</div>
                                    <div className="chat-bubble">{input.fen}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
