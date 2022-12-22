// list of dummy accounts

export const actions_btn = [
    {
        key: 'editAccount',
        name: 'Chỉnh sửa',
        event: () => console.log('hello'),
        type: 'success',
        isLinked: true,
    },
    {
        key: 'deleteAccount',
        name: 'Xóa',
        type: 'danger',
        isLinked: false,
    },
];

export const tabs = [
    {
        key: 0,
        name: 'Tất cả',
        category: 0,
    },
    {
        key: 1,
        name: 'Admin',
        category: 1,
    },
    {
        key: 2,
        name: 'Member',
        category: 2,
    },
];
