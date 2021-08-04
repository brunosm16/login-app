import PropTypes from 'prop-types';
import styles from './Input.module.css';

const Input = ({
	id,
	type,
	minLength,
	maxLength,
	onChange,
	value,
	cssClass,
}) => (
	<input
		className={`${styles.input} ${cssClass}`}
		id={id}
		type={type}
		minLength={minLength}
		maxLength={maxLength}
		onChange={onChange}
		value={value}
	/>
);

Input.defaultProps = {
	id: '',
	type: '',
	minLength: 6,
	maxLength: 256,
	onChange: () => {},
	value: '',
	cssClass: '',
};

Input.propTypes = {
	id: PropTypes.string,
	type: PropTypes.string,
	minLength: PropTypes.number,
	maxLength: PropTypes.number,
	onChange: PropTypes.func,
	value: PropTypes.string,
	cssClass: PropTypes.string,
};

export default Input;
