// ProductDetail.js
import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import ProductEditModal from './ProductEditModal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../constants';

const ProductDetail = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        informations: [],
        variations: [],
        properties: [],
        medias: [],
        thumbnail: '',
    });
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/products/${id}`)
            .then((response) => {
                // Lưu danh sách loại sản phẩm vào state
                setProduct(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const {
        name,
        description,
        informations,
        variations,
        properties,
        medias,
        thumbnail,
    } = product;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-[32px] mb-4">Thông tin sản phẩm</h1>
            <div className="flex">
                <h2 className="text-[16px] font-bold mb-4 mr-[8px]">Tên: </h2>
                <p>{name}</p>
            </div>

            <h2 className="text-[16px] font-bold mb-4"> Mô tả sản phẩm</h2>
            <p>{description}</p>

            <h2 className="text-[16px] font-bold  mt-6 mb-2">
                Thông tin sản phẩm
            </h2>
            <ul>
                {informations.map((info) => (
                    <li key={info.id}>{info.information}</li>
                ))}
            </ul>

            <h2 className="text-[16px] font-bold mt-6 mb-2">Quy cách: </h2>
            <ul>
                {variations.map((spec, index) => (
                    <li key={index}>
                        {spec.name} - {spec.quantity} - {spec.price}
                    </li>
                ))}
            </ul>

            <h2 className="text-[16px] font-bold mt-6 mb-2">
                Thuộc tính sản phẩm:{' '}
            </h2>
            <ul>
                {properties.map((attr, index) => (
                    <li key={index}>
                        {attr.name} - {attr.value}
                    </li>
                ))}
            </ul>

            <div className="mt-6">
                <h2 className="text-[16px] font-bold mb-2">
                    Hình ảnh sản phẩm:{' '}
                </h2>
                <div className="flex">
                    {medias.map((image, index) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={`Product ${index + 1}`}
                            className="w-32 h-32 object-cover mr-2"
                        />
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-[16px] font-bold mb-2">Thumbnail</h2>
                <img
                    src={thumbnail}
                    alt="Product Thumbnail"
                    className="w-32 h-32 object-cover"
                />
            </div>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
                onClick={openModal}
            >
                Edit Product
            </button>

            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="modal bg-white pt-[70px]  pb-[60px]"
            >
                <ProductEditModal
                    productData={product}
                    handleCloseModal={closeModal}
                />
            </ReactModal>
        </div>
    );
};

export default ProductDetail;
