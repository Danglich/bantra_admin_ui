import classNames from 'classnames/bind';
import styles from './EditVideo.module.scss';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useModal from '../../hooks/useModal';
import Modal from '../../components/Modal';
import { useCallback, useState } from 'react';
import { useContext } from 'react';
import { VideoContext } from '../../contexts/videoContext/VideoContext';
import { deleteVideo, updateVideo } from '../../contexts/videoContext/apiCalls';
import { notify } from '../../utils/toast';
import { awaitTimeout } from '../../utils/wait';

const cx = classNames.bind(styles);

function EditVideo() {
    const location = useLocation();
    const video = location.state;
    const { state: stateModal, toggle } = useModal();
    const { dispatch } = useContext(VideoContext);
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        title: '',
        regime: 1,
    });

    const handleDelete = useCallback(
        () => async (ids) => {
            ids.forEach((id) => {
                deleteVideo(id, dispatch);
            });
            notify('Deleted successfully', 'success');
            await awaitTimeout(700);
            navigate(-1);
        },
        [dispatch, navigate],
    );

    const handleChangeInput = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        setFormState({ title: '', regime: 1 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateSuccess = updateVideo(video?._id, formState, dispatch);
        if (updateSuccess) {
            notify('Video update successfully', 'success');
        } else {
            notify('Video update failure', 'error');
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('topbar')}>
                <span className={cx('title')}>Edit Video</span>
                <button
                    onClick={() => {
                        toggle([video?._id]);
                    }}
                    className={cx('delete-btn')}
                >
                    Delete
                </button>
                <button className={cx('create-btn')}>Create</button>
            </div>
            <div className={cx('body')}>
                <div className={cx('body-left')}>
                    {video?.user && (
                        <Link
                            to={{ pathname: `/user/${video?.user?._id}` }}
                            className={cx('user')}
                            state={video?.user}
                        >
                            <img src={video?.user?.avatar} alt=""></img>
                            <div className={cx('user-info')}>
                                <span className={cx('nickname')}>
                                    {video?.user?.nickname}
                                </span>
                                <span className={cx('fullname')}>
                                    {video?.user?.fullname}
                                </span>
                            </div>
                        </Link>
                    )}
                    <div className={cx('body-container')}>
                        <video controls src={video?.url}></video>
                        <div className={cx('info-container')}>
                            <div className={cx('video-info')}>
                                <span className={cx('title')}>
                                    Video Details
                                </span>
                                <ul className={cx('detail-list')}>
                                    <li className={cx('detail-item')}>
                                        <PersonIcon
                                            className={cx('detail-icon')}
                                        />
                                        {video?.user ? (
                                            <span
                                                className={cx(
                                                    'detail-subtitle',
                                                )}
                                            >
                                                {video?.user?.nickname}
                                            </span>
                                        ) : (
                                            <span className={cx('disable')}>
                                                Disabled
                                            </span>
                                        )}
                                    </li>
                                    <li className={cx('detail-item')}>
                                        <DateRangeIcon
                                            className={cx('detail-icon')}
                                        />
                                        <span className={cx('detail-subtitle')}>
                                            {video?.createdAt.slice(0, 10)}
                                        </span>
                                    </li>
                                    <li className={cx('detail-item')}>
                                        <LockOpenIcon
                                            className={cx('detail-icon')}
                                        />
                                        <span className={cx('detail-subtitle')}>
                                            All
                                        </span>
                                    </li>
                                    <li className={cx('detail-item')}>
                                        <FavoriteBorderIcon
                                            className={cx('detail-icon')}
                                        />
                                        <span className={cx('detail-subtitle')}>
                                            {video.likesCount}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('video-title-container')}>
                                <span className={cx('title')}>
                                    Video Title:{' '}
                                </span>
                                <p className={cx('video-title')}>
                                    {video?.title}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('body-right')}>
                    <span className={cx('title')}>Edit</span>
                    <form className={cx('form-container')}>
                        <div className={cx('form-group')}>
                            <label>Video title</label>
                            <textarea
                                name="title"
                                type="text"
                                className={cx('input')}
                                value={formState.title}
                                onChange={handleChangeInput}
                            ></textarea>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Regime</label>
                            <select
                                name="regime"
                                value={formState.regime}
                                onChange={handleChangeInput}
                            >
                                <option value={1}>All</option>
                                <option value={2}>Friend</option>
                                <option value={3}>Only me</option>
                            </select>
                        </div>
                        <div
                            onClick={handleCancel}
                            className={cx('cancel-btn')}
                        >
                            Hủy bỏ
                        </div>
                        <button
                            className={cx('upload-btn')}
                            onClick={handleSubmit}
                        >
                            Upload
                        </button>
                    </form>
                </div>
            </div>
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

export default EditVideo;
