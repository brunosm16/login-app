import React from 'react';
import PropTypes from 'prop-types';
import styles from './Overlay.module.css';
import Card from '../Card/Card';
import Button from '../Button/Button';

const Overlay = ({ title, message, onCloseModal }) => (
	<Card cssClass={`${styles.overlay}`}>
		<header className={styles.overlay__header}>
			<h2>{title}</h2>
		</header>

		<main className={styles.overlay__main}>
			<p>{message}</p>
		</main>

		<footer className={styles.overlay__actions}>
			<Button type="button" onClick={onCloseModal}>
				OK
			</Button>
		</footer>
	</Card>
);

Overlay.defaultProps = {
	onCloseModal: () => {},
	title: '',
	message: '',
};

Overlay.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	onCloseModal: PropTypes.func,
};

export default Overlay;
