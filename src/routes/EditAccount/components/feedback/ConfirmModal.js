import { Modal, notification, Button } from 'antd';

import { ExclamationCircleOutlined } from '@ant-design/icons';

const openNotification = () => {
    notification.success({
        message: `Thông tin tài khoản đã được thay đổi thành công`,
        placement: 'bottomRight',
    });
};

const confirm = () => {
    Modal.confirm({
        maskClosable: true,
        icon: <ExclamationCircleOutlined />,
        title: 'Xác nhận thay đổi',
        content: 'Bạn có muốn thay đổi thông tin cá nhân của mình?',
        okText: 'Thay đổi',
        cancelText: 'Quay lại',
        onOk: () => {
            openNotification();
        },
    });
};

const ConfirmModal = () => {
    return (
        <Button type="primary" block onClick={confirm}>
            Xác nhận
        </Button>
    );
};

export default ConfirmModal;
