import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import UseHttp from '../hooks/use-http';
import { ENDPOINT } from '../utils/HttpUtils';
import UsersContext from './users-context';

const UsersContextProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	// ID of user to be edited,
	// if NULL, operation is not edit
	const [editId, setEditId] = useState();
	const [modalError, setModalError] = useState(null);

	const { requestError, isLoading, sendRequest: fetchUsers } = UseHttp();

	const transformExercises = (exercises) => {
		const fetchedUsers = [];

		Object.keys(exercises).forEach((key) => {
			fetchedUsers.push({
				id: key,
				email: exercises[key].email,
				login: exercises[key].login,
				password: exercises[key].password,
			});
		});

		setUsers(fetchedUsers);
	};

	useEffect(() => {
		fetchUsers(
			{
				url: `${ENDPOINT}/users.json`,
				headers: {
					'Content-Type': 'application/json',
				},
			},
			transformExercises
		);
	}, [fetchUsers]);

	const handleSetEditId = (id) => {
		setEditId(id);
	};

	const handleUpdateUser = (userUpdated) => {
		setUsers((previousData) =>
			previousData.map((user) => {
				let currUser = user;

				if (currUser.id === user.id) {
					currUser = userUpdated;
				}

				return currUser;
			})
		);
	};

	const handleInsertUser = (user) => {
		setUsers((previousData) => [user, ...previousData]);
	};

	const handleDeleteUser = (id) => {
		setUsers((previousData) =>
			previousData.filter((currUser) => currUser.id !== id)
		);
	};

	const handleOpenCloseModal = (modalObj) => {
		setModalError(modalObj);
	};

	return (
		<UsersContext.Provider
			value={{
				editId,
				users,
				handleInsertUser,
				handleUpdateUser,
				handleDeleteUser,
				handleSetEditId,
				handleOpenCloseModal,
				isLoading,
				modalError,
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

export default UsersContextProvider;
