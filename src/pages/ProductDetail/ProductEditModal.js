import { useState } from 'react';

function ProductEditModal({ productData, handleCloseModal }) {
    const {
        name,
        description,
        informations,
        variations,
        properties,
        medias,
        thumbnail,
    } = productData;

    const [editedName, setEditedName] = useState(name);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedProductInfo, setEditedProductInfo] = useState(informations);
    const [editedSpecifications, setEditedSpecifications] =
        useState(variations);
    const [editedAttributes, setEditedAttributes] = useState(properties);

    const handleEditProduct = () => {
        const updatedProductData = {
            ...productData,
            name: editedName,
            description: editedDescription,
            productInfo: editedProductInfo,
            specifications: editedSpecifications,
            attributes: editedAttributes,
        };

        // Save the updated product data

        handleCloseModal();
    };

    const handleDeleteAttribute = () => {};

    const handleDeleteSpecification = () => {};

    const handleDeleteInfo = () => {};

    return (
        <div className="mx-[20rem]">
            <h2 className="text-[32px] mb-2">Chỉnh sửa sản phẩm</h2>
            <div>
                <div className="mb-4">
                    <label className="block text-[16px] font-bold mb-2">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-[16px] font-bold mb-2">
                        Mô tả :
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-[16px] font-bold mb-2">
                        Thông tin sản phẩm:
                    </label>
                    {editedProductInfo.map((info, index) => (
                        <div key={index} className="flex">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                                type="text"
                                value={info.information}
                                onChange={(e) => {
                                    const updatedInfo = [...editedProductInfo];
                                    updatedInfo[index].information =
                                        e.target.value;
                                    setEditedProductInfo(updatedInfo);
                                }}
                            />
                            <button
                                onClick={() => handleDeleteInfo(info.id)}
                                className="text-red-500 mr-2 px-[12px]"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                    <button className="text-white rounded-[3px] mr-2 px-[12px] bg-[blue]">
                        Thêm
                    </button>
                </div>

                <div className="mb-4">
                    <label className="block text-[16px] font-bold mb-2">
                        Quy cách :
                    </label>
                    {editedSpecifications.map((spec, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                type="text"
                                placeholder="Name"
                                value={spec.name}
                                onChange={(e) => {
                                    const updatedSpecs = [
                                        ...editedSpecifications,
                                    ];
                                    updatedSpecs[index].name = e.target.value;
                                    setEditedSpecifications(updatedSpecs);
                                }}
                            />
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                type="number"
                                placeholder="Quantity"
                                value={spec.quantity}
                                onChange={(e) => {
                                    const updatedSpecs = [
                                        ...editedSpecifications,
                                    ];
                                    updatedSpecs[index].quantity =
                                        e.target.value;
                                    setEditedSpecifications(updatedSpecs);
                                }}
                            />
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                type="number"
                                placeholder="Price"
                                value={spec.price}
                                onChange={(e) => {
                                    const updatedSpecs = [
                                        ...editedSpecifications,
                                    ];
                                    updatedSpecs[index].price = e.target.value;
                                    setEditedSpecifications(updatedSpecs);
                                }}
                            />
                            <button
                                onClick={() =>
                                    handleDeleteSpecification(spec.id)
                                }
                                className="text-red-500 mr-2 px-[12px]"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mb-4">
                    <label className="block text-[16px] font-bold mb-2">
                        Thuộc tính
                    </label>
                    {editedAttributes.map((attr, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                type="text"
                                placeholder="Name"
                                value={attr.name}
                                onChange={(e) => {
                                    const updatedAttrs = [...editedAttributes];
                                    updatedAttrs[index].name = e.target.value;
                                    setEditedAttributes(updatedAttrs);
                                }}
                            />
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Value"
                                value={attr.value}
                                onChange={(e) => {
                                    const updatedAttrs = [...editedAttributes];
                                    updatedAttrs[index].value = e.target.value;
                                    setEditedAttributes(updatedAttrs);
                                }}
                            />
                            <button
                                onClick={() => handleDeleteAttribute(attr.id)}
                                className="text-red-500 mr-2 px-[12px]"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
                    type="button"
                    onClick={handleEditProduct}
                >
                    Lưu
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mt-4 ml-2"
                    type="button"
                    onClick={handleCloseModal}
                >
                    Hủy
                </button>
            </div>
        </div>
    );
}

export default ProductEditModal;
