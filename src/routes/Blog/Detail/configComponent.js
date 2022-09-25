import { CommentOutlined, EyeOutlined, LikeOutlined, ShareAltOutlined } from '@ant-design/icons';

export const ActionElements = [
    {
        name: 'view',
        Element: ({ ...rest }) => <EyeOutlined {...rest} />,
    },
    {
        name: 'like',
        Element: ({ ...rest }) => <LikeOutlined {...rest} />,
    },
    {
        name: 'share',
        Element: ({ ...rest }) => <ShareAltOutlined {...rest} />,
    },
    {
        name: 'comment',
        Element: ({ ...rest }) => <CommentOutlined {...rest} />,
    },
];
export const hiddenButton = {
    type: 'hidden',
    // TODO: change this when finish testing
    isShow: true, // show or not.
    buttons: [
        // list of action for all button
        {
            name: 'Ẩn',
            type: '',
            action: 'Hidden',
            configs: {
                title: 'Bạn có muốn ẩn bài viết này không?',
                content:
                    'Bài viết sau khi ẩn, người đọc sẽ không tìm thấy bài viết trên trang của CLB nữa.',
            },
            successContent: 'Ẩn bài thành công',
            params: {
                endpoint: 'hide',
                token: 'nghia',
            },
        },
        {
            name: 'Xoá',
            type: 'primary',
            action: 'Delete',
            configs: {
                title: 'Bạn có muốn xoá bài viết này không?',
                content: 'Bài viết sau khi xóa sẽ không còn dữ liệu trên hệ thống trang của CLB.',
            },
            successContent: 'Xóa bài viết thành công',
            params: {
                endpoint: 'delete',
                token: 'nghia',
            },
        },
    ],
};

export const approveButton = {
    type: 'approve',
    // TODO: change this when finish testing
    isShow: true, // show or not.
    buttons: [
        // list of action for all button
        {
            name: 'Từ Chối',
            type: '',
            action: 'Decline',
            configs: {
                title: 'Bạn có muốn từ chối duyệt bài viết này không?',
                content:
                    'Bài viết sau khi không được duyệt, tác giả vẫn có quyền chỉnh sửa và được duyệt lại.',
            },
            successContent: 'Từ chối duyệt bài viết thành công',
            params: {
                endpoint: 'disapprove',
                token: 'nghia',
            },
        },
        {
            name: 'Duyệt',
            action: 'Approve',
            type: 'primary',
            configs: {
                title: 'Bạn có muốn duyệt bài viết này không?',
                content: 'Bài viết sau khi được duyệt sẽ được đăng công khai trên trang của CLB.',
            },
            successContent: 'Duyệt bài viết thành công',
            params: {
                endpoint: 'Approve',
                token: 'nghia',
            },
        },
    ],
};
export const disableButton = {
    type: 'none',
    isShow: false,
    buttons: [],
};
