import { useReducer } from 'react';
import inputReducer from '../context/reducers/Reducers';

const initInputState = {
	value: '',
	isTouched: false,
};

const UseInput = (validateInput) => {
	const [inputState, dispatch] = useReducer(inputReducer, initInputState);

	const inputIsValid = validateInput(inputState.value);

	const inputHasErrors = !inputIsValid && inputState.isTouched;

	const inputChangeHandler = (event) => {
		dispatch({ type: 'INPUT_USER', value: event.target.value });
	};

	const inputBlurHandler = () => {
		dispatch({ type: 'INPUT_BLUR' });
	};

	const inputClearHandler = () => {
		dispatch({ type: 'INPUT_CLEAR' });
	};

	const setInputValue = (value) => {
		dispatch({ type: 'INPUT_USER', value });
	};

	return {
		value: inputState.value,
		inputHasErrors,
		inputIsValid,
		inputChangeHandler,
		inputBlurHandler,
		inputClearHandler,
		setInputValue
	};
};

export default UseInput;
