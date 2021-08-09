import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import FormControl from '../UI/Form/FormControl';
import ErrorModal from '../UI/Modal/ErrorModal';
import styles from './AddUser.module.css';

const AddUser = ({ onAddUser, editUserId, editUserLogin, editUserEmail }) => {
	// entered states
	const [enteredLogin, setEnteredLogin] = useState('');
	const [enteredPassword, setEnteredPassword] = useState('');
	const [enteredEmail, setEnteredEmail] = useState('');

	const editLogin = editUserLogin || enteredLogin;
	const editEmail = editUserEmail || enteredEmail;

	useEffect(() => {
		setEnteredLogin(editLogin);
	}, [editLogin]);

	useEffect(() => {
		setEnteredEmail(editEmail);
	}, [editEmail]);

	// fields limits
	const strMin = 6;
	const strMax = 256;

	// validation states
	const [isLoginValid, setIsLoginValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [modalError, setModalError] = useState();

	const updateStates = (login, password, email) => {
		setIsLoginValid(login);
		setIsPasswordValid(password);
		setIsEmailValid(email);
	};

	const resetStates = () => {
		setEnteredLogin('');
		setEnteredPassword('');
		setEnteredEmail('');
	};

	// check if string length is zero
	const validStrInput = (str) => str.trim().length !== 0;

	const areInputsValid = () => {
		const loginValid = validStrInput(enteredLogin);
		const passwordValid = validStrInput(enteredPassword);
		const emailValid = validStrInput(enteredEmail);

		// update states
		updateStates(loginValid, passwordValid, emailValid);

		return loginValid && passwordValid && emailValid;
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (areInputsValid()) {
			// send data to be saved
			onAddUser({
				// checks if user already has an id, in this case
				// user is getting updated
				// eslint-disable-next-line no-unneeded-ternary
				id: editUserId || Math.random(),
				login: enteredLogin,
				password: enteredPassword,
				email: enteredEmail,
			});

			// reset form
			resetStates();
		} else {
			setModalError({
				title: 'Invalid input',
				message:
					'Please enter a valid name, password and age (non-empty values)',
			});
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
					<FormControl>
						<Input
							label="login"
							isValid={isLoginValid}
							id="login"
							type="text"
							onChange={loginHandler}
							value={enteredLogin}
							minLength={strMin}
							maxLength={strMax}
						/>
					</FormControl>

					{/* Email field */}
					<FormControl>
						<Input
							label="email"
							isValid={isEmailValid}
							id="email"
							type="email"
							onChange={emailHandler}
							value={enteredEmail}
							minLength={strMin}
							maxLength={strMax}
						/>
					</FormControl>

					{/* Password field */}
					<FormControl>
						<Input
							label="password"
							isValid={isPasswordValid}
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
								cssClass={styles['form-button']}
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
	editUserId: undefined,
	editUserLogin: '',
	editUserEmail: '',
};

AddUser.propTypes = {
	onAddUser: PropTypes.func,
	editUserId: PropTypes.number,
	editUserLogin: PropTypes.string,
	editUserEmail: PropTypes.string,
};

export default AddUser;
