import PropTypes from 'prop-types';
import { useState } from 'react';
import Card from '../UI/Card';
import styles from './AddUser.module.css';

const AddUser = ({ onAddUser }) => {
	// entered states
	const [enteredLogin, setEnteredLogin] = useState('');
	const [enteredPassword, setEnteredPassword] = useState('');
	const [enteredEmail, setEnteredEmail] = useState('');

	// validation states
	const [isLoginValid, setIsLoginValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);

	// check if string length is zero
	const validStrInput = (str) => str.trim().length !== 0;

	const areInputsValid = () => {
		const loginValid = validStrInput(enteredLogin);
		const passwordValid = validStrInput(enteredPassword);
		const emailValid = validStrInput(enteredEmail);

		// update states
		setIsLoginValid(loginValid);
		setIsPasswordValid(passwordValid);
		setIsEmailValid(emailValid);

		return loginValid && passwordValid && emailValid;
	};

	const resetStates = () => {
		setEnteredLogin('');
		setEnteredPassword('');
		setEnteredEmail('');
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const validForm = areInputsValid();

		if (validForm) {
			onAddUser({
				login: enteredLogin,
				password: enteredPassword,
				email: enteredEmail,
			});

			// reset form
			resetStates();
		}
	};

	const loginHandler = (event) => {
		setEnteredLogin(event.target.value);
	};

	const passwordHandler = (event) => {
		setEnteredPassword(event.target.value);
	};

	const emailHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	return (
		<Card className={styles.form}>
			<form onSubmit={handleSubmit}>
				{/* Login field */}
				<div
					className={`${styles['form-control']} ${
						!isLoginValid && styles.invalid
					}`}
				>
					<label htmlFor="login">Login</label>
					<input
						id="login"
						type="text"
						onChange={loginHandler}
						value={enteredLogin}
					/>
				</div>

				{/* Email field */}
				<div
					className={`${styles['form-control']} ${
						!isEmailValid && styles.invalid
					}`}
				>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						onChange={emailHandler}
						value={enteredEmail}
					/>
				</div>

				{/* Password field */}
				<div
					className={`${styles['form-control']} ${
						!isPasswordValid && styles.invalid
					}`}
				>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						minLength={5}
						maxLength={35}
						onChange={passwordHandler}
						value={enteredPassword}
					/>
				</div>

				{/* Buttons */}
				<div className={styles.actions}>
					<div className={styles.action}>
						<button type="submit">sign in</button>
					</div>
				</div>
			</form>
		</Card>
	);
};

AddUser.defaultProps = {
	onAddUser: () => {},
};

AddUser.propTypes = {
	onAddUser: PropTypes.func,
};

export default AddUser;
