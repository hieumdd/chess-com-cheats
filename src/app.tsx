import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { SettingsState, useSettingsStore } from './stores/settings.store';
import { EvaluationOptions } from './services/evaluation.service';

function App() {
    const { register, watch } = useForm<EvaluationOptions>({
        defaultValues: {
            color: 'white',
            lines: '1',
            depth: '1',
            enabled: false,
        },
    });

    const enabledToggle = () => {
        console.log(watch());
    };

    const onClick = () => {
        chrome.tabs.query({});
        chrome.tabs
            .query({
                active: true,
                url: 'https://www.chess.com/play/computer',
            })
            .then(async ([tab]) => {
                console.log(tab);
                return chrome.tabs.sendMessage(tab.id as number, { type: 'GET_PGN' });
            })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };

    // useEffect(() => {
    //     const x = setInterval(
    //         () =>
    //             chrome.tabs
    //                 .query({ active: true, currentWindow: true })
    //                 .then(([tab]) => {
    //                     return chrome.tabs.sendMessage(tab.id as number, { type: 'GET_PGN' });
    //                 })
    //                 .then((response) => console.log(response))
    //                 .catch((error) => console.log(error)),
    //         500,
    //     );

    //     return () => clearInterval(x);
    // }, []);

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
                            <input
                                {...register('enabled', { onChange: enabledToggle })}
                                type="checkbox"
                                className="toggle"
                            />
                        </div>
                    </div>
                </form>
            </div>
            <div className="card card-compact shadow">
                <div className="card-body">
                    <h2 className="card-title">Evaluation</h2>
                    <p>{JSON.stringify(watch())}</p>
                    <button onClick={onClick}> ABC</button>
                </div>
            </div>
        </div>
    );
}

export default App;
