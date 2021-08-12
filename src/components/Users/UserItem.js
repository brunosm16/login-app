import PropTypes from 'prop-types';
import styles from './UserItem.module.css';
import Button from '../UI/Button/Button';

const UserItem = ({ id, login, email, onItemClick }) => {
	const handleDelete = () => {
		onItemClick(id, true);
	};

	const handleEdit = () => {
		onItemClick(id, false);
	};

	return (
		<li className={styles.item}>
			<div className={styles['item-info']}>
				<p>{login}</p>
				<p>{email}</p>
			</div>

			<div className={styles.actions}>
				<Button
					isSubmit={false}
					onClick={handleDelete}
					cssClass={`${styles.btn} ${styles['delete-btn']}>`}
				>
					X
				</Button>

				<Button
					isSubmit={false}
					onClick={handleEdit}
					cssClass={`${styles.btn} ${styles['edit-btn']}>`}
				>
					🖊️
				</Button>
			</div>
		</li>
	);
};

UserItem.defaultProps = {
	id: -1,
	login: 'empty login',
	email: 'empty email',
	onItemClick: () => {},
};

UserItem.propTypes = {
	id: PropTypes.number,
	login: PropTypes.string,
	email: PropTypes.string,
	onItemClick: () => {},
};

export default UserItem;
