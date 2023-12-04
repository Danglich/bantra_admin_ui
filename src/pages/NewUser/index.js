import classNames from 'classnames/bind';
import styles from './NewUser.module.scss';
import PublishIcon from '@mui/icons-material/Publish';
import { useContext, useRef, useState } from 'react';
import storage from '../../firebase/config';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage';
import { createUser } from '../../contexts/userContext/apiCalls';
import { UserContext } from '../../contexts/userContext/UserContext';
import { deleteFileFirebase } from '../../firebase/service';
import ModalLoding from '../../components/ModalLoading';
import { notify } from '../../utils/toast';

const cx = classNames.bind(styles);

function NewUser() {
    const [formState, setFormState] = useState({});
    const [file, setFile] = useState();
    const [url, setUrl] = useState();
    const { dispatch } = useContext(UserContext);
    const [isUploading, setIsUploading] = useState(false);

    const imgRef = useRef();

    const handleChangInput = (e) => {
        if (e.target.name === 'admin') {
            setFormState({
                ...formState,
                roleId: e.target.value === 'yes' ? 1 : 0,
            });
        } else {
            setFormState({ ...formState, [e.target.name]: e.target.value });
        }
    };

    const { error } = useContext(UserContext);

    const handleChangFile = (e) => {
        var reader = new FileReader();

        reader.onload = function (e) {
            imgRef.current.src = e.target.result;
        };

        reader.readAsDataURL(e.target.files[0]);
        if (url) {
            deleteFileFirebase(url.split('?')[0].slice(-21));
        }
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
                setIsUploading(true);
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                setIsUploading(false);
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL);
                    setIsUploading(false);
                });
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
        const createSuccess = await createUser(
            {
                ...formState,
                avatar:
                    url ||
                    'https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg',
            },
            dispatch,
        );
        if (createSuccess) {
            notify('Create user successfully!', 'success');
            setFormState({});
            setFile(null);
            setUrl(null);
            imgRef.current.src =
                'https://www.w3schools.com/howto/img_avatar.png';
        } else {
            notify('Create user failure!', 'error');
        }
    };

    const handleCancel = () => {
        if (url) {
            deleteFileFirebase(url.split('?')[0].slice(-21));
        }
        imgRef.current.src = 'https://www.w3schools.com/howto/img_avatar.png';
        setFormState({});
        setFile(null);
        setUrl(null);
    };

    return (
        <div className={cx('container')}>
            <span className={cx('title')}>New User</span>
            {error && <span className={cx('error')}>{error}</span>}
            <form className={cx('form')}>
                <div className={cx('form-group')}>
                    <label>Full Name</label>
                    <input
                        className={cx('input')}
                        type="text"
                        placeholder="John Smith"
                        name="fullname"
                        onChange={handleChangInput}
                        value={formState.fullname || ''}
                    ></input>
                </div>
                <div className={cx('form-group')}>
                    <label>Nickname</label>
                    <input
                        className={cx('input')}
                        type="text"
                        placeholder="john"
                        name="nickname"
                        onChange={handleChangInput}
                        value={formState.nickname || ''}
                    ></input>
                </div>
                <div className={cx('form-group')}>
                    <label>Password</label>
                    <input
                        className={cx('input')}
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChangInput}
                        value={formState.password || ''}
                    ></input>
                </div>

                <div className={cx('form-group')}>
                    <label>Website</label>
                    <input
                        className={cx('input')}
                        type="text"
                        placeholder="https://website.com"
                        name="webUrl"
                        onChange={handleChangInput}
                        value={formState.webUrl || ''}
                    ></input>
                </div>
                <div className={cx('form-group')}>
                    <label>Facebook</label>
                    <input
                        className={cx('input')}
                        type="text"
                        placeholder="https://facebook.com"
                        name="facebookUrl"
                        onChange={handleChangInput}
                        value={formState.facebookUrl || ''}
                    ></input>
                </div>
                <div className={cx('form-group')}>
                    <label>Youtube</label>
                    <input
                        className={cx('input')}
                        type="text"
                        placeholder="https://youtube.com"
                        name="youtubeUrl"
                        onChange={handleChangInput}
                        value={formState.youtubeUrl || ''}
                    ></input>
                </div>
                <div className={cx('form-group')}>
                    <label>Admin</label>
                    <select
                        name="admin"
                        className={cx('select-admin')}
                        onChange={handleChangInput}
                        value={formState.roleId === 1 ? 'yes' : 'no'}
                    >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div className={cx('form-group-avatar')}>
                    <img
                        ref={imgRef}
                        className={cx('img')}
                        src={'https://www.w3schools.com/howto/img_avatar.png'}
                        alt=""
                    ></img>
                    <label htmlFor="input-img">
                        <PublishIcon className={cx('icon-upload')} />
                    </label>
                    <input
                        className={cx('input-img')}
                        type="file"
                        accept="image/png, image/jpeg"
                        id={'input-img'}
                        onChange={handleChangFile}
                    ></input>
                </div>
                <div className={cx('cancel-btn')} onClick={handleCancel}>
                    Hủy bỏ
                </div>
                {!file ? (
                    <button className={cx('create-btn')} onClick={handleSubmit}>
                        Create
                    </button>
                ) : (
                    <button
                        onClick={handleUploadImg}
                        className={cx('create-btn')}
                    >
                        Upload Avatar
                    </button>
                )}
            </form>
            {isUploading && <ModalLoding />}
        </div>
    );
}

export default NewUser;
