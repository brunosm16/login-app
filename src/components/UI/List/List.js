import PropTypes from 'prop-types';
import styles from './List.module.css';

const List = ({ children, cssClass }) => (
	<ul className={`${styles.list} ${cssClass}`}>{children}</ul>
);

List.defaultProps = {
	children: {},
	cssClass: '',
};

List.propTypes = {
	children: PropTypes.node,
	cssClass: PropTypes.string,
};

export default List;
