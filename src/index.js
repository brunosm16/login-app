import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UsersContextProvider } from './context/users-context';

ReactDOM.render(
	<UsersContextProvider>
		<App />
	</UsersContextProvider>,
	document.getElementById('root')
);
