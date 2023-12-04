import React from 'react';

const ImageUploader = ({
    showImages,
    onChangeShowImages,
    selectedImages,
    onChangeProductImages,
}) => {
    const handleImageChange = (event) => {
        const files = event.target.files;
        const selectedImages = [];
        const imagesArray = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imageUrl = URL.createObjectURL(file);
            imagesArray.push(imageUrl);
            selectedImages.push(file);
        }
        onChangeProductImages(selectedImages);
        onChangeShowImages(imagesArray);
    };

    const handleDeleteImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        onChangeProductImages(updatedImages);
        const updatedShowImages = [...showImages];
        updatedShowImages.splice(index, 1);
        onChangeShowImages(updatedShowImages);
    };

    return (
        <div className="py-4">
            <h1 className="font-bold">Thêm hình ảnh sản phẩm</h1>
            <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="mb-4"
            />
            <ul className="grid gap-4 grid-cols-3">
                {showImages.map((image, index) => (
                    <li
                        key={index}
                        className="flex flex-col items-center justify-center space-y-1"
                    >
                        <img
                            src={image}
                            alt={` Ảnh ${index}`}
                            className="w-full h-auto object-cover"
                        />
                        <button
                            onClick={() => handleDeleteImage(index)}
                            className="px-2 py-1 text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ImageUploader;
