import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Feature from '../../components/Feature';
import Rechart from '../../components/Rechart';
import WidgetSm from '../../components/WidgetSm';
import WidgetLg from '../../components/WidgetLg';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

export default function Home() {
    const [orderStats, setOrderStats] = useState([]);
    const [newOrders, setNewOrders] = useState([]);
    const [newReviews, setNewReviews] = useState([]);

    useEffect(() => {
        let didCacel = false;
        const fetchData = async () => {
            try {
                const resOrder = await axios.get(
                    `http://localhost:8080/api/orders/stats`,
                );
                //const resVideo = await axios.get(`${apiUrl}/videos/stats`);
                if (!didCacel) {
                    setOrderStats(resOrder.data);
                    //setVideoStats(resVideo.data);
                }
            } catch (error) {}
        };

        fetchData();

        return () => {
            didCacel = true;
        };
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/orders/top')
            .then((response) => {
                setNewOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/reviews/top')
            .then((response) => {
                setNewReviews(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const features = useMemo(() => {
        const time = new Date(Date.now());

        const totalOfMonth = orderStats[time.getMonth()]?.total;
        const totalLastMonth = orderStats[time.getMonth() - 1]?.total;

        const rateUser = totalLastMonth
            ? ((totalOfMonth * 100) / totalLastMonth).toFixed(2)
            : totalOfMonth * 100;

        return [
            {
                title: 'New User',
                id: 1,
                quantity: totalOfMonth,
                rate: rateUser,
                subtitle: 'Compared to last month',
            },
            {
                title: 'New Video',
                id: 2,
                quantity: 100,
                rate: 25,
                subtitle: 'Compared to last month',
            },
            {
                title: 'Cost',
                id: 3,
                quantity: '$1.35',
                rate: -2.4,
                subtitle: 'Compared to last month',
            },
        ];
    }, [orderStats]);

    return (
        <div className={cx('container')}>
            <Feature features={features} />
            <Rechart
                grid={true}
                data={orderStats}
                title={'Order Analytics'}
                dataKey="total"
            />
            <div className={cx('widget')}>
                <WidgetSm data={newReviews} />
                <WidgetLg data={newOrders} />
            </div>
        </div>
    );
}
