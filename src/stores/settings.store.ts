import { create } from 'zustand'

export type SettingsStore = {
    color: 'white' | 'black',
    depth: number;
    lines: number;
    enabled: boolean
}

export const useSettingsStore = create<SettingsStore>()((set) => ({
    color: 'white',
    depth: 1,
    lines: 1,
    enabled: false,
}))
