/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import styles from './Input.module.css';

const Input = ({
	label,
	isValid,
	id,
	type,
	minLength,
	maxLength,
	onChange,
	value,
	cssClass,
}) => (
	<div
		className={`${styles['input-container']} ${
			!isValid && styles.invalid
		} ${cssClass}`}
	>
		<label htmlFor="id">{label}</label>
		<input
			id={id}
			type={type}
			minLength={minLength}
			maxLength={maxLength}
			onChange={onChange}
			value={value}
		/>
	</div>
);

Input.defaultProps = {
	label: '',
	isValid: true,
	id: '',
	type: '',
	minLength: 6,
	maxLength: 256,
	onChange: () => {},
	value: '',
	cssClass: '',
};

Input.propTypes = {
	label: PropTypes.string,
	isValid: PropTypes.bool,
	id: PropTypes.string,
	type: PropTypes.string,
	minLength: PropTypes.number,
	maxLength: PropTypes.number,
	onChange: PropTypes.func,
	value: PropTypes.string,
	cssClass: PropTypes.string,
};

export default Input;
