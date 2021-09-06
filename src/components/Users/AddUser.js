import React, { useEffect, useContext, useRef } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import styles from './AddUser.module.css';
import UsersContext from '../../context/users-context';
import UseHttp from '../../hooks/use-http';
import {
	findItemById,
	validateEmail,
	validateLogin,
	validatePassword,
} from '../../utils/Utils';
import { ENDPOINT, modalRequestError } from '../../utils/HttpUtils';
import UseInput from '../../hooks/use-input';

const AddUser = () => {
	const {
		value: loginValue,
		inputHasErrors: loginHasError,
		inputIsValid: loginIsValid,
		inputChangeHandler: loginChangeHandler,
		inputBlurHandler: loginBlurHandler,
		inputClearHandler: loginClearHandler,
		setInputValue: setLoginValue,
	} = UseInput(validateLogin);

	const {
		value: emailValue,
		inputHasErrors: emailHasError,
		inputIsValid: emailIsValid,
		inputChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		inputClearHandler: emailClearHandler,
		setInputValue: setEmailValue,
	} = UseInput(validateEmail);

	const {
		value: passwordValue,
		inputHasErrors: passwordHasError,
		inputIsValid: passwordIsValid,
		inputChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordBlurHandler,
		inputClearHandler: passwordClearHandler,
	} = UseInput(validatePassword);

	const { sendRequest: postRequest } = UseHttp();
	const { sendRequest: patchRequest } = UseHttp();

	const formIsValid = loginIsValid && emailIsValid && passwordIsValid;

	const usersCtx = useContext(UsersContext);
	const { editId, users } = usersCtx;
	const editUser = findItemById(editId, users);

	const loginRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	/**
	 * On edit operation, a new value for editUser is set,
	 * and useEffect updates input states with editUser properties.
	 */

	useEffect(() => editUser && setLoginValue(editUser.login), [editUser]);
	useEffect(() => editUser && setEmailValue(editUser.email), [editUser]);

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

	const openCloseModal = () => {
		usersCtx.handleOpenCloseModal(modalRequestError);
	};

	const findFocusInput = () => {
		if (!loginIsValid) {
			loginRef.current.focus();
			return;
		}

		if (!emailIsValid) {
			emailRef.current.focus();
			return;
		}

		if (!passwordIsValid) {
			passwordRef.current.focus();
		}
	};

	/**  Reset states used in Form */
	const resetForm = () => {
		loginClearHandler();
		emailClearHandler();
		passwordClearHandler();
	};

	const saveInput = () => {
		const inputObj = {
			login: loginValue,
			password: passwordValue,
			email: emailValue,
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

	/** On first page load set isValid to false,
	 * if user tries to input a empty value
	 */
	const blurInputs = () => {
		loginBlurHandler();
		passwordBlurHandler();
		emailBlurHandler();
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		blurInputs();

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
								isInvalid={loginHasError}
								id="login"
								type="text"
								onChange={loginChangeHandler}
								onBlur={loginBlurHandler}
								value={loginValue}
								ref={loginRef}
								cssClass={styles['control-input']}
							/>
							{loginHasError && (
								<p className={styles['error-msg']}>
									Login must have at least 3 characters
								</p>
							)}
						</div>

						<div className={styles.control}>
							<Input
								label="email"
								isInvalid={emailHasError}
								id="email"
								type="email"
								onChange={emailChangeHandler}
								onBlur={emailBlurHandler}
								value={emailValue}
								ref={emailRef}
								cssClass={styles['control-input']}
							/>
							{emailHasError && (
								<p className={styles['error-msg']}>
									Email must have at least 6 characters and include @.
								</p>
							)}
						</div>

						<div className={styles.control}>
							<Input
								label="password"
								isInvalid={passwordHasError}
								id="password"
								type="password"
								onChange={passwordChangeHandler}
								onBlur={passwordBlurHandler}
								value={passwordValue}
								ref={passwordRef}
								cssClass={styles['control-input']}
							/>
							{passwordHasError && (
								<p className={styles['error-msg']}>
									Password must have at least 6 characters
								</p>
							)}
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
