import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { message } from 'antd';
import { apiUrl } from '../../constants';

const cx = classNames.bind(styles);

function Login() {
    const [formState, setFormState] = useState();
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${apiUrl}/api/auth/admin/login`,
                { email: formState?.email, password: formState?.password },
            );
            const token = response.data.token;

            login(token); // Lưu token vào localStorage bằng AuthContext
            message.success('Đã đăng nhập thành công!');
        } catch (error) {
            message.error('Đã đăng nhập thất bại!');
            setError(error.response.data.message);
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('body')}>
                <h1 className={cx('title')}>Login</h1>
                <span className={cx('error')}>{error}</span>
                <form onSubmit={handleSubmit} className={cx('form')}>
                    <div className={cx('form-group')}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={cx('input')}
                            value={formState?.email || ''}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        ></input>
                        <PersonOutlineIcon className={cx('icon')} />
                    </div>
                    <div className={cx('form-group')}>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className={cx('input')}
                            value={formState?.password || ''}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        ></input>
                        <LockOpenIcon className={cx('icon')} />
                    </div>
                    <button className={cx('login-btn')}>LOGIN</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
