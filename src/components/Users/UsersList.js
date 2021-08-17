import { useContext } from 'react';
import UsersContext from '../../context/users-context';
import Card from '../UI/Card/Card';
import List from '../UI/List/List';
import UserItem from './UserItem';
import styles from './UsersList.module.css';

const UsersList = () => {
	const ctx = useContext(UsersContext);

	return (
		ctx.users.length > 0 && (
			<Card cssClass={styles.list__container}>
				<List cssClass={styles['users-list']}>
					{ctx.users.map((user) => (
						<UserItem
							key={user.id}
							id={user.id}
							login={user.login}
							email={user.email}
						/>
					))}
				</List>
			</Card>
		)
	);
};

export default UsersList;
