import PropTypes from 'prop-types';
import styles from './UserItem.module.css';
import Button from '../UI/Button/Button';

const UserItem = ({ id, login, email, onDeleteById, onEditById }) => {
	const handleDelete = () => {
		onDeleteById(id);
	};

	const handleEdit = () => {
		onEditById(id);
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
	onDeleteById: () => {},
	onEditById: () => {},
};

UserItem.propTypes = {
	id: PropTypes.number,
	login: PropTypes.string,
	email: PropTypes.string,
	onDeleteById: PropTypes.func,
	onEditById: PropTypes.func,
};

export default UserItem;
