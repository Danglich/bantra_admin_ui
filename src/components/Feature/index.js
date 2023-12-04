import classNames from 'classnames/bind';
import styles from './Feature.module.scss';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const cx = classNames.bind(styles);

function Feature({ features }) {
    return (
        <div className={cx('container')}>
            {features.map((feature) => (
                <div key={feature.id} className={cx('feature-item')}>
                    <span className={cx('title')}>{feature?.title}</span>
                    <div className={cx('money-container')}>
                        <span className={cx('money')}>{feature?.quantity}</span>
                        <span
                            className={cx(
                                'rate',
                                feature?.rate > 100 ? 'increase' : 'reduce',
                            )}
                        >
                            {feature?.rate}
                            <ArrowDownwardIcon className={cx('icon--down')} />
                            <ArrowUpwardIcon className={cx('icon--up')} />
                        </span>
                    </div>
                    <span className={cx('subtitle')}>
                        Compared to last month
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Feature;
