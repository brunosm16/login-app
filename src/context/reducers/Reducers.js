const INPUT = 'INPUT_USER';
const BLUR = 'INPUT_BLUR';
const CLEAR = 'INPUT_CLEAR';

const inputReducer = (state, action) => {
	if (action.type === INPUT) {
		return { value: action.value, isTouched: state.isTouched };
	}

	if (action.type === BLUR) {
		return { value: state.value, isTouched: true };
	}

	if (action.type === CLEAR) {
		return { value: '', isTouched: false };
	}

	return inputReducer;
};

export default inputReducer;