import PropTypes from 'prop-types';
import Card from '../UI/Card/Card';
import UserItem from './UserItem';
import styles from './UsersList.module.css';

const UsersList = ({ users }) => (
	<Card cssClass={styles.list__container}>
		<ul className={styles['users-list']}>
			{users.map((user) => (
				<UserItem login={user.login} email={user.email} />
			))}
		</ul>
	</Card>
);

export default UsersList;

UsersList.defaultProps = {
	users: [],
};

UsersList.propTypes = {
	users: PropTypes.arrayOf(PropTypes.object),
};
