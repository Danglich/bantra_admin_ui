import classNames from 'classnames/bind';
import styles from './EditUser.module.scss';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PublishIcon from '@mui/icons-material/Publish';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../../contexts/userContext/UserContext';
import storage from '../../firebase/config';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage';
import { deleteUser, updateUser } from '../../contexts/userContext/apiCalls';
import useModal from '../../hooks/useModal';
import Modal from '../../components/Modal';
import { useCallback } from 'react';
import { deleteFileFirebase } from '../../firebase/service';
import { notify } from '../../utils/toast';
import { awaitTimeout } from '../../utils/wait';

const cx = classNames.bind(styles);

function EditUser() {
    const location = useLocation();
    const user = location?.state;

    const time = new Date(user?.createdAt);

    const [formState, setFormState] = useState(user);
    const [file, setFile] = useState();
    const [url, setUrl] = useState();
    const { dispatch } = useContext(UserContext);
    const [isUploading, setIsUploading] = useState(false);
    const { state: stateModal, toggle } = useModal();

    const { error, users } = useContext(UserContext);
    const imgRef = useRef();
    const navigate = useNavigate();

    const handleChangInput = (e) => {
        if (e.target.name === 'admin') {
            setFormState({
                ...formState,
                [e.target.name]: e.target.value === 'yes',
            });
        } else {
            setFormState({ ...formState, [e.target.name]: e.target.value });
        }
    };

    const handleChangFile = (e) => {
        var reader = new FileReader();

        reader.onload = function (e) {
            imgRef.current.src = e.target.result;
        };

        if (url) {
            deleteFileFirebase(url.split('?')[0].slice(-21));
        }

        reader.readAsDataURL(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const upload = (file) => {
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage();
        const storageRef = ref(storage, `images/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setIsUploading(true);
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL);
                });
                setIsUploading(false);
            },
        );
    };

    const handleUploadImg = (e) => {
        e.preventDefault();
        upload(file);
        setFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateSuccess = await updateUser(
            user._id,
            url
                ? {
                      ...formState,
                      avatar: url,
                  }
                : formState,
            dispatch,
        );
        if (updateSuccess) {
            notify('Upload successfully', 'success');
        } else {
            notify('Upload failure', 'error');
        }
    };

    //const wait = () => new Promise((resolve) => setTimeout(resolve, 700));

    const handleDelete = useCallback(
        () => async (ids) => {
            ids.forEach((id) => {
                deleteUser(id, dispatch);
            });
            const avatars = users
                .filter((user) => ids.includes(user._id))
                .map((user) => user?.avatar.split('?')[0].slice(-21));

            avatars.forEach((avt) => {
                deleteFileFirebase(avt);
            });

            notify('Deleted successfully', 'success');
            await awaitTimeout(700);
            navigate(-1);
        },
        [dispatch, users, navigate],
    );

    const handleCancel = () => {
        if (url) {
            deleteFileFirebase(url.split('?')[0].slice(-21));
        }
        setFormState(user);
        setUrl(null);
        setFile(null);
    };
    return (
        <div className={cx('container')}>
            <div className={cx('topbar')}>
                <span className={cx('title')}>Edit User</span>
                <button
                    onClick={() => {
                        toggle([user?._id]);
                    }}
                    className={cx('delete-btn')}
                >
                    Delete
                </button>
                <Link to={'/newUser'} className={cx('create-btn')}>
                    Create
                </Link>
            </div>
            <div className={cx('body')}>
                <div className={cx('user')}>
                    <div className={cx('user-top')}>
                        <img
                            className={cx('avatar')}
                            src={url || user?.avatar}
                            alt=""
                        ></img>
                        <div className={cx('right')}>
                            <span className={cx('nickname')}>
                                {user?.nickname}
                            </span>
                            <span className={cx('fullname')}>
                                {user?.fullname}
                            </span>
                        </div>
                    </div>
                    <div className={cx('info')}>
                        <span className={cx('title')}>Account Details</span>
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <PersonIcon className={cx('icon')} />
                                {user?.nickname}
                            </li>
                            <li className={cx('item')}>
                                <CalendarTodayIcon className={cx('icon')} />
                                {time.toLocaleDateString('en-US')}
                            </li>
                            <li className={cx('item')}>
                                <SupervisorAccountIcon className={cx('icon')} />
                                {user.roleId === 1 ? 'Admin' : 'User'}
                            </li>
                        </ul>
                    </div>
                    <div className={cx('contact')}>
                        <span className={cx('title')}>Contact Details</span>
                        <ul className={cx('list')}>
                            {user?.webUrl && (
                                <li className={cx('item')}>
                                    <LanguageIcon className={cx('icon')} />
                                    {user?.webUrl}
                                </li>
                            )}
                            {user?.youtubeUrl && (
                                <li className={cx('item')}>
                                    <YouTubeIcon className={cx('icon')} />
                                    {user?.youtubeUrl}
                                </li>
                            )}
                            {user?.facebookUrl && (
                                <li className={cx('item')}>
                                    <FacebookIcon className={cx('icon')} />
                                    {user?.facebookUrl}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className={cx('edit')}>
                    <span className={cx('title')}>Edit</span>
                    {error && <span className={cx('error')}>{error}</span>}
                    <div className={cx('form-container')}>
                        <div className={cx('left')}>
                            <div className={cx('form-group')}>
                                <label>Fullname</label>
                                <input
                                    name="fullname"
                                    type="text"
                                    className={cx('input')}
                                    placeholder={user?.fullname}
                                    onChange={handleChangInput}
                                    value={formState.fullname || ''}
                                ></input>
                            </div>

                            <div className={cx('form-group')}>
                                <label>Nickname</label>
                                <input
                                    name="nickname"
                                    type="text"
                                    className={cx('input')}
                                    placeholder={user?.nickname}
                                    onChange={handleChangInput}
                                    value={formState.nickname || ''}
                                ></input>
                            </div>
                            <div className={cx('form-group')}>
                                <label>Web site</label>
                                <input
                                    name="webUrl"
                                    type="text"
                                    className={cx('input')}
                                    placeholder={
                                        user?.webUrl || 'https://website.com'
                                    }
                                    onChange={handleChangInput}
                                    value={formState.webUrl || ''}
                                ></input>
                            </div>
                            <div className={cx('form-group')}>
                                <label>Facebook</label>
                                <input
                                    name="facebookUrl"
                                    type="text"
                                    className={cx('input')}
                                    placeholder={
                                        user?.facebookUrl ||
                                        'https://facebook.com'
                                    }
                                    onChange={handleChangInput}
                                    value={formState.facebookUrl || ''}
                                ></input>
                            </div>
                            <div className={cx('form-group')}>
                                <label>Youtube</label>
                                <input
                                    name="youtubeUrl"
                                    type="text"
                                    className={cx('input')}
                                    placeholder={
                                        user?.youtubeUrl ||
                                        'https://youtube.com'
                                    }
                                    onChange={handleChangInput}
                                    value={formState.youtubeUrl || ''}
                                ></input>
                            </div>
                        </div>
                        <div className={cx('right')}>
                            <div className={cx('uploadFile-container')}>
                                <img
                                    className={cx('avatar')}
                                    src={url ? url : user?.avatar}
                                    alt=""
                                    ref={imgRef}
                                ></img>
                                <label htmlFor="uploadAvatar">
                                    <PublishIcon className={cx('icon')} />
                                </label>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    style={{ display: 'none' }}
                                    id="uploadAvatar"
                                    onChange={handleChangFile}
                                ></input>
                            </div>
                            <button
                                onClick={handleCancel}
                                className={cx('cancel-btn')}
                            >
                                Hủy bỏ
                            </button>
                            {file ? (
                                <button
                                    onClick={handleUploadImg}
                                    className={cx('upload-btn')}
                                >
                                    Upload Image
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className={cx('upload-btn')}
                                >
                                    Upload
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isUploading && (
                <div className={cx('modal')}>
                    <div className={cx('spinner')}></div>
                    <span className={cx('title')}>Đang upload...</span>
                </div>
            )}
            <Modal
                state={stateModal}
                toggle={toggle}
                title={'Bạn có chắc chắn muốn xóa không?'}
                cancel="Xóa"
                continues={'Hủy bỏ'}
                handeCancel={handleDelete(stateModal.state)}
            />
        </div>
    );
}

export default EditUser;
