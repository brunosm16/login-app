import PropTypes from 'prop-types';
import styles from './UserItem.module.css';

const UserItem = ({login, email}) => (
    <li className={styles.item}>
        <p>{login}</p>
        <p>{email}</p>
    </li>
);

UserItem.defaultProps = {
    login: 'empty login',
    email: 'empty email'
}

UserItem.propTypes = {
    login: PropTypes.string,
    email: PropTypes.string,
}

export default UserItem;