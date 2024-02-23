import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../constants';
import Loading from '../Loading';

const OrderTable = () => {
    const handleOrderClick = (orderId) => {
        // Chuyển hướng đến trang đơn hàng chi tiết với orderId
        window.location.href = `/orders/${orderId}`;
    };

    const [filter, setFilter] = useState('ALL');

    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
    };

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                `${apiUrl}/api/orders${`?page=${currentPage - 1}`}${
                    filter !== 'ALL' ? `&status=${filter}` : ''
                }`,
            )
            .then((response) => {
                const data = response.data;

                setTotalPages(data.totalPages);
                setCurrentPage(data.currentPage + 1);
                setOrders(data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, [currentPage, filter]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-[32px] font-[500] mb-4">Danh sách đơn hàng</h1>
            <div className="mb-4">
                <label className="mr-2">Lọc theo trạng thái:</label>
                <select
                    value={filter}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="p-2 border border-gray-300"
                >
                    <option value="ALL">Tất cả</option>
                    <option value="PENDING">Đang chờ</option>
                    <option value="SENDING">Đang giao</option>
                    <option value="SENT">Đã giao</option>
                    <option value="CANCELLED">Đã hủy</option>
                </select>
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <table className="min-w-full border border-gray-300 mt-[20px]">
                        <thead>
                            <tr>
                                <th className="text-left py-3 px-4 border-b">
                                    ID
                                </th>
                                <th className="text-left py-3 px-4 border-b">
                                    Ngày đặt
                                </th>
                                <th className="text-left py-3 px-4 border-b">
                                    Tổng tiền
                                </th>
                                <th className="text-left py-3 px-4 border-b">
                                    Địa chỉ
                                </th>
                                <th className="text-left py-3 px-4 border-b">
                                    Phương thức thanh toán
                                </th>
                                <th className="text-left py-3 px-4 border-b">
                                    Phương thức giao hàng
                                </th>
                                <th className="text-left py-3 px-4 border-b">
                                    Trạng thái
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    onClick={() => handleOrderClick(order.id)}
                                    className="cursor-pointer"
                                >
                                    <td className="py-4 px-4 border-b">
                                        {order.id}
                                    </td>
                                    <td className="py-4 px-4 border-b">
                                        {order.createdAt.slice(0, 10)}
                                    </td>
                                    <td className="py-4 px-4 border-b">
                                        {order.total}
                                    </td>
                                    <td className="py-4 px-4 border-b">
                                        {order.address}
                                    </td>
                                    <td className="py-4 px-4 border-b">
                                        {order.paymentMethod}
                                    </td>
                                    <td className="py-4 px-4 border-b">
                                        {order.shippingMethod}
                                    </td>
                                    <td className={`py-2 px-4 border-b `}>
                                        <span
                                            className={`block px-4 rounded ${getStatusColor(
                                                order.status,
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {orders.length === 0 && (
                        <h1 className="text-red-500 text-[32px] mt-[16px]">
                            Không tìm thấy đơn hàng nào
                        </h1>
                    )}
                </>
            )}

            <div className="mt-8 flex justify-start">
                {/* Phần phân trang */}
                <nav className="inline-flex">
                    <ul className="flex items-center">
                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1,
                        ).map((pageNumber) => (
                            <li
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`cursor-pointer mx-2 px-3 py-1 rounded ${
                                    pageNumber === currentPage
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-gray-300 text-gray-700'
                                }`}
                            >
                                {pageNumber}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

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

export default OrderTable;
