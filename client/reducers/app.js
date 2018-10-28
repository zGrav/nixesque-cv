// @flow
import Actions from 'constants/actions';
import { Map } from 'immutable';

import type { Map as ImmutableMap } from 'immutable';

const app = (state: ImmutableMap<string, *>, action: *) => {
	if (!Map.isMap(state)) state = Map();

	const { type } = action;

	switch (type) {
		case Actions.BOOTUP_PLAY_CHAIRAUDIO:
			return state
				.setIn([ 'bootup', 'state' ], Actions.BOOTUP_PLAY_CHAIRAUDIO)
				.setIn([ 'bootup', 'running' ], true);

		case Actions.BOOTUP_PLAY_POWERONAUDIO:
			return state
				.setIn([ 'bootup', 'state' ], Actions.BOOTUP_PLAY_POWERONAUDIO)
				.setIn([ 'bootup', 'running' ], true);

		case Actions.BOOTUP_SHOW_SPLASH:
			return state
				.setIn([ 'bootup', 'state' ], Actions.BOOTUP_SHOW_SPLASH)
				.setIn([ 'bootup', 'running' ], true);

		case Actions.BOOTUP_SHOW_LOGIN:
			return state
				.setIn([ 'bootup', 'state' ], Actions.BOOTUP_SHOW_LOGIN)
				.setIn([ 'bootup', 'running' ], true);

		case Actions.BOOTUP_RUNNING:
			return state
				.setIn([ 'bootup', 'state' ], Actions.BOOTUP_RUNNING)
				.setIn([ 'bootup', 'running' ], true);

		case Actions.BOOTUP_COMPLETE:
			return state
				.setIn([ 'bootup', 'state' ], Actions.BOOTUP_COMPLETE)
				.setIn([ 'bootup', 'running' ], false);

		default:
	}

	return state;
};

export default app;
