import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    YAxis,
    ResponsiveContainer,
} from 'recharts';
import classNames from 'classnames/bind';
import styles from './Rechart.module.scss';

const cx = classNames.bind(styles);

function Rechart({ grid, data, title, dataKey }) {
    return (
        <div className={cx('container')}>
            <span className={cx('title')}>{title}</span>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#5550bd" />
                    <YAxis />
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                    <Tooltip />
                    {grid && (
                        <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Rechart;
