import { useEffect, useState } from 'react';
import DisplayContent from '../AddNews/DisplayContent ';
import NewsEditor from '../AddNews/NewsEditor';
import axios from 'axios';
import { message } from 'antd';

function EditNews({ newsData }) {
    const [news, setNews] = useState(newsData);

    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageShow, setImageShow] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(news?.category);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    useEffect(() => {
        // Gọi API để lấy danh sách loại tin tức

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

    const handleUpdate = async () => {
        if (selectedImage) {
            try {
                const formData = new FormData();
                formData.append('image', selectedImage);

                const responseUploadImage = await axios.post(
                    'http://localhost:8080/api/files/upload',
                    formData,
                );

                await axios.put(`http://localhost:8080/api/news`, {
                    ...news,
                    thumbnail: responseUploadImage.data,
                });

                // Xử lý thành công
            } catch (error) {
                console.error(error);
                // Xử lý lỗi
            }
        } else {
            try {
                await axios.put(`http://localhost:8080/api/news`, news);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    //const [content, setContent] = useState('');

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

    const handleSetPublic = async () => {
        setNews({ ...news, published: !news.published });

        try {
            await axios.put(`http://localhost:8080/api/news`, {
                ...news,
                published: !news.published,
            });

            message.success('Trạng thái của bài viết đã được đặt thành công');
        } catch (error) {
            console.log(error);
            message.error('Thay đổi trạng thái của bài viết không thành công');
        }
    };

    return (
        <div>
            <button
                onClick={handleSetPublic}
                className="bg-[blue] mb-[12px] text-white px-[12px] py-[4px] rounded-md"
            >
                {news.published ? 'Gỡ' : 'Đăng'}
            </button>
            <div className="mb-[16px]">
                <label htmlFor="category" className="block font-bold mb-2">
                    Loại tin tức:
                </label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Chọn loại tin tức</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category}>
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
                    // Handle title input change if needed
                />
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block font-bold mb-2">
                    Hình ảnh:
                </label>
                {!news.thumbnail && (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="border-2 rounded-lg p-2"
                        />
                    </>
                )}

                {!news.thumbnail && imageShow && (
                    <div>
                        <img src={imageShow.url} alt={imageShow.name} />
                        <p>{imageShow.name}</p>
                    </div>
                )}
                {news.thumbnail && (
                    <>
                        <div>
                            <img src={news.thumbnail} alt="Hỉnh ảnh đại diện" />
                        </div>
                    </>
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
                        className="px-[16px] py-[4px] rounded-[8px] text-white bg-[blue]"
                    >
                        Chỉnh sửa
                    </button>
                </div>
            )}

            {news !== newsData && (
                <button
                    onClick={handleUpdate}
                    className="px-[16px] mt-[24px] py-[4px] rounded-[8px] text-white bg-[blue]"
                >
                    Lưu thay đổi
                </button>
            )}
        </div>
    );
}

export default EditNews;
