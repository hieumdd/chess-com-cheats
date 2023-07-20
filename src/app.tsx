import { useForm } from 'react-hook-form';

import { EvaluationOptions } from './services/evaluation.service';
import { useChess } from './hooks/use-chess';

function App() {
    const { register, watch } = useForm<EvaluationOptions>({
        defaultValues: {
            lines: '1',
            depth: '21',
            enabled: false,
        },
    });

    const { command, commandValue } = useChess(watch());

    return (
        <div className="p-2 flex flex-col gap-4">
            <div className="card card-compact shadow">
                <form className="card-body">
                    <h2 className="card-title">Settings</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <h3>Lines</h3>
                        <div className="form-control">
                            <input
                                {...register('lines')}
                                type="range"
                                min={1}
                                max={5}
                                className="range"
                            />
                        </div>
                        <h3>Depth</h3>
                        <div className="form-control">
                            <input
                                {...register('depth')}
                                type="range"
                                min={1}
                                max={31}
                                className="range"
                            />
                        </div>
                        <h3>Enabled</h3>
                        <div className="form-control">
                            <input {...register('enabled')} type="checkbox" className="toggle" />
                        </div>
                    </div>
                </form>
            </div>
            <div className="card card-compact shadow">
                <div className="card-body">
                    <h2 className="card-title">Evaluation</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Command</p>
                        <p>{command || 'N/A'}</p>
                        <p>Command Value</p>
                        <p>{commandValue || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
