import { useEffect, useState } from 'react';
import DisplayContent from './DisplayContent ';
import NewsEditor from './NewsEditor';
import axios from 'axios';
import { message } from 'antd';

function AddNews() {
    const [news, setNews] = useState({ title: '' });

    const [isEditing, setIsEditing] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageShow, setImageShow] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(
        news?.category?.id,
    );

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/news_categories')
            .then((response) => {
                // Lưu danh sách loại tin tức vào state
                setCategories(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handlePublic = async (e) => {
        e.preventDefault();

        if (selectedImage) {
            try {
                const formData = new FormData();
                formData.append('image', selectedImage);

                const responseUploadImage = await axios.post(
                    'http://localhost:8080/api/files/upload',
                    formData,
                );

                await axios.post(
                    `http://localhost:8080/api/news/${selectedCategory}`,
                    { ...news, thumbnail: responseUploadImage.data },
                );

                message.success('Tạo bài viết thành công');
                setSelectedImage(null);
                setImageShow();
                setNews({ title: '', thumbnail: '', content: '' });
                setSelectedCategory(null);
                setIsEditing(true);
            } catch (error) {
                console.error(error);
                message.error('Tạo bài viết không thành công');
                // Xử lý lỗi
            }
        }
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleChangeContent = (content) => {
        setNews({ ...news, content: content });
    };

    const handleChangeTitle = (e) => {
        setNews({ ...news, title: e.target.value });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        setSelectedImage(file);
        const imageData = {
            name: file.name,
            url: URL.createObjectURL(file),
        };
        setImageShow(imageData);
    };

    return (
        <form onSubmit={handlePublic}>
            <div className="mb-[16px]">
                <label htmlFor="category" className="block font-bold mb-2">
                    Loại tin tức:
                </label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    required
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Chọn loại tin tức</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="title" className="block font-bold mb-2">
                    Tiêu đề:
                </label>
                <input
                    type="text"
                    id="title"
                    className="w-full p-2 border-2 rounded-lg"
                    onChange={handleChangeTitle}
                    value={news.title}
                    required
                    // Handle title input change if needed
                />
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block font-bold mb-2">
                    Hình ảnh:
                </label>
                <>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="border-2 rounded-lg p-2"
                        required
                    />
                </>

                {imageShow && (
                    <div>
                        <img src={imageShow.url} alt={imageShow.name} />
                        <p>{imageShow.name}</p>
                    </div>
                )}
            </div>

            {isEditing ? (
                <NewsEditor
                    onSave={handleSave}
                    content={news?.content || ''}
                    onChange={handleChangeContent}
                />
            ) : (
                <div>
                    <h2 className="text-[24px] font-bold">Nội dung</h2>
                    <DisplayContent content={news?.content || ''} />
                    <button
                        onClick={() => {
                            setIsEditing(true);
                        }}
                        type="button"
                        className="px-[16px] py-[4px] rounded-[8px] text-white bg-[blue]"
                    >
                        Chỉnh sửa
                    </button>
                    <button
                        type="submit"
                        className="px-[16px] ml-[40px] py-[4px] rounded-[8px] text-white bg-[blue]"
                    >
                        Phê duyệt
                    </button>
                </div>
            )}
        </form>
    );
}

export default AddNews;
