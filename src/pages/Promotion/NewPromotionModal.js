import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../../constants';

function NewPromotionModal({ closeModal, onAdd }) {
    const [promotionData, setPromotionData] = useState({
        description: '',
        thumbnail: '',
        discountRate: '',
        startDate: '',
        endDate: '',
        categoryIds: [],
    });

    const [productCategory, setProductCategory] = useState([]);
    const [image, setImage] = useState(null);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPromotionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleProductChange = (e) => {
        const { value, checked } = e.target;
        setPromotionData((prevData) => {
            if (checked) {
                return {
                    ...prevData,
                    categoryIds: [...prevData.categoryIds, value],
                };
            } else {
                return {
                    ...prevData,
                    categoryIds: prevData.categoryIds.filter(
                        (product) => product !== value,
                    ),
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: Handle submission logic
        if (image) {
            try {
                const formData = new FormData();
                formData.append('image', image);

                const responseUploadImage = await axios.post(
                    `${apiUrl}/api/admin/files/upload`,
                    formData,
                );

                const promotion = await axios.post(
                    `${apiUrl}/api/admin/promotions`,
                    {
                        ...promotionData,
                        thumbnail: responseUploadImage.data,
                    },
                );

                onAdd(promotion.data);

                message.success('Đã tạo khuyến mãi thành công');
            } catch (error) {
                console.error(error);
                // Xử lý lỗi
            }
        }

        // Reset form fields
        setPromotionData({
            description: '',
            thumbnail: '',
            discountRate: '',
            startDate: '',
            endDate: '',
            categoryIds: [],
        });

        closeModal();

        //window.location.reload();
    };

    return (
        <div className="absolute mt-[400px] mb-[36px] inset-0 flex items-center  justify-center z-10">
            <div className="bg-white w-[60rem] p-6 rounded-md shadow-2xl">
                <h3 className="text-[24px] font-bold mb-4">
                    Tạo khuyến mãi mới
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="description">Mô tả:</label>
                        <textarea
                            id="description"
                            name="description"
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={promotionData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image">Hình ảnh:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageUpload}
                            required
                        />
                        {image && (
                            <div>
                                <img
                                    className="w-[100px] h-[120px]"
                                    src={URL.createObjectURL(image)}
                                    alt=""
                                />
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="discount">Discount:</label>
                        <input
                            type="text"
                            id="discount"
                            name="discountRate"
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={promotionData.discountRate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startDate">Ngày bắt đầu:</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={promotionData.startDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endDate">Ngày kết thúc:</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={promotionData.endDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label>Loại sản phẩm áp dụng:</label>
                        {productCategory.map((c) => (
                            <div key={c.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={c.id}
                                        checked={promotionData.categoryIds.includes(
                                            c.id.toString(),
                                        )}
                                        onChange={handleProductChange}
                                    />
                                    {c.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
                        >
                            Tạo
                        </button>
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                            onClick={closeModal}
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewPromotionModal;
