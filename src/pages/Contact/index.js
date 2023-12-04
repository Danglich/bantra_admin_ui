import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ContactList = () => {
    const [filter, setFilter] = useState({
        startDate: null,
        endDate: null,
    });

    // Phần phân trang

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [contacts, setContacts] = useState([]);
    const [params, setParams] = useState('');

    useEffect(() => {
        axios
            .get(
                `http://localhost:8080/api/contacts${`?page=${
                    currentPage - 1
                }`}${params}`,
            )
            .then((response) => {
                const data = response.data;

                setTotalPages(data.totalPages);
                setCurrentPage(data.currentPage + 1);
                setContacts(data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [currentPage, params]);

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
        });
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
                        <th className="text-left py-3 px-4 border-b">
                            Nội dung
                        </th>
                        <th className="text-left py-3 px-4 border-b">Email</th>
                        <th className="text-left py-3 px-4 border-b">
                            Tên người dùng
                        </th>
                        <th className="text-left py-3 px-4 border-b">
                            Số điện thoạii
                        </th>
                        <th className="text-left py-3 px-4 border-b">
                            Thời gian
                        </th>
                        {/* Thêm cột Xóa */}
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td className="py-4 px-4 border-b">
                                {contact.content}
                            </td>
                            <td className="py-4 px-4 border-b">
                                {contact.email}
                            </td>
                            <td className="py-4 px-4 border-b">
                                {contact?.fullName}
                            </td>
                            <td className="py-4 px-4 border-b">
                                {contact?.phoneNumber}
                            </td>
                            <td className="py-4 px-4 border-b">
                                {contact?.createdAt.slice(0, 10)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {contacts.length === 0 && (
                <h1 className="text-[red] text-[32px] mt-[24px]">
                    Không tìm thấy liên hệ nào
                </h1>
            )}

            {/* Phần phân trang */}
            <div className=" mt-[18px]">
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

export default ContactList;
