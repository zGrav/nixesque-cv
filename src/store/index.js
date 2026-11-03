import { configureStore, createSlice } from '@reduxjs/toolkit';

export const Stages = {
	CHAIR_AUDIO: 'CHAIR_AUDIO',
	BOOTUP: 'BOOTUP',
	SPLASH: 'SPLASH',
	LOGIN: 'LOGIN',
	SHELL: 'SHELL',
};

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const slice = createSlice({
	name: 'app',
	// phones have no sound effects, so they skip straight to the boot screen
	initialState: { stage: isMobile ? Stages.BOOTUP : Stages.CHAIR_AUDIO, isMobile },
	reducers: {
		setStage: (state, { payload }) => { state.stage = payload; },
	},
});

export const { setStage } = slice.actions;

export default configureStore({ reducer: { app: slice.reducer } });
