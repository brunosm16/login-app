import {
	validateLogin,
	validateEmail,
	validatePassword,
} from '../../utils/Utils';

const USER = 'INPUT_USER';
const BLUR = 'INPUT_BLUR';

export const loginReducer = (state, action) => {
	if (action.type === USER) {
		return { value: action.val, isValid: validateLogin(action.val || '') };
	}

	if (action.type === BLUR) {
		return { value: state.value, isValid: validateLogin(state.value || '') };
	}

	return { value: '', isValid: true };
};

export const passwordReducer = (state, action) => {
	if (action.type === USER) {
		return { value: action.val, isValid: validatePassword(action.val || '') };
	}

	if (action.type === BLUR) {
		return { value: state.value, isValid: validatePassword(state.value || '') };
	}

	return { value: '', isValid: true };
};

export const emailReducer = (state, action) => {
	if (action.type === USER) {
		return { value: action.val, isValid: validateEmail(action.val || '') };
	}

	if (action.type === BLUR) {
		return { value: state.value, isValid: validateEmail(state.value || '') };
	}

	return { value: '', isValid: true };
};
