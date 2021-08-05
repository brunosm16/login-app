import PropTypes from 'prop-types';
import Card from '../UI/Card/Card';
import List from '../UI/List/List';
import UserItem from './UserItem';
import styles from './UsersList.module.css';

const UsersList = ({ users, onDeleteUser, onEditUser }) => {
	const handleDeleteById = (id) => {
		onDeleteUser(id);
	};

	const handleEditById = (id) => {
		onEditUser(id);
	};
	return (
		<Card cssClass={styles.list__container}>
			<List cssClass={styles['users-list']}>
				{users.map((user) => (
					<UserItem
						key={user.id}
						id={user.id}
						login={user.login}
						email={user.email}
						onDeleteById={handleDeleteById}
						onEditById={handleEditById}
					/>
				))}
			</List>
		</Card>
	);
};
export default UsersList;

UsersList.defaultProps = {
	users: [],
	onDeleteUser: () => {},
	onEditUser: () => {},
};

UsersList.propTypes = {
	users: PropTypes.arrayOf(PropTypes.object),
	onDeleteUser: PropTypes.func,
	onEditUser: PropTypes.func,
};
