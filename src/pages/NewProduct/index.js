import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import ImageUploader from './ImageUploader';
import { message } from 'antd';

const NewProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productInfo, setProductInfo] = useState([]);
    const [productVariations, setProductVariations] = useState([]);
    const [productAttributes, setProductAttributes] = useState([]);
    const [productImage, setProductImage] = useState(null);
    const [productThumbnail, setProductThumbnail] = useState(null);
    const [productImages, setProductImages] = useState([]);
    const [showImages, setShowImages] = useState([]);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleChangeProductImages = useCallback((images) => {
        setProductImages(images);
    }, []);

    const handleChangeShowImages = useCallback((images) => {
        setShowImages(images);
    }, []);

    useEffect(() => {
        // Gọi API để lấy danh sách loại sản phẩm

        axios
            .get('http://localhost:8080/api/product_categories')
            .then((response) => {
                // Lưu danh sách loại sản phẩm vào state
                setCategories(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleProductDescriptionChange = (event) => {
        setProductDescription(event.target.value);
    };

    const handleProductInfoChange = (index, event) => {
        const updatedInfo = [...productInfo];
        updatedInfo[index][event.target.name] = event.target.value;
        setProductInfo(updatedInfo);
    };

    const handleProductVariationsChange = (index, event) => {
        const updatedVariations = [...productVariations];
        updatedVariations[index][event.target.name] = event.target.value;
        setProductVariations(updatedVariations);
    };

    const handleProductAttributesChange = (index, event) => {
        const updatedAttributes = [...productAttributes];
        updatedAttributes[index][event.target.name] = event.target.value;
        setProductAttributes(updatedAttributes);
    };

    const handleAddProductInfo = () => {
        setProductInfo([...productInfo, { information: '' }]);
    };

    const handleRemoveProductInfo = (index) => {
        const updatedInfo = [...productInfo];
        updatedInfo.splice(index, 1);
        setProductInfo(updatedInfo);
    };

    const handleAddProductSpecification = () => {
        setProductVariations([
            ...productVariations,
            { name: '', price: '', quantity: '' },
        ]);
    };

    const handleRemoveProductVariation = (index) => {
        const updatedVariations = [...productVariations];
        updatedVariations.splice(index, 1);
        setProductVariations(updatedVariations);
    };

    const handleAddProductAttribute = () => {
        setProductAttributes([...productAttributes, { name: '', value: '' }]);
    };

    const handleRemoveProductAttribute = (index) => {
        const updatedAttributes = [...productAttributes];
        updatedAttributes.splice(index, 1);
        setProductAttributes(updatedAttributes);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Xử lý logic khi người dùng nhấn nút "Submit"

        const product = {
            name: productName,
            description: productDescription,
            thumbnail: productThumbnail,
            informations: productInfo,
            variations: productVariations,
            properties: productAttributes,
            sku: 'HDMM03',
        };

        const response = await axios.post(
            `http://localhost:8080/api/product_categories/${selectedCategory}/products`,
            product,
        );

        const productId = response.data.id;

        // Lưu các hình ảnh sản phẩm
        productImages.forEach(async (productImage) => {
            try {
                const formData = new FormData();
                formData.append('file', productImage);

                await axios.post(
                    `http://localhost:8080/api/products/${productId}/product_medias`,
                    formData,
                );

                // Xử lý thành công
            } catch (error) {
                console.error(error);
                // Xử lý lỗi
            }
        });

        setProductName('');
        setProductDescription('');
        setProductInfo([]);
        setProductVariations([]);
        setProductAttributes([]);
        setProductImage(null);
        setProductThumbnail(null);
        setProductImages([]);
        setShowImages([]);

        message.success('Tạo sản phẩm thành công');
    };

    const handleUploadImage = async (event) => {
        if (productImage) {
            try {
                const formData = new FormData();
                formData.append('image', productImage);

                const response = await axios.post(
                    'http://localhost:8080/api/files/upload',
                    formData,
                );

                setProductThumbnail(response.data);

                // Xử lý thành công
            } catch (error) {
                console.error(error);
                // Xử lý lỗi
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-[32px] font-bold mb-4">
                Trang tạo sản phẩm mới
            </h1>
            <div className="max-w-[60rem]">
                <div className="mb-4">
                    <label htmlFor="product-name" className="block mb-2">
                        Tên sản phẩm:
                    </label>
                    <input
                        id="product-name"
                        type="text"
                        value={productName}
                        onChange={handleProductNameChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                </div>

                <div className="mb-[16px]">
                    <label htmlFor="category">Loại sản phẩm:</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Chọn loại sản phẩm</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="product-description" className="block mb-2">
                        Mô tả sản phẩm:
                    </label>
                    <textarea
                        id="product-description"
                        value={productDescription}
                        onChange={handleProductDescriptionChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                </div>

                <div className="mb-4">
                    <h3 className="text-[16px] mb-2">Thông tin sản phẩm:</h3>
                    {productInfo.map((info, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                value={info.information}
                                name="information"
                                onChange={(event) =>
                                    handleProductInfoChange(index, event)
                                }
                                className="border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveProductInfo(index)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddProductInfo}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                        Thêm thông tin
                    </button>
                </div>

                <div className="mb-4">
                    <h3 className="text-[16px] mb-2">Thông quy cách:</h3>
                    {productVariations.map((variation, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                name="name"
                                value={variation.name}
                                onChange={(event) =>
                                    handleProductVariationsChange(index, event)
                                }
                                className="border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
                                placeholder="Tên thông số"
                            />
                            <input
                                type="number"
                                name="price"
                                value={variation.price}
                                onChange={(event) =>
                                    handleProductVariationsChange(index, event)
                                }
                                className="border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
                                placeholder="Giá"
                            />
                            <input
                                type="number"
                                name="quantity"
                                value={variation.quantity}
                                onChange={(event) =>
                                    handleProductVariationsChange(index, event)
                                }
                                className="border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
                                placeholder="Số lượng"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    handleRemoveProductVariation(index)
                                }
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddProductSpecification}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                        Thêm quy cách
                    </button>
                </div>

                <div className="mb-4">
                    <h3 className="text-[16px] mb-2">Thuộc tính sản phẩm:</h3>
                    {productAttributes.map((attribute, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                name="name"
                                value={attribute.name}
                                onChange={(event) =>
                                    handleProductAttributesChange(index, event)
                                }
                                className="border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
                                placeholder="Tên thuộc tính"
                            />
                            <input
                                type="text"
                                name="value"
                                value={attribute.value}
                                onChange={(event) =>
                                    handleProductAttributesChange(index, event)
                                }
                                className="border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
                                placeholder="Giá trị"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    handleRemoveProductAttribute(index)
                                }
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddProductAttribute}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                        Thêm thuộc tính
                    </button>
                </div>

                <h1>Thêm ảnh đại diện cho sản phẩm</h1>
                {productThumbnail !== null ? (
                    <div>
                        <img
                            className="w-[150px] h-[200px]"
                            src={productThumbnail}
                            alt={productName}
                        />
                    </div>
                ) : (
                    <div>
                        <input type="file" onChange={handleImageChange} />
                        <button
                            className="bg-[blue] text-white px-[8px] py-[4px] ml-[12px] rounded-[8px]"
                            onClick={handleUploadImage}
                        >
                            Upload
                        </button>
                    </div>
                )}

                <ImageUploader
                    selectedImages={productImages}
                    onChangeShowImages={handleChangeShowImages}
                    showImages={showImages}
                    onChangeProductImages={handleChangeProductImages}
                />

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded mt-[16px]"
                    onClick={handleSubmit}
                >
                    Tạo
                </button>
            </div>
        </div>
    );
};

export default NewProductForm;
