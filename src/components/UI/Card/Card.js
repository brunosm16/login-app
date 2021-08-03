import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({ cssClass, children }) => (
	<div className={`${styles.card} ${cssClass}`}>{children}</div>
);

Card.defaultProps = {
	cssClass: '',
	children: {},
};

Card.propTypes = {
	cssClass: PropTypes.string,
	children: PropTypes.node,
};

export default Card;
