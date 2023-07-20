import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type SettingsState = {
    color: string;
    depth: string;
    lines: string;
    enabled: boolean;
};

export type SettingsAction = {
    setSettings: (state: SettingsState) => void;
};

export type SettingsStore = SettingsState & SettingsAction;

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set) => ({
            color: 'white',
            depth: '1',
            lines: '1',
            enabled: false as boolean,
            setSettings: (state: SettingsState) => set(state),
        }),
        { name: 'chess-com-cheats', storage: createJSONStorage(() => localStorage) },
    ),
);
