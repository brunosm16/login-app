import PropTypes from 'prop-types';
import styles from './FormControl.module.css';

const FormControl = ({ children, isInvalid }) => (
	<div className={`${styles['form-control']} ${!isInvalid && styles.invalid}`}>
		{children}
	</div>
);

FormControl.defaultProps = {
	children: {},
	isInvalid: false,
};

FormControl.propTypes = {
	children: PropTypes.node,
	isInvalid: PropTypes.bool,
};

export default FormControl;
