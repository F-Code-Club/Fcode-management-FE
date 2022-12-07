import { themes } from '@/theme/theme';
import { ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

export const confirmModal = {
    title: 'Bạn có chắc muốn đánh dấu câu hỏi này là vi phạm quy tắc cộng đồng không?',
    okText: 'Đánh dấu',
    cancelText: 'Hủy',
    icon: <ExclamationCircleOutlined />,
    okButtonProps: {
        style: {
            backgroundColor: themes.colors.primary,
        },
    },
};

export const okModal = {
    title: 'Câu hỏi đã được ẩn thành công!',
    okText: 'Đóng',
    icon: <CheckCircleOutlined />,
    okButtonProps: {
        style: {
            backgroundColor: themes.colors.primary,
        },
    },
};
export const initOpenModal = {
    answerModal: false,
    reportModal: false,
};
