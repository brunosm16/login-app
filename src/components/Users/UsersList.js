import PropTypes from 'prop-types';
import Card from '../UI/Card/Card';
import List from '../UI/List/List';
import UserItem from './UserItem';
import styles from './UsersList.module.css';

const UsersList = ({ users, onOperation }) => {
	const handleClick = (itemId, isDelete) => {
		onOperation(itemId, isDelete);
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
						onItemClick={handleClick}
					/>
				))}
			</List>
		</Card>
	);
};
export default UsersList;

UsersList.defaultProps = {
	users: [],
	onOperation: () => {},
};

UsersList.propTypes = {
	users: PropTypes.arrayOf(PropTypes.object),
	onOperation: PropTypes.func,
};
