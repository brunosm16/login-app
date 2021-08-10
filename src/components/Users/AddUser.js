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

	// check if data was passed to edit login
	const editLogin = editUserLogin || enteredLogin;
	const editEmail = editUserEmail || enteredEmail;

	// validation states
	const [isLoginValid, setIsLoginValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [formIsValid, setFormIsValid] = useState(true);
	const [modalError, setModalError] = useState();

	const verifyLogin = (login) => login.trim().length > 6;
	const verifyEmail = (email) => email.trim().length > 6 && email.includes('@');
	const verifyPassword = (password) => password.trim().length > 6;

	useEffect(() => {
		setEnteredLogin(editLogin);
	}, [editLogin]);

	useEffect(() => {
		setEnteredEmail(editEmail);
	}, [editEmail]);

	// validate form when inputs are changed
	useEffect(() => {
		const loginValidation = verifyLogin(enteredLogin);
		const emailValidation = verifyEmail(enteredEmail);
		const passwordValidation = verifyPassword(enteredPassword);

		setFormIsValid(loginValidation && emailValidation && passwordValidation);
	}, [enteredLogin, enteredEmail, enteredPassword]);

	const resetStates = () => {
		setEnteredLogin('');
		setEnteredPassword('');
		setEnteredEmail('');
	};

	const loginHandler = (event) => {
		setEnteredLogin(event.target.value);
	};

	const loginValidateHandler = () => {
		setIsLoginValid(verifyLogin(enteredLogin));
		console.log(verifyLogin(enteredLogin));
	};

	const passwordHandler = (event) => {
		setEnteredPassword(event.target.value);
	};

	const passwordValidateHandler = (event) => {
		setIsPasswordValid(verifyPassword(event.target.value));
	};

	const emailHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const emailValidateHandler = (event) => {
		setIsEmailValid(verifyEmail(event.target.value));
	};

	const modalHandler = () => {
		setModalError(null);
	};

	const saveData = () => {
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
	};

	const showModal = () => {
		setModalError({
			title: 'Invalid input',
			message: 'Please enter a valid name, password and age (non-empty values)',
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (formIsValid) {
			saveData();
		} else {
			showModal();
		}
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
							onBlur={loginValidateHandler}
							value={enteredLogin}
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
							onBlur={emailValidateHandler}
							value={enteredEmail}
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
							onBlur={passwordValidateHandler}
							value={enteredPassword}
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
