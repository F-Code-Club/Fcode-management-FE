// list of dummy accounts
const DUMMY_ACCOUNTS = [
    {
        avatar: 'https://randomuser.me/api/portraits/men/89.jpg',
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'test@gmail.com',
        phone: '0123456789',
        role: 'Admin',
        status: 'Active',
        action: 'Edit',
    },
    {
        avatar: 'https://randomuser.me/api/portraits/men/89.jpg',
        id: 2,
        name: 'Nguyễn Văn B',
        email: 'demo@gamil.com',
        phone: '0123456789',
        role: 'Admin',
        status: 'Active',
        action: 'Edit',
    },
];

export const actions = [
    {
        key: 'editAccount',
        name: 'Chỉnh sửa',
        event: () => console.log('hello'),
        type: 'success',
    },
    {
        key: 'banAccount',
        name: 'Khóa',
        event: () => console.log('hello'),
        type: 'warning',
    },
    {
        key: 'deleteAccount',
        name: 'Xóa',
        event: () => console.log('hello'),
        type: 'danger',
    },
];

export default DUMMY_ACCOUNTS;
