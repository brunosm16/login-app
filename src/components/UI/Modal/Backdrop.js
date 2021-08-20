import React from 'react';
import PropTrypes from 'prop-types';
import styles from './Backdrop.module.css';

const Backdrop = ({ onCloseModal }) => (
	<div onClick={onCloseModal} aria-hidden="true" className={styles.backdrop} />
);

Backdrop.defaultProps = {
	onCloseModal: () => {},
};

Backdrop.propTypes = {
	onCloseModal: PropTrypes.func,
};

export default Backdrop;
