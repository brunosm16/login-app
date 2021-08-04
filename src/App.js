import { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';
import './App.css';

const App = () => {
	const [users, setUsers] = useState([]);

	const handleAddUser = (data) => {
		setUsers((previousData) => [data, ...previousData]);
	};

	return (
		<div className="App">
			<AddUser onAddUser={handleAddUser} />
			<UsersList users={users} />
		</div>
	);
};

export default App;
