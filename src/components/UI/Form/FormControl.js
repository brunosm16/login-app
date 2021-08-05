import PropTypes from 'prop-types';
import styles from './FormControl.module.css';

const FormControl = ({ children }) => (
	<div className={`${styles['form-control']}`}>{children}</div>
);

FormControl.defaultProps = {
	children: {},
};

FormControl.propTypes = {
	children: PropTypes.node,
};

export default FormControl;
