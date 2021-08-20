import PropTypes from 'prop-types';
import React, { useRef, useImperativeHandle } from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef(
	(
		{ label, isValid, id, type, min, max, onChange, onBlur, value, cssClass },
		ref
	) => {
		const inputRef = useRef();

		const activate = () => {
			inputRef.current.focus();
		};

		useImperativeHandle(ref, () => ({
			focus: activate,
		}));

		return (
			<div
				className={`${styles.container} ${
					!isValid && styles.invalid
				} ${cssClass}`}
			>
				<label htmlFor={id}>{label}</label>
				<input
					id={id}
					type={type}
					min={min}
					max={max}
					onChange={onChange}
					onBlur={onBlur}
					value={value}
					ref={inputRef}
				/>
			</div>
		);
	}
);

Input.defaultProps = {
	label: '',
	isValid: true,
	id: '',
	type: '',
	min: 6,
	max: 256,
	onChange: () => {},
	onBlur: () => {},
	value: '',
	cssClass: '',
};

Input.propTypes = {
	label: PropTypes.string,
	isValid: PropTypes.bool,
	id: PropTypes.string,
	type: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	value: PropTypes.string,
	cssClass: PropTypes.string,
};

export default Input;
