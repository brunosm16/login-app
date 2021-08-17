import PropTypes from 'prop-types';
import React, { useState } from 'react';

const UsersContext = React.createContext({
	editId: null,
	users: [],
	// eslint-disable-next-line no-unused-vars
	handleAddUser: (data) => {},
	// eslint-disable-next-line no-unused-vars
	handleOperation: (itemId, isDelete) => {},
});

export const UsersContextProvider = ({ children }) => {
	const MOCK_USERS = [
		{ id: 1, login: 'Alexis Scott', email: 'Alexis_Scott@hotmail.com' },
		{ id: 2, login: 'Hayden Wilkinson', email: 'Hayden_Wilkinson@gmail.com' },
		{ id: 3, login: 'Gale Allen', email: 'Gale_Allen@gmail.com' },
		{ id: 4, login: 'Quinn Houghton', email: 'Houghton_Quinn@yahoo.com' },
		{ id: 5, login: 'Eli Wells', email: 'EliWells@hotmail.com' },
		{ id: 6, login: 'Billie Barron', email: 'BillieBarron@hotmail.com' },
	];

	const [users, setUsers] = useState(MOCK_USERS);

	// ID of user to be edited,
	// if NULL, operation is not edit
	const [editId, setEditId] = useState();

	const updateUsers = (updated) =>
		users.map((user) => {
			let current = user;

			if (updated.id === current.id) {
				current = updated;
			}

			return current;
		});

	const handleAddUser = (data) => {
		// Edit operation
		if (editId) {
			// Reset editId
			setEditId(null);
			return setUsers(updateUsers(data));
		}

		// add operation
		return setUsers((previousData) => [data, ...previousData]);
	};

	const handleDeleteUser = (id) => {
		setUsers((previousData) => previousData.filter((data) => data.id !== id));
	};

	const handleOperation = (userId, isDelete) =>
		isDelete ? handleDeleteUser(userId) : setEditId(userId);

	return (
		<UsersContext.Provider
			value={{
				editId,
				users,
				handleAddUser,
				handleOperation,
			}}
		>
			{children}
		</UsersContext.Provider>
	);
};

UsersContextProvider.defaultProps = {
	children: {},
};

UsersContextProvider.propTypes = {
	children: PropTypes.node,
};

export default UsersContext;
