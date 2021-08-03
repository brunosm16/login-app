import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({ className, children }) => (
	<div className={`${styles.card} ${className}`}>{children}</div>
);

Card.defaultProps = {
	className: '',
	children: PropTypes.node,
};

Card.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

export default Card;
