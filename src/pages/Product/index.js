import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddForm from './FormAdd';
import { apiUrl } from '../../constants';
import Loading from '../Loading';

function Product() {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [categories, setCategories] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState('');

    const [filter, setFilter] = useState({
        sortBy: 'newest',
        categoryId: null,
        keyword: '',
        sku: '',
    });

    const handleChangeFiler = (e) => {
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
        setFilter({ sortBy: 'newest', categoryId: '', keyword: '', sku: '' });
    };

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${apiUrl}/api/products${`?page=${currentPage - 1}`}${params}`)
            .then((response) => {
                const data = response.data;

                setTotalPages(data.totalPages);
                setCurrentPage(data.currentPage + 1);
                setProducts(data.data);
                setTotalItems(data.totalItems);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, [currentPage, params]);

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/product_categories`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCloseForm = () => {
        setShowAddForm(false);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-[32px] font-[600] mb-4">Danh sách sản phẩm</h1>

            <div className="mb-8 flex justify-start">
                {/* Bộ lọc */}
                <select
                    className="px-4 py-2 border border-gray-300 rounded"
                    value={filter.categoryId}
                    onChange={handleChangeFiler}
                    name="categoryId"
                >
                    <option value="">Loại sản phẩm</option>
                    {categories.map((c) => (
                        <option value={c.id}>{c.name}</option>
                    ))}
                </select>

                <div className="ml-[16px]">
                    <input
                        type="text"
                        name="keyword"
                        placeholder="Nhập keyword"
                        value={filter.keyword}
                        onChange={handleChangeFiler}
                        className="h-full px-[4px]"
                    />
                </div>

                <div className="ml-[16px]">
                    <input
                        type="text"
                        name="sku"
                        placeholder="Nhập mã"
                        value={filter.sku}
                        onChange={handleChangeFiler}
                        className="h-full px-[4px]"
                    />
                </div>
                <select
                    className="px-4 py-2 border border-gray-300  ml-[12px] rounded"
                    value={filter.sortBy}
                    onChange={handleChangeFiler}
                    name="sortBy"
                >
                    <option value="newest">Mới nhất</option>
                    <option value="bestseller">Bán chạy nhất</option>
                    <option value="oldest">Cũ nhất</option>
                </select>
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

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <h1 className="py-[8px] font-bold text-[18px] text-[blue]">
                        {totalItems} sản phẩm
                    </h1>
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className=" text-left py-2 px-4 border-b">
                                    ID
                                </th>
                                <th className=" text-left py-2 px-4 border-b">
                                    Hình ảnh
                                </th>
                                <th className=" text-left py-2 px-4 border-b">
                                    Tên
                                </th>
                                <th className=" text-left py-2 px-4 border-b">
                                    Mã sản phẩm
                                </th>
                                <th className=" text-left py-2 px-4 border-b">
                                    Giá
                                </th>
                                <th className=" text-left py-2 px-4 border-b">
                                    Đã bán
                                </th>
                                <th className=" text-left py-2 px-4 border-b">
                                    Trạng thái
                                </th>
                                <th className=" text-left py-2 px-4 border-b">
                                    Thêm
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="py-2 px-4 border-b">
                                        {product.id}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <Link to={`/products/${product.id}`}>
                                            <img
                                                src={product.thumbnail}
                                                alt={product.name}
                                                className="w-24 h-24"
                                            />
                                        </Link>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <Link to={`/products/${product.id}`}>
                                            {product.name}
                                        </Link>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {product.sku}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {product.lowestPrice} -{' '}
                                        {product.highestPrice}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {product.soldNumber}
                                    </td>
                                    <td className="p-4 border-b">
                                        <span
                                            className={`inline-block px-2 py-1 rounded font-bold ${
                                                product.quantity > 0
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-red-500 text-white'
                                            }`}
                                        >
                                            {product.quantity > 0
                                                ? 'Sẵn hàng'
                                                : 'Hết hàng'}
                                        </span>
                                    </td>

                                    <td className="py-2 px-4 border-b">
                                        <span
                                            onClick={() => {
                                                setShowAddForm(true);
                                            }}
                                            className="block px-[6px] py-[3px] rounded bg-[blue] text-[white] cursor-pointer text-center"
                                        >
                                            Thêm
                                        </span>
                                    </td>
                                    <AddForm
                                        isShow={showAddForm}
                                        closeModal={handleCloseForm}
                                        product={product}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.length === 0 && (
                        <h1 className="mt-[24px] text-[red] text-[32px]">
                            Không tìm thấy sản phẩm nào!
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
}

export default Product;
