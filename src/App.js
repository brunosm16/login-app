import { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';
import './App.css';

const App = () => {
	const [users, setUsers] = useState([
		{ id: 1, login: 'MockUser', email: 'MockUser@hotmail.com' },
	]);

	const handleAddUser = (data) => {
		setUsers((previousData) => [data, ...previousData]);
	};

	const handleEditUser = (id) => {
		console.log(id);
	};

	const handleDeleteUser = (id) => {
		setUsers((previousData) => previousData.filter((data) => data.id !== id));
	};

	return (
		<div className="App">
			<AddUser onAddUser={handleAddUser} />
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
