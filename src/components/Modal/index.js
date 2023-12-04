import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({
    state,
    toggle,
    handeCancel,
    title,
    subTitle,
    cancel,
    continues,
}) {
    return state.isShowing
        ? ReactDOM.createPortal(
              <div className={cx('modal')}>
                  <div className={cx('content')}>
                      <span className={cx('title')}>{title}</span>
                      <span className={cx('sub-title')}>{subTitle}</span>
                      <button
                          className={cx('cancel-btn')}
                          onClick={() => {
                              toggle();
                              handeCancel(state.state);
                          }}
                      >
                          {cancel}
                      </button>
                      <button
                          className={cx('continue-btn')}
                          onClick={() => {
                              toggle();
                          }}
                      >
                          {continues}
                      </button>
                  </div>
                  <div className={cx('overlay')}></div>
              </div>,
              document.body,
          )
        : null;
}

export default Modal;
