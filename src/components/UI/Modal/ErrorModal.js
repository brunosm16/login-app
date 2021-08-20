import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import Overlay from './Overlay';

const ErrorModal = ({ title, message, onCloseModal }) => (
	<>
		{ReactDOM.createPortal(
			<Backdrop onCloseModal={onCloseModal} />,
			document.getElementById('backdrop')
		)}

		{ReactDOM.createPortal(
			<Overlay title={title} message={message} onCloseModal={onCloseModal} />,
			document.getElementById('overlay')
		)}
	</>
);

ErrorModal.defaultProps = {
	title: '',
	message: '',
	onCloseModal: () => {},
};

ErrorModal.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	onCloseModal: PropTypes.func,
};

export default ErrorModal;
