import classNames from 'classnames/bind';
import styles from './WidgetLg.module.scss';

const cx = classNames.bind(styles);

const getStatusColor = (status) => {
    switch (status) {
        case 'PENDING':
            return 'bg-blue-500 text-white';
        case 'SENDING':
            return 'bg-yellow-500 text-black';
        case 'SENT':
            return 'bg-green-500 text-white';
        case 'CANCELLED':
            return 'bg-red-500 text-white';
        default:
            return '';
    }
};

function WidgetLg({ data }) {
    const handleOrderClick = (orderId) => {
        // Chuyển hướng đến trang đơn hàng chi tiết với orderId
        window.location.href = `/orders/${orderId}`;
    };

    return (
        <div className={cx('container')}>
            <span className={cx('title')}>Đơn hàng mới nhất</span>
            <table className={`${cx('newVideo-table')} border-separate`}>
                <thead>
                    <tr>
                        <th className={cx('table-th')}>Ngày đặt</th>
                        <th className={cx('table-th')}>Địa chỉ</th>
                        <th className={cx('table-th')}>Tổng tiền</th>
                        <th className={cx('table-th')}>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((order) => (
                        <tr
                            key={order?._id}
                            className={`${cx(
                                'newVideo-item',
                            )} py-[4px] cursor-pointer`}
                            onClick={() => handleOrderClick(order.id)}
                        >
                            <td className={cx('video')}>
                                {order.createdAt.slice(0, 10)}
                            </td>
                            <td className={cx('nickname')}>
                                {order.address.province}
                            </td>
                            <td className={cx('date')}>{order.total}</td>
                            <td>
                                <span
                                    className={`px-[8px] py-[4px] rounded-md text-white ${getStatusColor(
                                        order.status,
                                    )}`}
                                >
                                    {order.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    );
}

export default WidgetLg;
