import PropTypes from 'prop-types';
import { useState } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';
import FormControl from '../UI/Form/FormControl';
import ErrorModal from '../UI/Modal/ErrorModal';

import styles from './AddUser.module.css';

const AddUser = ({ onAddUser }) => {
	// entered states
	const [enteredLogin, setEnteredLogin] = useState('');
	const [enteredPassword, setEnteredPassword] = useState('');
	const [enteredEmail, setEnteredEmail] = useState('');

	// fields lengths lower limit
	const strMin = 6;
	const strMax = 256;

	// validation states
	const [isLoginValid, setIsLoginValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [modalError, setModalError] = useState();

	// check if string length is zero
	const validStrInput = (str) => str.trim().length !== 0;

	const areInputsValid = () => {
		const loginValid = validStrInput(enteredLogin);
		const passwordValid = validStrInput(enteredPassword);
		const emailValid = validStrInput(enteredEmail);

		if (!loginValid || !passwordValid || !emailValid) {
			setModalError({
				title: 'Invalid input',
				message:
					'Please enter a valid name, password and age (non-empty values)',
			});
		}

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

	const modalHandler = () => {
		console.log('here');
		setModalError(null);
	};

	return (
		<div>
			{modalError && (
				<ErrorModal
					title={modalError.title}
					message={modalError.message}
					onCloseModal={modalHandler}
				/>
			)}
			<Card cssClass={styles.form}>
				<form onSubmit={handleSubmit}>
					{/* Login field */}
					<FormControl isInvalid={isLoginValid}>
						<Label htmlFor="login">Login</Label>
						<Input
							id="login"
							type="text"
							onChange={loginHandler}
							value={enteredLogin}
							minLength={strMin}
							maxLength={strMax}
						/>
					</FormControl>

					{/* Email field */}
					<FormControl isInvalid={isEmailValid}>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							onChange={emailHandler}
							value={enteredEmail}
							minLength={strMin}
							maxLength={strMax}
						/>
					</FormControl>

					{/* Password field */}
					<FormControl isInvalid={isPasswordValid}>
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							onChange={passwordHandler}
							value={enteredPassword}
							minLength={strMin}
							maxLength={strMax}
						/>
					</FormControl>

					{/* Buttons */}
					<div className={styles.actions}>
						<div className={styles.action}>
							<Button
								isSubmit
								onClick={handleSubmit}
								customCss={styles['form-button']}
							>
								sign in
							</Button>
						</div>
					</div>
				</form>
			</Card>
		</div>
	);
};

AddUser.defaultProps = {
	onAddUser: () => {},
};

AddUser.propTypes = {
	onAddUser: PropTypes.func,
};

export default AddUser;
