import PropTypes from 'prop-types';
import styles from './ErrorModal.module.css';
import Button from '../Button/Button';
import Card from '../Card/Card';

const ErrorModal = ({ title, message, onCloseModal }) => (
	<div>
		<div
			className={styles.backdrop}
			onClick={onCloseModal}
			aria-hidden="true"
		/>
		<Card cssClass={`${styles.modal}`}>
			<header className={styles.modal__header}>
				<h2>{title}</h2>
			</header>

			<main className={styles.modal__main}>
				<p>{message}</p>
			</main>

			<footer className={styles.modal__actions}>
				<Button type="button" onClick={onCloseModal}>
					OK
				</Button>
			</footer>
		</Card>
	</div>
);

export default ErrorModal;

ErrorModal.defaultProps = {
	title: 'Invalid input',
	message: 'Please enter a valid input',
	onCloseModal: () => {},
};

ErrorModal.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	onCloseModal: PropTypes.func,
};
