import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ isSubmit, onClick, disabled, cssClass, children }) => (
	<button
		type={isSubmit ? 'submit' : 'button'}
		onClick={onClick}
		disabled={disabled}
		className={`${styles.button} ${cssClass}`}
	>
		{children}
	</button>
);

export default Button;

Button.defaultProps = {
	isSubmit: true,
	onClick: () => {},
	disabled: false,
	cssClass: '',
	children: {},
};

Button.propTypes = {
	isSubmit: PropTypes.bool,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	cssClass: PropTypes.string,
	children: PropTypes.node,
};
