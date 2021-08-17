/**
 * Validation methods.
 */
export const validateLogin = (login) => login.trim().length >= 3;

export const validateEmail = (email) =>
	email.trim().length >= 6 && email.includes('@');

export const validatePassword = (password) => password.trim().length >= 6;

/**
 * Search for a item with an id equals to the id passed as argument
 */
export const findItemById = (id, items) =>
	items ? items.filter((exercise) => exercise.id === id)[0] : undefined;

/**
 * State passed as argument needs to have a property isValid.
 * @returns - true if state is NULL, otherwise returns value.isValid
 */
export const stateIsNull = (state) =>
	state.isValid === null ? true : state.isValid;
