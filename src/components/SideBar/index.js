import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Link, useLocation } from 'react-router-dom';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ClassIcon from '@mui/icons-material/Class';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const cx = classNames.bind(styles);

function SideBar() {
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <div className={cx('container')}>
            <div className={cx('sidebar-menu')}>
                <span className={cx('menu-title')}>Dashboard</span>
                <ul className={cx('list')}>
                    <Link
                        to={'/'}
                        className={cx('item', pathName === '/' ? 'active' : '')}
                    >
                        <MicrowaveIcon className={cx('icon')} />
                        <span className={cx('title')}>Home</span>
                    </Link>
                    {/* <li className={cx('item')}>
                        <TimelineIcon className={cx('icon')} />
                        <span className={cx('title')}>Analytics</span>
                    </li>
                    <li className={cx('item')}>
                        <TrendingUpIcon className={cx('icon')} />
                        <span className={cx('title')}>Sales</span>
                    </li> */}
                </ul>
            </div>
            <div className={cx('sidebar-menu')}>
                <span className={cx('menu-title')}>Quick Menu</span>
                <ul className={cx('list')}>
                    <Link
                        to={'/users'}
                        className={cx(
                            'item',
                            pathName === '/users' ? 'active' : '',
                        )}
                    >
                        <PermIdentityIcon className={cx('icon')} />
                        <span className={cx('title')}>Người dùng</span>
                    </Link>
                    <Link
                        to={'/products'}
                        className={cx(
                            'item',
                            pathName === '/products' ? 'active' : '',
                        )}
                    >
                        <ClassIcon className={cx('icon')} />
                        <span className={cx('title')}>Sản phẩm</span>
                    </Link>
                    <Link
                        to={'/orders'}
                        className={cx(
                            'item',
                            pathName === '/orders' ? 'active' : '',
                        )}
                    >
                        <LocalShippingIcon className={cx('icon')} />
                        <span className={cx('title')}>Đơn hàng</span>
                    </Link>
                    <Link
                        to={'/reviews'}
                        className={cx(
                            'item',
                            pathName === '/reviews' ? 'active' : '',
                        )}
                    >
                        <ReviewsIcon className={cx('icon')} />
                        <span className={cx('title')}>Đánh giá</span>
                    </Link>
                    <Link
                        to={'/promotions'}
                        className={cx(
                            'item',
                            pathName === '/promotions' ? 'active' : '',
                        )}
                    >
                        <CardGiftcardIcon className={cx('icon')} />
                        <span className={cx('title')}>Khuyến mãi</span>
                    </Link>
                    <Link
                        to={'/news'}
                        className={cx(
                            'item',
                            pathName === '/news' ? 'active' : '',
                        )}
                    >
                        <NewspaperIcon className={cx('icon')} />
                        <span className={cx('title')}>Tin tức</span>
                    </Link>
                    <Link
                        to={'/contacts'}
                        className={cx(
                            'item',
                            pathName === '/contacts' ? 'active' : '',
                        )}
                    >
                        <PermIdentityIcon className={cx('icon')} />
                        <span className={cx('title')}>Liên hệ</span>
                    </Link>
                    {/* <li className={cx('item')}>
                        <LocalAtmIcon className={cx('icon')} />
                        <span className={cx('title')}>Transactions</span>
                    </li>
                    <li className={cx('item')}>
                        <LeaderboardIcon className={cx('icon')} />
                        <span className={cx('title')}>Reports</span>
                    </li> */}
                </ul>
            </div>
            <div className={cx('sidebar-menu')}>
                <span className={cx('menu-title')}>Notifications</span>
                <ul className={cx('list')}>
                    <li className={cx('item')}>
                        <MailOutlineIcon className={cx('icon')} />
                        <span className={cx('title')}>Mail</span>
                    </li>
                    <li className={cx('item')}>
                        <DynamicFeedIcon className={cx('icon')} />
                        <span className={cx('title')}>Feedback</span>
                    </li>
                    <li className={cx('item')}>
                        <ChatBubbleOutlineIcon className={cx('icon')} />
                        <span className={cx('title')}>Messages</span>
                    </li>
                </ul>
            </div>
            <div className={cx('sidebar-menu')}>
                <span className={cx('menu-title')}>Staff</span>
                <ul className={cx('list')}>
                    <li className={cx('item')}>
                        <WorkOutlineIcon className={cx('icon')} />
                        <span className={cx('title')}>Manage</span>
                    </li>
                    <li className={cx('item')}>
                        <TimelineIcon className={cx('icon')} />
                        <span className={cx('title')}>Analytics</span>
                    </li>
                    <li className={cx('item')}>
                        <ReportGmailerrorredIcon className={cx('icon')} />
                        <span className={cx('title')}>Reports</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
