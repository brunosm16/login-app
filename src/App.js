import AddUser from './components/AppUsers/AddUser';
import './App.css';

const App = () => {
	const handleAddUser = (data) => {
		console.log(data);
	};

	return (
		<div className="App">
			<AddUser onAddUser={handleAddUser} />
		</div>
	);
};

export default App;
