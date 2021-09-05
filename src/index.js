import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UsersContextProvider from './context/UsersContextProvider';

ReactDOM.render(
	<UsersContextProvider>
		<App />
	</UsersContextProvider>,
	document.getElementById('root')
);
