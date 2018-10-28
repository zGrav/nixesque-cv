// @flow

import React from 'react';

import type { Element as ReactElement } from 'react';

const RootContainer = ({ children }: { children: ReactElement<*>, }) => (
	<span>
		{children}
	</span>
);

RootContainer.displayName = 'RootContainer';

export default (RootContainer);
