import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { EvaluationOptions } from './services/evaluation.service';

function App() {
    const { register, watch } = useForm<EvaluationOptions>({
        defaultValues: {
            color: 'white',
            lines: '1',
            depth: '31',
            enabled: false,
        },
    });

    const enabled = watch('enabled');

    useEffect(() => {
        if (enabled) {
            console.log(watch());
            chrome.runtime.sendMessage({ type: 'GET_PGN' }, (response) => {
                console.log(response);
            });
        }
    }, [watch, enabled]);

    return (
        <div className="p-2 flex flex-col gap-4">
            <div className="card card-compact shadow">
                <div className="card-body">
                    <h1 className="card-title">Chess Helper</h1>
                </div>
            </div>
            <div className="card card-compact shadow">
                <form className="card-body">
                    <h2 className="card-title">Settings</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <h3>Color</h3>
                        <div className="gap-2 form-control">
                            {(
                                [
                                    ['white', 'White'],
                                    ['black', 'Black'],
                                ] as const
                            ).map(([value, label]) => (
                                <label key={value} className="p-0 label cursor-pointer">
                                    <span className="label-text">{label}</span>
                                    <input
                                        {...register('color')}
                                        type="radio"
                                        value={value}
                                        className="radio checked:bg-slate-500"
                                    />
                                </label>
                            ))}
                        </div>
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
                    <p>{JSON.stringify(watch())}</p>
                </div>
            </div>
        </div>
    );
}

export default App;
