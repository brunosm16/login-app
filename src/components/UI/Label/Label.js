/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import styles from './Label.module.css';

const Label = ({ htmlFor, children }) => (
	<label className={styles.label} htmlFor={htmlFor}>
		{children}
	</label>
);

Label.defaultProps = {
	children: {},
	htmlFor: '',
};

Label.propTypes = {
	children: PropTypes.node,
	htmlFor: PropTypes.string,
};

export default Label;
