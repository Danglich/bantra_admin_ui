import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Product() {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState({ sort: 'newest', role: '' });
    const [params, setParams] = useState('');

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
        setFilter({ sort: 'newest', role: '', keyword: '', active: '' });
    };

    useEffect(() => {
        axios
            .get(
                `http://localhost:8080/api/users${`?page=${
                    currentPage - 1
                }`}${params}`,
            )
            .then((response) => {
                const data = response.data;

                setTotalPages(data.totalPages);
                setCurrentPage(data.currentPage + 1);
                setUsers(data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [currentPage, params]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleUserClick = (userId) => {
        // Chuyển hướng đến trang đơn hàng chi tiết với orderId
        window.location.href = `/users/${userId}`;
    };

    const handleDeleteUser = async (e, userId) => {
        e.stopPropagation();
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này ?')) {
            await axios.delete(`http://localhost:8080/api/users/${userId}`);

            window.location.reload();
        } else {
        }
    };

    const handleToggleActive = async (e, user) => {
        e.stopPropagation();
        if (
            window.confirm(
                `Bạn có chắc chắn muốn ${
                    user.active ? 'ngừng hoạt động' : 'kích hoạt lại'
                } người dùng này ?`,
            )
        ) {
            await axios.put(
                `http://localhost:8080/api/users/disable/${user.id}`,
            );

            window.location.reload();
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-[32px] font-[600] mb-4">Danh sách sản phẩm</h1>

            <div className="mb-8 flex justify-start">
                {/* Bộ lọc */}
                <select
                    className="px-4 py-2 border border-gray-300 rounded"
                    value={filter.sort}
                    onChange={handleChangeFilter}
                    name="sort"
                >
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                </select>

                <select
                    className="px-4 py-2 ml-[16px] border border-gray-300 rounded"
                    value={filter.role}
                    onChange={handleChangeFilter}
                    name="role"
                >
                    <option value="">Tất cả</option>
                    <option value="USER">Người dùng</option>
                    <option value="ADMIN">Quản trị</option>
                    <option value="AUTHOR">Tác giả</option>
                </select>

                <select
                    className="px-4 py-2 ml-[16px] border border-gray-300 rounded"
                    value={filter.active}
                    onChange={handleChangeFilter}
                    name="active"
                >
                    <option value="">Tất cả</option>
                    <option value={true}>Hoạt động</option>
                    <option value={false}>Ngừng hoạt động</option>
                </select>

                <div className="ml-[16px]">
                    <input
                        type="text"
                        name="keyword"
                        placeholder="Nhập keyword"
                        value={filter.keyword}
                        onChange={handleChangeFilter}
                        className="h-full px-[4px]"
                    />
                </div>

                <button
                    onClick={handleFilter}
                    className="px-[12px] text-white py-[4px] ml-[16px] rounded-md bg-[blue]"
                >
                    Lọc
                </button>
                <button
                    onClick={handleRemoveFilter}
                    className="px-[12px] text-white py-[4px] ml-[16px] rounded-md bg-[blue]"
                >
                    Bỏ lọc
                </button>

                <div class="flex-1">
                    <button className="px-[12px] py-[4px] rounded-md bg-green-700 text-white float-right">
                        Tạo người dùng
                    </button>
                </div>
            </div>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className=" text-left py-2 px-4 border-b">ID</th>
                        <th className=" text-left py-2 px-4 border-b">
                            Họ và tên
                        </th>
                        <th className=" text-left py-2 px-4 border-b">
                            Địa chỉ email
                        </th>
                        <th className=" text-left py-2 px-4 border-b">
                            Giới tính
                        </th>
                        <th className=" text-left py-2 px-4 border-b">
                            Trạng thái
                        </th>
                        <th className=" text-left py-2 px-4 border-b">
                            Phân loại
                        </th>
                        <th className=" text-left py-2 px-4 border-b">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            onClick={() => handleUserClick(user.id)}
                            className="cursor-pointer"
                        >
                            <td className="py-2 px-4 border-b">{user.id}</td>
                            <td className="py-2 px-4 border-b">
                                {user.fullName}
                            </td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">
                                {user.gender ? 'Nam' : 'Nữ'}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <span
                                    onClick={(e) => {
                                        handleToggleActive(e, user);
                                    }}
                                    className={`px-[6px] py-[4px] rounded-md text-white ${
                                        user.active
                                            ? 'bg-green-500'
                                            : 'bg-red-500'
                                    }`}
                                >
                                    {user.active
                                        ? 'Hoạt động'
                                        : 'Ngừng hoạt động'}
                                </span>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <span
                                    className={`px-[6px] py-[4px] rounded-md  ${getRoleColor(
                                        user.role,
                                    )}`}
                                >
                                    {user.role}
                                </span>
                            </td>
                            <td className="p-4 border-b">
                                <button
                                    onClick={(e) =>
                                        handleDeleteUser(e, user.id)
                                    }
                                    className="px-[12px] py-[4px] bg-[red] text-white rounded-md"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {users.length === 0 && (
                <h1 className="mt-[24px] text-[red] text-[32px]">
                    Không tìm thấy người dùng nào!
                </h1>
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

const getRoleColor = (role) => {
    switch (role) {
        case 'USER':
            return 'bg-green-500 text-white';
        case 'AUTHOR':
            return 'bg-yellow-500 text-black';
        case 'ADMIN':
            return 'bg-blue-500 text-white';
        default:
            return '';
    }
};

export default Product;
