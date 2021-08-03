import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ isSubmit, onClick, customCss, children }) => (
	<button
		type={isSubmit ? 'submit' : 'button'}
		onClick={onClick}
		className={`${styles.button} ${customCss}`}
	>
		{children}
	</button>
);

export default Button;

Button.defaultProps = {
	isSubmit: true,
	onClick: () => {},
	customCss: '',
	children: {},
};

Button.propTypes = {
	isSubmit: PropTypes.bool,
	onClick: PropTypes.func,
	customCss: PropTypes.string,
	children: PropTypes.node,
};
