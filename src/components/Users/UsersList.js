import PropTypes from 'prop-types';
import Card from '../UI/Card/Card';
import List from '../UI/List/List';
import UserItem from './UserItem';
import styles from './UsersList.module.css';

const UsersList = ({ users }) => (
	<Card cssClass={styles.list__container}>
		<List cssClass={styles['users-list']}>
			{users.map((user) => (
				<UserItem login={user.login} email={user.email} />
			))}
		</List>
	</Card>
);

export default UsersList;

UsersList.defaultProps = {
	users: [],
};

UsersList.propTypes = {
	users: PropTypes.arrayOf(PropTypes.object),
};
