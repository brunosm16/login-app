import { useState, useEffect, useReducer, useContext, useRef } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import FormControl from '../UI/Form/FormControl';
import ErrorModal from '../UI/Modal/ErrorModal';
import styles from './AddUser.module.css';
import UsersContext from '../../context/users-context';
import {
	loginReducer,
	emailReducer,
	passwordReducer,
} from '../../context/reducers/Reducers';
import { findItemById, stateIsNull } from '../../utils/Utils';

const AddUser = () => {
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

	const [formIsValid, setFormIsValid] = useState(true);
	const [modalError, setModalError] = useState();

	const usersCtx = useContext(UsersContext);
	const [editId, users] = [usersCtx.editId, usersCtx.users];
	const editUser = findItemById(editId, users);

	const loginRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	/**
	 * Null is the initial value of name, on first page load,
	 * input is valid because user didn't enter any input.
	 */
	const loginIsNull = stateIsNull(loginState);
	const emailIsNull = stateIsNull(emailState);
	const passwordIsNull = stateIsNull(passwordState);

	/**
	 * On edit operation, a new value for editUser is set,
	 * and useEffect updates input states with editUser properties.
	 */

	useEffect(
		() =>
			editUser &&
			dispatchLogin({
				type: 'INPUT_USER',
				val: editUser.login,
			}),
		[editUser]
	);

	useEffect(
		() =>
			editUser && dispatchEmail({ type: 'INPUT_USER', val: editUser.email }),
		[editUser]
	);

	/** Validate form when input changes */
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

	const findFocusInput = () => {
		if (!loginState.isValid) {
			loginRef.current.focus();
			return;
		}

		if (!emailState.isValid) {
			emailRef.current.focus();
			return;
		}

		if (!passwordState.isValid) {
			passwordRef.current.focus();
		}
	};

	/**  Reset states used in Form */
	const resetForm = () => {
		dispatchLogin({});
		dispatchEmail({});
		dispatchPassword({});
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

		/** Focus on invalid Input */
		findFocusInput();
	};

	const saveInput = () => {
		usersCtx.handleAddUser({
			id: editId || Math.random(),
			login: loginState.value,
			password: passwordState.value,
			email: emailState.value,
		});

		/** Reset form */
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

		/** On first page load set isValid to false,
		 * if user tries to input a empty value
		 */
		dispatchLogin({ type: 'INPUT_BLUR' });
		dispatchPassword({ type: 'INPUT_BLUR' });
		dispatchEmail({ type: 'INPUT_BLUR' });

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
							isValid={loginIsNull}
							id="login"
							type="text"
							onChange={loginHandler}
							onBlur={loginValidateHandler}
							value={loginState.value}
							ref={loginRef}
						/>
					</FormControl>

					{/* Email field */}
					<FormControl>
						<Input
							label="email"
							isValid={emailIsNull}
							id="email"
							type="email"
							onChange={emailHandler}
							onBlur={emailValidateHandler}
							value={emailState.value}
							ref={emailRef}
						/>
					</FormControl>

					{/* Password field */}
					<FormControl>
						<Input
							label="password"
							isValid={passwordIsNull}
							id="password"
							type="password"
							onChange={passwordHandler}
							onBlur={passwordValidateHandler}
							value={passwordState.value}
							ref={passwordRef}
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
