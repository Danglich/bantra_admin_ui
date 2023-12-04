import classNames from 'classnames/bind';
import styles from './ModalLoading.module.scss';

const cx = classNames.bind(styles);

function ModalLoding() {
    return (
        <div className={cx('container')}>
            <div className={cx('spinner')}></div>
            <span className={cx('title')}>Loading....</span>
        </div>
    );
}

export default ModalLoding;
