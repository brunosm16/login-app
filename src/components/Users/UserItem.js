import PropTypes from 'prop-types';
import { useContext } from 'react';
import styles from './UserItem.module.css';
import Button from '../UI/Button/Button';
import UsersContext from '../../context/users-context';

const UserItem = ({ id, login, email }) => {
	const ctx = useContext(UsersContext);

	return (
		<li className={styles.item}>
			<div className={styles['item-info']}>
				<p>{login}</p>
				<p>{email}</p>
			</div>

			<div className={styles.actions}>
				<Button
					isSubmit={false}
					onClick={() => ctx.handleOperation(id, true)}
					cssClass={`${styles.btn} ${styles['delete-btn']}>`}
				>
					X
				</Button>

				<Button
					isSubmit={false}
					onClick={() => ctx.handleOperation(id, false)}
					cssClass={`${styles.btn} ${styles['edit-btn']}>`}
				>
					🖊️
				</Button>
			</div>
		</li>
	);
};

UserItem.defaultProps = {
	id: undefined,
	login: '',
	email: '',
};

UserItem.propTypes = {
	id: PropTypes.number,
	login: PropTypes.string,
	email: PropTypes.string,
};

export default UserItem;
