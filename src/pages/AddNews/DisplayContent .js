import React, { useEffect } from 'react';

const DisplayContent = ({ content }) => {
    //const [content, setContent] = useState('');

    useEffect(() => {
        // Thực hiện truy vấn dữ liệu từ cơ sở dữ liệu để lấy nội dung đã lưu
        // Ví dụ:
        // fetch('API_ENDPOINT')
        //   .then(response => response.json())
        //   .then(data => {
        //     const savedContent = data.content;
        //     setContent(savedContent);
        //   });
        // Trong ví dụ này, chúng ta giả định rằng API_ENDPOINT là đường dẫn đến API để lấy dữ liệu đã lưu.
        // Sau khi nhận được dữ liệu, chúng ta cập nhật trạng thái của thành phần bằng setContent.
    }, []);

    return (
        <div
            className="mb-[32px]"
            dangerouslySetInnerHTML={{ __html: content }}
        ></div>
    );
};

export default DisplayContent;
