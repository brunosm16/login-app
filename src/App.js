import { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';
import './App.css';

const App = () => {
	const [users, setUsers] = useState([
		{ id: 1, login: 'MockUser', email: 'MockUser@hotmail.com' },
	]);

	const [editId, setEditId] = useState();

	const getUserById = (id) => users.filter((user) => user.id === id)[0];

	const updateUsers = (editedUser) =>
		users.map((user) => {
			let currentUser = user;

			if (editedUser.id === currentUser.id) {
				// updates user
				currentUser = editedUser;
			}

			return currentUser;
		});

	const handleAddUser = (data) => {
		// edit operation
		if (editId) {
			// reset editId value
			setEditId(null);

			return setUsers(updateUsers(data));
		}

		// add operation
		return setUsers((previousData) => [data, ...previousData]);
	};

	const handleEditUser = (id) => {
		setEditId(id);
	};

	const handleDeleteUser = (id) => {
		setUsers((previousData) => previousData.filter((data) => data.id !== id));
	};

	return (
		<div className="App">
			<AddUser
				onAddUser={handleAddUser}
				editUserId={editId}
				editUserLogin={editId && getUserById(editId).login}
				editUserEmail={editId && getUserById(editId).email}
			/>
			{users.length > 0 && (
				<UsersList
					users={users}
					onEditUser={handleEditUser}
					onDeleteUser={handleDeleteUser}
				/>
			)}
		</div>
	);
};

export default App;
