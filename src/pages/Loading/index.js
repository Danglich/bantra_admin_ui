import { Spin } from 'antd';

function Loading() {
    return (
        <div className="my-[120px] w-full flex items-center justify-center">
            <Spin size="large" />
        </div>
    );
}

export default Loading;
