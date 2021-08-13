import React from 'react';

const UsersContext = React.createContext({
	editId: null,
	users: [],
});

export default UsersContext;
