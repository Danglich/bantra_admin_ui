import React, { useCallback, useEffect, useState } from 'react';
import NewPromotionModal from './NewPromotionModal';
import axios from 'axios';
import EditPromotionModal from './EditPromotionModal';
import { apiUrl } from '../../constants';
import Loading from '../Loading';

const PromotionList = () => {
    const [filter, setFilter] = useState({
        categoryId: null,
        status: null,
    });

    // Phần phân trang

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [promotions, setPromotions] = useState([]);
    const [params, setParams] = useState('');
    const [productCategory, setProductCategory] = useState([]);
    const [editPromotion, setEditPromotion] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                `${apiUrl}/api/promotions${`?page=${
                    currentPage - 1
                }`}${params}`,
            )
            .then((response) => {
                const data = response.data;

                setTotalPages(data.totalPages);
                setCurrentPage(data.currentPage + 1);
                setPromotions(data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, [currentPage, params]);

    const addPromotion = useCallback((promotion) => {
        setPromotions((prev) => [...prev, promotion]);
    }, []);

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/product_categories`)
            .then((response) => {
                const data = response.data;
                setProductCategory(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
        setFilter({ categoryId: 'all', status: 'all' });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vn');
    };

    const getStatusColor = (expired) => {
        return expired ? 'bg-red-500' : 'bg-green-500';
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const openCreateModal = () => {
        setShowCreateModal(true);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
    };

    const openEditModal = (promotion) => {
        setEditPromotion(promotion);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    const checkExpired = (promotion) => {
        const currentDate = Date.now();
        const startDate = new Date(promotion.startDate);
        const endDate = new Date(promotion.endDate);

        return currentDate < startDate || currentDate > endDate;
    };

    const handleDeletePromotion = (promotionId) => {
        if (window.confirm('Bạn có muốn tiếp tục xóa khuyến mãi không?')) {
            try {
                axios.delete(`${apiUrl}/api/promotions/${promotionId}`);
            } catch (error) {
                console.log(error);
            }
        } else {
        }
    };

    return (
        <div className="mx-auto">
            <h2 className="text-[32px] mb-[20px]">Danh sách khuyến mãi</h2>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
                onClick={openCreateModal}
            >
                Tạo khuyến mãi mới
            </button>
            {/* Phần bộ lọc */}
            <div className="flex mb-[16px]">
                <div className="mr-4">
                    <label htmlFor="statusFilter">Trạng thái:</label>
                    <select
                        id="statusFilter"
                        name="status"
                        className="ml-2 px-2 py-1 bg-white border border-gray-300 rounded-md"
                        value={filter.status}
                        onChange={handleChangeFilter}
                    >
                        <option value="all">Tất cả</option>
                        <option value="unexpired">Chưa hết hạn</option>
                        <option value="expired">Hết hạn</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="productFilter">Loại sản phẩm:</label>
                    <select
                        id="productFilter"
                        className="ml-2 px-2 py-1 bg-white border border-gray-300 rounded-md"
                        value={filter.categoryId}
                        name="categoryId"
                        onChange={handleChangeFilter}
                    >
                        <option value="all">Tất cả</option>
                        {productCategory.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleFilter}
                    className="ml-[16px] px-[12px] py-[4px] rounded-md bg-blue-500 text-white"
                >
                    Lọc
                </button>

                <button
                    onClick={handleRemoveFilter}
                    className="ml-[16px] px-[12px] py-[4px] rounded-md bg-blue-500 text-white"
                >
                    Bỏ lọc
                </button>
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {/* Phần danh sách */}
                    <table className="w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className=" text-left py-2 px-4 border-b">
                                    Mô tả
                                </th>
                                <th className=" text-left py-2 px-4 border-b">
                                    Ngày bắt đầu
                                </th>
                                <th className=" text-left py-2 px-4 border-b">
                                    Ngày kết thúc
                                </th>
                                <th className=" text-left py-2 px-4 border-b">
                                    Trạng thái
                                </th>
                                <th className=" text-left py-2 px-4 border-b">
                                    Sản phẩm áp dụng
                                </th>
                                <th className=" text-left py-2 px-4 border-b">
                                    Chỉnh sửa
                                </th>
                                <th className=" text-left py-2 px-4 border-b">
                                    Xóa
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {promotions.map((promotion) => (
                                <tr key={promotion.id}>
                                    <td className="py-2 px-4 border-b">
                                        {promotion.description}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {formatDate(promotion.startDate)}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {formatDate(promotion.endDate)}
                                    </td>
                                    <td className={`py-2 px-4 border-b `}>
                                        <span
                                            className={`text-white px-[12px] py-[4px] rounded-[6px] ${getStatusColor(
                                                checkExpired(promotion),
                                            )}`}
                                        >
                                            {checkExpired(promotion)
                                                ? 'Hết hạn'
                                                : 'Chưa hết hạn'}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <ul>
                                            {promotion?.productCategories.map(
                                                (product, index) => (
                                                    <li key={index}>
                                                        {product.name}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </td>

                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() =>
                                                openEditModal(promotion)
                                            }
                                            className="px-[8px] py-[4px] rounded-md bg-[blue] text-white"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() =>
                                                handleDeletePromotion(
                                                    promotion.id,
                                                )
                                            }
                                            className="px-[8px] py-[4px] rounded-md bg-[red] text-white"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Phần phân trang */}
                    <div className="flex justify-center mt-[20px]">
                        <nav>
                            <ul className="flex items-center">
                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => (
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
                                                onClick={() =>
                                                    paginate(index + 1)
                                                }
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </nav>
                    </div>

                    {promotions.length === 0 && (
                        <h1 className="text-[32px] text-[red] mt-[16px]">
                            Không tìm thấy khuyến mãi nào
                        </h1>
                    )}
                </>
            )}

            {showCreateModal && (
                <NewPromotionModal
                    onAdd={addPromotion}
                    closeModal={closeCreateModal}
                />
            )}

            {showEditModal && (
                <EditPromotionModal
                    closeModal={closeEditModal}
                    data={editPromotion}
                />
            )}
        </div>
    );
};

export default PromotionList;
