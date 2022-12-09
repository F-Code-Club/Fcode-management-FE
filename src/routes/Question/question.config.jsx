import { themes } from '@/theme/theme';
import {
    ExclamationCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';

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
export const errorModal = {
    title: 'Có lỗi trong việc đánh dấu câu hỏi!',
    content: 'Vui lòng thử lại',
    okText: 'Đóng',
    icon: <CloseCircleOutlined />,
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
