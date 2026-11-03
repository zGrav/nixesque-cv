import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import Nix from './Nix';
import './styles.css';

createRoot(document.getElementById('app-container')).render(
	<StrictMode>
		<Provider store={store}>
			<Nix />
		</Provider>
	</StrictMode>,
);
