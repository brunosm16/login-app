import { useEffect, useRef } from 'react';

const UseIsMounted = () => {
	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	return isMounted;
};

export default UseIsMounted;
