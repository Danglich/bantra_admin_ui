import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EditNews from './EditNews';
import { apiUrl } from '../../constants';

function NewsDetail() {
    const { id } = useParams();
    const [news, setNews] = useState(null);

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/news/${id}`)
            .then((response) => {
                // Lưu danh sách loại sản phẩm vào state
                setNews(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    return <div>{news != null && <EditNews newsData={news} />}</div>;
}

export default NewsDetail;
