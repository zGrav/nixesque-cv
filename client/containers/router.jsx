import React from 'react';
import {
	BrowserRouter as Router,
	// Route,
	// Switch,
} from 'react-router-dom';


import Root from 'containers/root';
import Nix from 'containers/nix';

const Routes = () => (
	<Router>
		<Root>
			<Nix />
		</Root>
	</Router>
);

export default Routes;
