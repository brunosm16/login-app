/* eslint-disable no-unused-vars */
import React from 'react';

const UsersContext = React.createContext({
	editId: null,
	users: [],
	handleAddUser: (data) => {},
	handleSetEditId: (id) => {},
	handleInsertUser: (user) => {},
	handleUpdateUser: (updatedUser) => {},
	handleOpenCloseModal: { title: '', message: '' },
	modalError: false,
	isLoading: false,
	requestError: null,
});

export default UsersContext;
