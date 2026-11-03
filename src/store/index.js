import { configureStore, createSlice } from '@reduxjs/toolkit';

export const Stages = {
	OFF: 'OFF',
	CHAIR_AUDIO: 'CHAIR_AUDIO',
	BOOTUP: 'BOOTUP',
	SPLASH: 'SPLASH',
	LOGIN: 'LOGIN',
	SHELL: 'SHELL',
};

const slice = createSlice({
	name: 'app',
	// silent is set if the browser still refuses to play audio
	initialState: { stage: Stages.OFF, silent: false },
	reducers: {
		setStage: (state, { payload }) => { state.stage = payload; },
		setSilent: (state) => { state.silent = true; },
	},
});

export const { setStage, setSilent } = slice.actions;

export default configureStore({ reducer: { app: slice.reducer } });
