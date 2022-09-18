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
        title: 'Bạn có muốn thay đổi thông tin tài khoản?',
        icon: <ExclamationCircleOutlined />,
        content: 'Tài khoản sau khi đổi sẽ không còn còn lưu trữ thông tin trước đó được nữa.',
        okText: 'Xác nhận',
        cancelText: 'Huỷ',
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
