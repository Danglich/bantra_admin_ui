import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteOutline } from '@mui/icons-material';
import { useCallback, useContext, useMemo } from 'react';
import { VideoContext } from '../../contexts/videoContext/VideoContext';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '../../components/Modal';
import useModal from '../../hooks/useModal';
import { deleteVideo } from '../../contexts/videoContext/apiCalls';
import { awaitTimeout } from '../../utils/wait';
import { notify } from '../../utils/toast';
//import { deleteVideoCloud } from '../../cloudinary/service';

const cx = classNames.bind(styles);

function Video() {
    const { state: stateModal, toggle } = useModal();
    const navigate = useNavigate();

    const columns = useMemo(() => {
        return [
            { field: '_id', headerName: 'ID', width: 240 },
            {
                field: 'video',
                headerName: 'Video',
                width: 150,
                renderCell: (params) => {
                    return (
                        <video className={cx('video')} src={params?.row.url} />
                    );
                },
            },
            {
                field: 'user',
                headerName: 'User',
                width: 200,
                renderCell: (params) => {
                    if (params.row.user) {
                        return (
                            <div className={cx('user-container')}>
                                <img
                                    className={cx('avatar')}
                                    src={params?.row?.user?.avatar}
                                    alt=""
                                ></img>
                                <span className={cx('user-nickname')}>
                                    {params?.row.user?.nickname}
                                </span>
                            </div>
                        );
                    } else {
                        return <></>;
                    }
                },
            },
            {
                field: 'status',
                headerName: 'Status',
                width: 120,
                renderCell: (params) => {
                    return (
                        <span className={cx('status', params?.row.status)}>
                            {params?.row.status.slice(0, 1).toUpperCase() +
                                params?.row.status.slice(1)}
                        </span>
                    );
                },
            },
            {
                field: 'date',
                headerName: 'Date',
                width: 160,
                renderCell: (params) => {
                    return (
                        <span className={cx('time')}>
                            {params.row.createdAt.slice(0, 10)}
                        </span>
                    );
                },
            },

            {
                field: 'action',
                headerName: 'Action',
                sortable: false,
                width: 160,
                renderCell: (params) => {
                    return (
                        <>
                            <Link
                                to={'/video/' + params.row._id}
                                state={params.row}
                            >
                                <button className={cx('edit-btn')}>Edit</button>
                            </Link>
                            <DeleteOutline
                                onClick={() => {
                                    toggle([params.row._id]);
                                }}
                                className={cx('delete-icon')}
                            />
                        </>
                    );
                },
            },
        ];
    }, [toggle]);

    const [category, setCategory] = useState('Total');

    const { videos, dispatch } = useContext(VideoContext);
    const [selectionVideo, setSelectionVideo] = useState([]);

    const videosShow = useMemo(() => {
        if (category === 'Total') {
            return videos;
        }
        if (category === 'Disable') {
            return videos.filter((video) => video.status === 'disable');
        }
        if (category === 'New') {
            return videos.slice(0, 10);
        }
    }, [videos, category]);

    const handleClearSelect = () => {
        setSelectionVideo([]);
    };

    const handleDelete = useCallback(
        () => async (ids) => {
            ids.forEach((id) => {
                deleteVideo(id, dispatch);
            });

            const urls = videos
                .filter((video) => ids.includes(video._id))
                .map((video) => video.url.slice(-24, -4));

            urls.forEach((url) => {
                //deleteVideoCloud(url);
            });

            notify('Deleted successfully', 'success');
            await awaitTimeout(700);
            navigate(-1);
        },
        [dispatch, videos, navigate],
    );

    const handleSelectDelete = useCallback(() => {
        toggle(selectionVideo);
    }, [selectionVideo, toggle]);

    return (
        <div className={cx('container')}>
            <ul className={cx('category')}>
                <li
                    className={cx('item', category === 'Total' && 'active')}
                    onClick={(e) => {
                        setCategory(e.target.outerText);
                    }}
                >
                    Total
                </li>
                <li
                    className={cx('item', category === 'Disable' && 'active')}
                    onClick={(e) => {
                        setCategory(e.target.outerText);
                    }}
                >
                    Disable
                </li>
                <li
                    className={cx('item', category === 'New' && 'active')}
                    onClick={(e) => {
                        setCategory(e.target.outerText);
                    }}
                >
                    New
                </li>
            </ul>
            {selectionVideo.length > 0 && (
                <div className={cx('header')}>
                    <CloseIcon
                        onClick={handleClearSelect}
                        className={cx('close-icon')}
                    />
                    <span className={cx('selecteds')}>
                        {selectionVideo.length} selected
                    </span>
                    <Link
                        to={`/video/${selectionVideo.slice(-1)[0]}`}
                        state={videosShow.find(
                            (user) => user._id === selectionVideo.slice(-1)[0],
                        )}
                        className={cx('open-btn')}
                    >
                        Open
                    </Link>
                    <button
                        onClick={handleSelectDelete}
                        className={cx('delete-btn')}
                    >
                        Delete
                    </button>
                </div>
            )}
            <div style={{ height: 540, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={videosShow}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    rowsPerPageOptions={[5]}
                    sx={{ m: 2 }}
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionVideo(newSelectionModel);
                    }}
                    selectionModel={selectionVideo}
                />
                <Modal
                    state={stateModal}
                    toggle={toggle}
                    title={'Bạn có chắc chắn muốn xóa những tùy chọn không?'}
                    cancel="Xóa"
                    continues={'Hủy bỏ'}
                    handeCancel={handleDelete(stateModal.state)}
                />
            </div>
        </div>
    );
}

export default Video;
