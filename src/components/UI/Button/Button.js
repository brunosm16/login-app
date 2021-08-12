import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ isSubmit, onClick, cssClass, children }) => (
	<button
		type={isSubmit ? 'submit' : 'button'}
		onClick={onClick}
		className={`${styles.button} ${cssClass}`}
	>
		{children}
	</button>
);

export default Button;

Button.defaultProps = {
	isSubmit: true,
	onClick: () => {},
	cssClass: '',
	children: {},
};

Button.propTypes = {
	isSubmit: PropTypes.bool,
	onClick: PropTypes.func,
	cssClass: PropTypes.string,
	children: PropTypes.node,
};
