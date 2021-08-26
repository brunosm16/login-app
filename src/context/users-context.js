import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

const UsersContext = React.createContext({
	editId: null,
	users: [],
	// eslint-disable-next-line no-unused-vars
	handleAddUser: (data) => {},
	// eslint-disable-next-line no-unused-vars
	handleOperation: (itemId, isDelete) => {},
	isLoading: false,
	requestError: null,
});

/**
 * Returns a Request Object.
 */
export const getRequestObj = (method, data = {}, contentType) => ({
	method,
	body: JSON.stringify(data),
	headers: {
		'Content-Type': contentType,
	},
});

const URL = `https://register-app-1a33f-default-rtdb.firebaseio.com`;
const ERROR_MESSAGE = `An error ocurred while processing your request`;
const CONTENT_TYPE = 'application/json';

export const UsersContextProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [requestError, setRequestError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchUsers = useCallback(async () => {
		/* Clear previous states */
		setIsLoading(false);
		setRequestError(null);

		try {
			setIsLoading(true);

			const response = await fetch(`${URL}/users.json`);

			if (!response.ok) {
				throw new Error(ERROR_MESSAGE);
			}

			const data = await response.json();

			if (data) {
				const fetchedUsers = [];

				Object.keys(data).forEach((key) => {
					fetchedUsers.push({
						id: key,
						email: data[key].email,
						login: data[key].login,
						password: data[key].password,
					});
				});

				setUsers(fetchedUsers);
			} else {
				setUsers([]);
			}
		} catch (err) {
			setRequestError(err.message);
		}
		setIsLoading(false);
	}, []);

	/* Fetch Users from Server */
	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	// ID of user to be edited,
	// if NULL, operation is not edit
	const [editId, setEditId] = useState();

	async function handleAddUser(user) {
		let fetchURL;
		let req;

		// Edit operation
		if (editId) {
			fetchURL = `${URL}/users/${editId}/.json`;
			req = getRequestObj('PATCH', user, CONTENT_TYPE);
		} else {
			fetchURL = `${URL}/users.json`;
			req = getRequestObj('POST', user, CONTENT_TYPE);
		}

		const response = await fetch(fetchURL, req);
		const data = await response.json();

		// Reload editId
		setEditId(null);

		// Reload users
		fetchUsers();

		return data;
	}

	async function handleDeleteUser(id) {
		let data;
		try {
			const response = await fetch(
				`${URL}/users/${id}/.json`,
				getRequestObj('DELETE', {}, CONTENT_TYPE)
			);

			if (!response.ok) {
				throw new Error(ERROR_MESSAGE);
			}

			data = await response.json();
		} catch (err) {
			setRequestError(err.message);
		}

		// Reload users
		fetchUsers();

		return data;
	}

	const handleOperation = (userId, isDelete) =>
		isDelete ? handleDeleteUser(userId) : setEditId(userId);

	return (
		<UsersContext.Provider
			value={{
				editId,
				users,
				handleAddUser,
				handleOperation,
				isLoading,
				requestError,
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
