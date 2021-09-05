import { useContext } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';
import UsersContext from './context/users-context';
import ErrorModal from './components/UI/Modal/ErrorModal';

const App = () => {
	const userCtx = useContext(UsersContext);

	const { modalError } = userCtx;

	const handleCloseModal = () => {
		userCtx.handleOpenCloseModal(null);
	};

	let content = (
		<div className="Wrapper">
			<AddUser />
			<UsersList />
		</div>
	);
		
	if (modalError) {
		content = (
			<ErrorModal
				title={modalError.title}
				message={modalError.message}
				onCloseModal={handleCloseModal}
			/>
		);
	}

	return <>{content}</>;
};

export default App;
