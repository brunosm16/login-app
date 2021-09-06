import { useContext } from 'react';
import UsersContext from '../../context/users-context';
import Card from '../UI/Card/Card';
import List from '../UI/List/List';
import UserItem from './UserItem';
import styles from './UsersList.module.css';

const UsersList = () => {
	const ctx = useContext(UsersContext);

	let content = ctx.users.length > 0 && (
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
	);

	if (ctx.isLoading) {
		content = (
			<Card cssClass={styles['request-msg-container']}>
				<h1 className={styles['loading-msg']}>Users loading ...</h1>
			</Card>
		);
	}

	if (ctx.requestError) {
		content = (
			<Card>
				<h1>An error occurred while trying to process your request</h1>
			</Card>
		);
	}

	return <>{content}</>;
};

export default UsersList;
