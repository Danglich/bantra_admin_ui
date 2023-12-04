import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ReviewList = () => {
    const [sortByViews, setSortByViews] = useState('');

    const [filter, setFilter] = useState({
        startDate: null,
        endDate: null,
    });

    // Phần phân trang

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [params, setParams] = useState('');

    useEffect(() => {
        axios
            .get(
                `http://localhost:8080/api/reviews${`?page=${
                    currentPage - 1
                }`}${params}`,
            )
            .then((response) => {
                const data = response.data;

                setTotalPages(data.totalPages);
                setCurrentPage(data.currentPage + 1);
                setReviews(data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [currentPage, params]);

    // Chuyển đến trang tiếp theo
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // Chuyển đến trang trước đó
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Chuyển đến một trang cụ thể
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const handleChangeFilter = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const handleFilter = () => {
        let params = '';
        const entries = Object.entries(filter);

        entries.forEach((entry) => {
            if (entry[1] != null && entry[1] !== '') {
                params = params.concat(`&${entry[0]}=${entry[1]}`);
            }
        });

        setParams(params);
        setCurrentPage(1);
    };

    const handleRemoveFilter = () => {
        setParams('');
        setFilter({
            startDate: null,
            endDate: null,
            keyword: '',
        });
    };

    const handleDeleteReview = async (id) => {
        await axios.delete(`http://localhost:8080/api/reviews/${id}`);

        console.log('Đã xóa thành công!');
        closeModal();
        window.location.reload();
    };

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-[32px] mb-[24px]">
                Danh sách đánh giá sản phẩm
            </h1>
            <div className="flex mb-[24px]">
                <div className="mr-4">
                    <label className="mr-2">Ngày bắt đầu:</label>
                    <input
                        type="date"
                        className="p-2 border border-gray-300"
                        name="startDate"
                        value={filter.startDate || 'dd/mm/yyyy'}
                        onChange={handleChangeFilter}
                    />
                </div>
                <div className="mr-4">
                    <label className="mr-2">Ngày kết thúc:</label>
                    <input
                        type="date"
                        className="p-2 border border-gray-300"
                        value={filter.endDate || 'dd/mm/yyyy'}
                        name="endDate"
                        onChange={handleChangeFilter}
                    />
                </div>
                <div>
                    <label className="mr-2">Lọc theo số sao:</label>
                    <select
                        className="p-2 border border-gray-300"
                        value={filter.rate}
                        onChange={handleChangeFilter}
                        name="rate"
                    >
                        <option value="">Tất cả</option>
                        <option value={1}>1 sao</option>
                        <option value={2}>2 sao</option>
                        <option value={3}>3 sao</option>
                        <option value={4}>4 sao</option>
                        <option value={5}>5 sao</option>
                        {/* Thêm các tùy chọn khác cho số sao */}
                    </select>
                </div>

                <div className="ml-[24px]">
                    <button
                        onClick={handleFilter}
                        className="px-[12px] py-[4px] text-white rounded-md bg-[blue]"
                    >
                        Lọc
                    </button>
                </div>
                <div className="ml-[24px]">
                    <button
                        onClick={handleRemoveFilter}
                        className="px-[12px] py-[4px] text-white rounded-md bg-[blue]"
                    >
                        Bỏ lọc
                    </button>
                </div>
            </div>
            {/* Phần nội dung */}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="text-left py-2 px-4 border-b">
                            Nội dung
                        </th>
                        <th className="text-left py-2 px-4 border-b">Số sao</th>
                        <th className="text-left py-2 px-4 border-b">
                            Tên sản phẩm
                        </th>
                        <th className="text-left py-2 px-4 border-b">
                            Người đánh giá
                        </th>
                        <th className="text-left py-2 px-4 border-b">Ngày</th>
                        <th className="text-left py-2 px-4 border-b">Xóa</th>
                        {/* Thêm cột Xóa */}
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review.id}>
                            <td className="py-2 px-4 border-b">
                                {review.content}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {review.rate}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {review?.product?.name}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {review?.user?.email}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {review.createdAt}
                            </td>

                            <td className="py-2 px-4 border-b">
                                <div>
                                    <button
                                        onClick={openModal}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Xóa
                                    </button>
                                    {isOpen && (
                                        <div className="fixed inset-0 flex items-center justify-center z-50">
                                            <div className="bg-white p-12 rounded shadow">
                                                <div className="flex justify-between items-center mb-12">
                                                    <h3 className="text-[24px] ">
                                                        Bạn có muốn xóa không?
                                                    </h3>
                                                    <button
                                                        onClick={closeModal}
                                                        className="text-gray-500 font-bold ml-[8px] hover:text-gray-700 text-[24px]"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteReview(
                                                                review.id,
                                                            )
                                                        }
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                                    >
                                                        Xóa
                                                    </button>
                                                    <button
                                                        onClick={closeModal}
                                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                                    >
                                                        Hủy
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Không có review nào */}

            {reviews.length === 0 && (
                <h1 className="text-[red] text-[32px] mt-[24px]">
                    Không tìm thấy bài đánh giá nào
                </h1>
            )}

            {/* Phần phân trang */}
            <div className="flex justify-center mt-[18px]">
                <nav>
                    <ul className="flex items-center">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li
                                key={index}
                                className={`mr-1 ${
                                    currentPage === index + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200'
                                }`}
                            >
                                <button
                                    className="py-2 px-4 rounded"
                                    onClick={() => goToPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ReviewList;
