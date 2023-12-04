import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import TopBar from './components/TopBar';
import Home from './pages/Home';

import classNames from 'classnames/bind';
import styles from './App.module.scss';
import SideBar from './components/SideBar';
import User from './pages/User';
import EditUser from './pages/EditUser';
import NewUser from './pages/NewUser';
import EditVideo from './pages/EditVideo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import NewProductForm from './pages/NewProduct';
import OrderPage from './pages/Order';
import NewsPage from './pages/News';
import AddNews from './pages/AddNews';
import ReviewList from './pages/Review';
import PromotionList from './pages/Promotion';
import NewsDetail from './pages/NewsDetail';
import OrderDetail from './pages/OrderDetail';
import ContactList from './pages/Contact';
import Login from './pages/Login';
import { AuthContext } from './contexts/AuthContext';

const cx = classNames.bind(styles);

function App() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <GlobalStyle>
            <Routes>
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                ></Route>
            </Routes>

            {/* Thay true bằng user */}
            {user && (
                <div className="App">
                    <TopBar />
                    <div className={cx('body')}>
                        <SideBar />
                        <div className={cx('content')}>
                            <Routes>
                                <Route path="/" exact element={<Home />} />
                                <Route path="/users" element={<User />} />
                                <Route
                                    path="/reviews"
                                    element={<ReviewList />}
                                />
                                <Route
                                    path="/promotions"
                                    element={<PromotionList />}
                                />

                                <Route path="/products" element={<Product />} />
                                <Route
                                    path="/products/:id"
                                    element={<ProductDetail />}
                                />
                                <Route
                                    path="/newProduct"
                                    element={<NewProductForm />}
                                />
                                <Route path="/orders" element={<OrderPage />} />
                                <Route
                                    path="/orders/:id"
                                    element={<OrderDetail />}
                                />
                                <Route path="/news" element={<NewsPage />} />
                                <Route
                                    path="/news/:id"
                                    element={<NewsDetail />}
                                />
                                <Route path="/addNews" element={<AddNews />} />

                                <Route
                                    path="/user/:id"
                                    element={<EditUser />}
                                />
                                <Route
                                    path="/contacts"
                                    element={<ContactList />}
                                />

                                <Route
                                    path="/video/:id"
                                    element={<EditVideo />}
                                />
                                <Route path="/newUser" element={<NewUser />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            )}
            {/* {!user && (
                    <Routes>
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                )} */}
            <ToastContainer />
        </GlobalStyle>
    );
}

export default App;
