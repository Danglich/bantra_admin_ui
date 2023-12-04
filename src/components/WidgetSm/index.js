import classNames from 'classnames/bind';
import styles from '../WidgetLg/WidgetLg.module.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function WidgetSm({ data }) {
    const handleDeleteReview = async (reviewId) => {
        if (
            window.confirm('Bạn có chắc chắn muốn xóa bài đánh giá này không ?')
        ) {
            await axios.delete(
                `http://localhost:8080/api/admin/reviews/${reviewId}`,
            );
        }
    };

    return (
        <div className={cx('container')}>
            <span className={cx('title')}>Những bài đánh giá mới nhất</span>
            <table className={`${cx('newVideo-table')} border-separate`}>
                <thead>
                    <tr>
                        <th className={cx('table-th')}>Email</th>
                        <th className={cx('table-th')}>Nội dung</th>
                        <th className={cx('table-th')}>Sao</th>
                        <th className={cx('table-th')}>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((review) => (
                        <tr
                            key={review?._id}
                            className={`${cx('newVideo-item')} py-[4px]`}
                        >
                            <td className={cx('video')}>
                                <Link to={`users/${review.user.id}`}>
                                    {review.user.email}
                                </Link>
                            </td>

                            <td className={cx('video')}>{review.content}</td>
                            <td className={cx('nickname')}>{review.rate}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        handleDeleteReview(review.id)
                                    }
                                    className="px-[12px] py-[4px] rounded-md bg-red-500 text-white"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    );
}

export default WidgetSm;
