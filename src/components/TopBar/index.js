import classNames from 'classnames/bind';
import styles from './TopBar.module.scss';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useContext } from 'react';
import { urlWeb } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import { message } from 'antd';

const cx = classNames.bind(styles);

function TopBar() {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        message.success('Đã đăng suất');
    };

    return (
        <div className={cx('container')}>
            <Link to="/">
                <h1 className={cx('logo')}>Admin</h1>
            </Link>
            <div className={cx('right')}>
                <Link to="newProduct" className={cx('create-btn')}>
                    Tạo sản phẩm mới
                </Link>
                <Link to="addNews" className={cx('create-btn')}>
                    Tạo tin tức mới
                </Link>
                <a href={urlWeb} className={cx('link-to-web')}>
                    Web
                </a>
                <NotificationsNoneIcon className={cx('icon')} />
                <SettingsIcon className={cx('icon')} />
                <div className={cx('user')}>
                    <img
                        className={cx('avatar')}
                        src={
                            user?.image_url ||
                            'https://www.shutterstock.com/shutterstock/photos/1153673752/display_1500/stock-vector-profile-placeholder-image-gray-silhouette-no-photo-1153673752.jpg'
                        }
                        alt=""
                    ></img>
                    <ul className={cx('option')}>
                        <Link
                            to={`user/${user?.id}`}
                            state={user}
                            className={cx('item')}
                        >
                            <PersonIcon className={cx('icon')} />
                            Hồ sơ
                        </Link>
                        <li className={cx('item')} onClick={handleLogout}>
                            <LogoutIcon className={cx('icon')} />
                            Logout
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
