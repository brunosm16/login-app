import PropTypes from 'prop-types';
import { useContext } from 'react';
import UsersContext from '../../context/users-context';
import Card from '../UI/Card/Card';
import List from '../UI/List/List';
import UserItem from './UserItem';
import styles from './UsersList.module.css';

const UsersList = ({ onOperation }) => {
	const usersCtx = useContext(UsersContext);

	const [users] = [usersCtx.users];

	const handleClick = (itemId, isDelete) => {
		onOperation(itemId, isDelete);
	};

	return (
		users.length > 0 && (
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
		)
	);
};
export default UsersList;

UsersList.defaultProps = {
	onOperation: () => {},
};

UsersList.propTypes = {
	onOperation: PropTypes.func,
};
