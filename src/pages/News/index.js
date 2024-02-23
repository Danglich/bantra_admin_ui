import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../constants';
import Loading from '../Loading';

const NewsPage = () => {
    const [filter, setFilter] = useState({
        startDate: null,
        endDate: null,
        keyword: '',
        sortBy: 'newest',
    });

    // Phần phân trang

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [newsList, setNewsList] = useState([]);
    const [params, setParams] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                `${apiUrl}/api/admin/news${`?page=${
                    currentPage - 1
                }`}${params}`,
            )
            .then((response) => {
                const data = response.data;

                setTotalPages(data.totalPages);
                setCurrentPage(data.currentPage + 1);
                setNewsList(data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
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
        setFilter({ startDate: null, endDate: null, keyword: '' });
    };

    return (
        <div>
            <h1 className="text-[32px] mb-[12px]">Danh sách tin tức</h1>

            {/* Bộ lọc */}
            <div>
                <label htmlFor="startDate" className="mr-[12px]">
                    Từ ngày:
                </label>
                <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={filter.startDate || 'dd/mm/yyyy'}
                    onChange={handleChangeFilter}
                />

                <label htmlFor="endDate" className="mr-[12px] ml-[16px]">
                    Đến ngày:
                </label>
                <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={filter.endDate || 'dd/mm/yyyy'}
                    onChange={handleChangeFilter}
                />
                <label htmlFor="keyword" className="mr-[12px] ml-[16px]">
                    Tìm kiếm:
                </label>
                <input
                    type="text"
                    id="keyword"
                    name="keyword"
                    value={filter.keyword}
                    onChange={handleChangeFilter}
                    placeholder="Nhập từ khóa"
                />

                <label htmlFor="filterByStatus" className="ml-[40px]">
                    Lọc theo trạng thái:
                </label>
                <select
                    id="filterByStatus"
                    value={filter.published}
                    name="published"
                    onChange={handleChangeFilter}
                >
                    <option value="">Tất cả</option>
                    <option value={true}>Đã xuất bản</option>
                    <option value={false}>Bản nháp</option>
                </select>

                <div className="mt-[20px]">
                    <label htmlFor="sortByViews" className="">
                        Sắp xếp theo lượt xem:
                    </label>
                    <select
                        id="sortByViews"
                        value={filter.sortBy}
                        name="sortBy"
                        onChange={handleChangeFilter}
                    >
                        <option value="newest">Mới nhất</option>
                        <option value="lastest">Cũ nhất</option>
                        <option value="bestviews">Lượt views nhiều nhất</option>
                    </select>
                </div>

                <div className="mt-[24px]">
                    <button
                        onClick={handleFilter}
                        className="bg-[green] text-white px-[12px] py-[3px] rounded-[8px] ml-[16px]"
                    >
                        Lọc
                    </button>

                    <button
                        onClick={handleRemoveFilter}
                        className="bg-[green] text-white px-[12px] py-[3px] rounded-[8px] ml-[16px]"
                    >
                        Bỏ lọc
                    </button>
                </div>
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {/* Bảng dữ liệu */}
                    <table className="mt-[32px] min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 font-bold py-2 text-left border-b-[1px] text-gray-800">
                                    ID
                                </th>
                                <th className="px-4 font-bold py-2 text-left border-b-[1px] text-gray-800">
                                    Tiêu đề
                                </th>
                                <th className="px-4 font-bold py-2 text-left border-b-[1px] text-gray-800">
                                    Ngày tạo
                                </th>
                                <th className="px-4 font-bold py-2 text-left border-b-[1px] text-gray-800">
                                    Tác giả
                                </th>
                                <th className="px-4 font-bold py-2 text-left border-b-[1px] text-gray-800">
                                    Trạng thái
                                </th>
                                <th className="px-4 font-bold py-2 text-left border-b-[1px] text-gray-800">
                                    Lượt xem
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {newsList.map((news) => (
                                <tr key={news.id}>
                                    <td className="  border-b-[1px] px-4 py-3">
                                        {news.id}
                                    </td>
                                    <td className="  border-b-[1px] px-4 py-3">
                                        <Link to={`/news/${news.id}`}>
                                            {news.title}
                                        </Link>
                                    </td>
                                    <td className="  border-b-[1px] px-4 py-3">
                                        {news.createdAt}
                                    </td>
                                    <td className="  border-b-[1px] px-4 py-3">
                                        {news.author}
                                    </td>
                                    <td className={`px-4 py-2 border-b-[1px]`}>
                                        <span
                                            className={`px-[4px] rounded-[4px] ${getStatusColor(
                                                news.published,
                                            )}`}
                                        >
                                            {news.published
                                                ? 'Đã đăng'
                                                : 'Đang chờ'}
                                        </span>
                                    </td>
                                    <td className="  border-b-[1px] px-4 py-3">
                                        {news.views}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Phân trang */}
                    <div className="mt-[20px]">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="bg-[#ccc]"
                        >
                            <ArrowBackIosIcon />
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => goToPage(index + 1)}
                                className={
                                    currentPage === index + 1
                                        ? 'bg-[#6767f3] mx-[4px] text-white px-[5px]'
                                        : 'bg-[#ccc] mx-[4px] px-[5px]'
                                }
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                        >
                            <ArrowForwardIosIcon />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case true:
            return 'bg-green-200 text-green-800';
        case false:
            return 'bg-yellow-200 text-yellow-800';
        default:
            return 'bg-gray-200 text-gray-800';
    }
};

export default NewsPage;
