import { useState, useEffect, useReducer, useContext } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import FormControl from '../UI/Form/FormControl';
import ErrorModal from '../UI/Modal/ErrorModal';
import styles from './AddUser.module.css';
import UsersContext from '../../context/users-context';

const validateLogin = (login) => login.trim().length >= 3;
const validateEmail = (email) =>
	email.trim().length >= 6 && email.includes('@');
const validatePassword = (password) => password.trim().length >= 6;

const loginReducer = (state, action) => {
	if (action.type === 'INPUT_USER') {
		return { value: action.val, isValid: validateLogin(action.val || '') };
	}

	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: validateLogin(state.value || '') };
	}

	return { value: '', isValid: true };
};

const passwordReducer = (state, action) => {
	if (action.type === 'INPUT_USER') {
		return { value: action.val, isValid: validatePassword(action.val || '') };
	}

	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: validatePassword(state.value || '') };
	}

	return { value: '', isValid: true };
};

const emailReducer = (state, action) => {
	if (action.type === 'INPUT_USER') {
		return { value: action.val, isValid: validateEmail(action.val || '') };
	}

	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: validateEmail(state.value || '') };
	}

	return { value: '', isValid: true };
};

const AddUser = () => {
	const usersCtx = useContext(UsersContext);

	const [editId, users] = [usersCtx.editId, usersCtx.users];

	const editUser = () => {
		if (users) {
			return users.filter((user) => user.id === editId)[0];
		}
		return undefined;
	};

	const editLogin = editUser() ? editUser().login : undefined;
	const editEmail = editUser() ? editUser().email : undefined;

	const [formIsValid, setFormIsValid] = useState(true);
	const [modalError, setModalError] = useState();

	const [loginState, dispatchLogin] = useReducer(loginReducer, {
		value: '',
		isValid: null,
	});

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null,
	});

	useEffect(() => {
		dispatchLogin({ type: 'INPUT_USER', val: editLogin || loginState.value });
	}, [editLogin]);

	useEffect(() => {
		dispatchEmail({
			type: 'INPUT_USER',
			val: editEmail || passwordState.value,
		});
	}, [editEmail]);

	// Validate form when input changes
	useEffect(() => {
		const debouncerId = setTimeout(() => {
			setFormIsValid(
				loginState.isValid && emailState.isValid && passwordState.isValid
			);
		}, 500);

		return () => {
			clearTimeout(debouncerId);
		};
	}, [loginState, emailState, passwordState]);

	// Reset states used in Form
	const resetForm = () => {
		dispatchLogin({ type: 'INPUT_USER', val: '' });
		dispatchEmail({ type: 'INPUT_USER', val: '' });
		dispatchPassword({ type: 'INPUT_USER', val: '' });
	};

	const loginHandler = (event) => {
		dispatchLogin({ type: 'INPUT_USER', val: event.target.value });
	};

	const loginValidateHandler = () => {
		dispatchLogin({ type: 'INPUT_BLUR' });
	};

	const passwordHandler = (event) => {
		dispatchPassword({ type: 'INPUT_USER', val: event.target.value });
	};

	const passwordValidateHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' });
	};

	const emailHandler = (event) => {
		dispatchEmail({ type: 'INPUT_USER', val: event.target.value });
	};

	const emailValidateHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	const modalHandler = () => {
		setModalError(null);
	};

	const saveInput = () => {
		usersCtx.handleAddUser({
			id: editId || Math.random(),
			login: loginState.value,
			password: passwordState.value,
			email: emailState.value,
		});

		// reset form
		resetForm();
	};

	const showModal = () => {
		setModalError({
			title: 'Invalid input',
			message: 'Please enter a valid name, password and age (non-empty values)',
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		return formIsValid ? saveInput() : showModal();
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
							isValid={loginState.isValid}
							id="login"
							type="text"
							onChange={loginHandler}
							onBlur={loginValidateHandler}
							value={loginState.value}
						/>
					</FormControl>

					{/* Email field */}
					<FormControl>
						<Input
							label="email"
							isValid={emailState.isValid}
							id="email"
							type="email"
							onChange={emailHandler}
							onBlur={emailValidateHandler}
							value={emailState.value}
						/>
					</FormControl>

					{/* Password field */}
					<FormControl>
						<Input
							label="password"
							isValid={passwordState.isValid}
							id="password"
							type="password"
							onChange={passwordHandler}
							onBlur={passwordValidateHandler}
							value={passwordState.value}
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

export default AddUser;
