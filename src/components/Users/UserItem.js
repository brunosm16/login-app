import PropTypes from 'prop-types';
import { useContext } from 'react';
import styles from './UserItem.module.css';
import Button from '../UI/Button/Button';
import UsersContext from '../../context/users-context';
import UseHttp from '../../hooks/use-http';
import { ENDPOINT, modalRequestError } from '../../utils/HttpUtils';
import UseIsMounted from '../../hooks/use-is-mounted';

const UserItem = ({ id, login, email }) => {
	const userCtx = useContext(UsersContext);
	const isMounted = UseIsMounted();

	const { sendRequest: deleteRequest } = UseHttp();

	const handleEdit = () => {
		userCtx.handleSetEditId(id);
	};

	const deleteUser = () => {
		if (isMounted) {
			userCtx.handleDeleteUser(id);
		}
	};

	const openCloseModal = () => {
		userCtx.handleOpenCloseModal(modalRequestError);
	};

	const handleDelete = () => {
		deleteRequest(
			{
				url: `${ENDPOINT}/users/${id}/.json`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			},
			deleteUser,
			openCloseModal
		);
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
					✖
				</Button>

				<Button
					isSubmit={false}
					onClick={handleEdit}
					cssClass={`${styles.btn} ${styles['edit-btn']}>`}
				>
					✎
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
	id: PropTypes.string,
	login: PropTypes.string,
	email: PropTypes.string,
};

export default UserItem;
