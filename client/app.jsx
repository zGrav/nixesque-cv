import React from 'react';
import { render } from 'react-dom';

import Store from 'containers/store';

const App = () => (
	<Store />
);

export default () => render(<App />, document.getElementById('app-container'));
