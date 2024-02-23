import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiUrl } from '../../constants';

function OrderDetail() {
    const { id } = useParams();

    const [order, setOrder] = useState({ items: [] });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/orders/${id}`)
            .then((response) => {
                const data = response.data;
                setOrder(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    useEffect(() => {
        let total = 0;
        order.items.forEach((item) => {
            total += item.productItem?.price * item.quantity || 0;
        });

        total += order.shippingMethod?.price || 0;
        setTotal(total);
    }, [order]);

    const handleStatusChange = async (newStatus) => {
        await axios.put(`${apiUrl}/api/admin/orders/update/status`, {
            order_id: order.id,
            status: newStatus,
        });
        message.success('Thay đổi đơn hàng thành công');
        setIsModalOpen(false);
        window.location.reload();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    console.log(order);

    return (
        <div>
            <h1 className="text-[32px] mb-[16px]">Chi tiết đơn hàng</h1>
            <div>
                <p className="font-bold">
                    Người đặt :{' '}
                    <span className="font-[500]">{order.user?.email}</span>
                </p>
                <p className="font-bold">
                    Địa chỉ :{' '}
                    <span className="font-[500]">
                        {order.address?.province} - {order.address?.district} -{' '}
                        {order.address?.ward} - {order.address?.detail}
                    </span>
                </p>
                <p className="font-bold">
                    Phương thức thanh toán :{' '}
                    <span className="font-[500]">{order.payment?.name}</span>
                </p>
                <p className="font-bold">
                    Phương thức giao hàng :{' '}
                    <span className="font-[500]">
                        {order.shippingMethod?.name}
                    </span>
                </p>
                <p className="font-bold">
                    Số điện thoại :{' '}
                    <span className="font-[500]">
                        {order?.address?.phoneNumber}
                    </span>
                </p>
                <p className="font-bold">
                    Ghi chú: <span className="font-[500]">{order?.note}</span>
                </p>
                <p className="font-bold">
                    Trạng thái :{' '}
                    <span
                        className={`font-[500] px-[12px] ${getStatusColor(
                            order.status,
                        )} py-2 rounded-md`}
                    >
                        {order.status}
                    </span>
                </p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 my-[12px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Change Status
                </button>
                <p className="font-bold">
                    Ngày tạo:{' '}
                    <span className="font-[500]">{order?.createdAt}</span>
                </p>
            </div>
            <div>
                <h3 className="text-[18px] font-semibold mb-4 mt-8">
                    Danh sách sản phẩm
                </h3>
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-100 border-b">
                                Product Name
                            </th>
                            <th className="py-2 px-4 bg-gray-100 border-b">
                                Image
                            </th>
                            <th className="py-2 px-4 bg-gray-100 border-b">
                                Price
                            </th>
                            <th className="py-2 px-4 bg-gray-100 border-b">
                                Quantity
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border">
                                    <Link
                                        to={`/products/${item.productItem?.product?.id}`}
                                    >
                                        {item.productItem?.product?.name}
                                    </Link>
                                </td>
                                <td className="py-2 px-4 border">
                                    <img
                                        src={
                                            item.productItem?.product?.thumbnail
                                        }
                                        alt={item.productName}
                                        width="50"
                                        height="50"
                                    />
                                </td>
                                <td className="py-2 px-4 border">
                                    {item.productItem?.price}
                                </td>
                                <td className="py-2 px-4 border">
                                    {item.quantity}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <p className="font-bold mt-8">
                    Tổng tiền : <span>{total}</span>
                </p>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h3 className="text-[24px] font-semibold mb-4">
                            Change Order Status
                        </h3>
                        <div>
                            <button
                                onClick={() => handleStatusChange('PENDING')}
                                disabled={order?.status === 'PENDING'}
                                className={`mr-4 ${
                                    order?.status === 'PENDING'
                                        ? 'bg-[#f14d4d]'
                                        : 'bg-blue-500'
                                } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => handleStatusChange('SENDING')}
                                disabled={order?.status === 'SENDING'}
                                className={`mr-4 ${
                                    order?.status === 'SENDING'
                                        ? 'bg-[#f14d4d]'
                                        : 'bg-blue-500'
                                } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                            >
                                Sending
                            </button>
                            <button
                                onClick={() => handleStatusChange('SENT')}
                                disabled={order?.status === 'SENT'}
                                className={`mr-4 ${
                                    order?.status === 'SENT'
                                        ? 'bg-[#f14d4d]'
                                        : 'bg-blue-500'
                                } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                            >
                                Sent
                            </button>
                            <button
                                onClick={() => handleStatusChange('CANCELLED')}
                                disabled={order?.status === 'CANCELLED'}
                                className={`${
                                    order?.status === 'CANCELLED'
                                        ? 'bg-[#f14d4d]'
                                        : 'bg-blue-500'
                                } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                            >
                                Cancelled
                            </button>
                        </div>
                        <button
                            onClick={handleCancel}
                            class="px-[12px] py-[6px] mt-[12px] rounded-md bg-[gray] text-white"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

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

export default OrderDetail;
