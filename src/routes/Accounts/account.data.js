// list of dummy accounts
export const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiYW9uZHNlMTczMDI0QGZwdC5lZHUudm4iLCJleHAiOjE2NzEwODg3MzcsImlhdCI6MTY3MTA4NjkzN30.anM7jTEIHOW9jtRyvfdngbTy_RxOav8muO3XJlEGch3rL6Fr9d3QLcgkNhP9pdcWc5NeRUh_mRnOR8iuz5R2Zg';
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
        isLinked: true,
    },
    {
        key: 'banAccount',
        name: 'Khóa',
        event: () => console.log('hello'),
        type: 'warning',
        isLinked: false,
    },
    {
        key: 'deleteAccount',
        name: 'Xóa',
        event: () => console.log('hello'),
        type: 'danger',
        isLinked: false,
    },
];

export default DUMMY_ACCOUNTS;
