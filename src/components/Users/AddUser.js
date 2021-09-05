import React, {
	useState,
	useEffect,
	useReducer,
	useContext,
	useRef,
} from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import styles from './AddUser.module.css';
import UsersContext from '../../context/users-context';
import UseHttp from '../../hooks/use-http';
import {
	loginReducer,
	emailReducer,
	passwordReducer,
} from '../../context/reducers/Reducers';
import { findItemById, stateIsNull } from '../../utils/Utils';
import ENDPOINT from '../../utils/HttpUtils';

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

	const { sendRequest: postRequest } = UseHttp();
	const { sendRequest: patchRequest } = UseHttp();

	const [formIsValid, setFormIsValid] = useState(true);

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

	const updateUser = (user) => {
		const updatedUser = {
			...user,
			id: editId,
		};

		usersCtx.handleUpdateUser(updatedUser);
	};

	const insertUser = (user, userData) => {
		const insertedUser = {
			...user,
			id: userData.name,
		};
		usersCtx.handleInsertUser(insertedUser);
	};

	const openCloseModal = (errorObj) => {
		usersCtx.handleUpdateModal(errorObj);
	};

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
		dispatchLogin({ type: 'INPUT_CLEAR' });
		dispatchEmail({ type: 'INPUT_CLEAR' });
		dispatchPassword({ type: 'INPUT_CLEAR' });
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

	const saveInput = () => {
		const inputObj = {
			login: loginState.value,
			password: passwordState.value,
			email: emailState.value,
		};

		const reqObj = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// Patch operation
		if (editId) {
			reqObj.method = 'PATCH';
			reqObj.url = `${ENDPOINT}/users/${editId}/.json`;
			reqObj.body = inputObj;

			patchRequest(reqObj, updateUser, openCloseModal);

			usersCtx.handleSetEditId(null);
		} else {
			reqObj.method = 'POST';
			reqObj.url = `${ENDPOINT}/users.json`;
			reqObj.body = inputObj;

			postRequest(reqObj, insertUser.bind(null, inputObj), openCloseModal);
		}

		/** Reset form */
		resetForm();
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		/** On first page load set isValid to false,
		 * if user tries to input a empty value
		 */
		dispatchLogin({ type: 'INPUT_BLUR' });
		dispatchPassword({ type: 'INPUT_BLUR' });
		dispatchEmail({ type: 'INPUT_BLUR' });

		return formIsValid ? saveInput() : findFocusInput();
	};

	return (
		<>
			<Card cssClass={styles['form-container']}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.controls}>
						<div className={styles.control}>
							<Input
								label="login"
								isValid={loginIsNull}
								id="login"
								type="text"
								onChange={loginHandler}
								onBlur={loginValidateHandler}
								value={loginState.value}
								ref={loginRef}
								cssClass={styles['control-input']}
							/>
						</div>

						<div className={styles.control}>
							<Input
								label="email"
								isValid={emailIsNull}
								id="email"
								type="email"
								onChange={emailHandler}
								onBlur={emailValidateHandler}
								value={emailState.value}
								ref={emailRef}
								cssClass={styles['control-input']}
							/>
						</div>

						<div className={styles.control}>
							<Input
								label="password"
								isValid={passwordIsNull}
								id="password"
								type="password"
								onChange={passwordHandler}
								onBlur={passwordValidateHandler}
								value={passwordState.value}
								ref={passwordRef}
								cssClass={styles['control-input']}
							/>
						</div>
					</div>

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
		</>
	);
};

export default AddUser;
