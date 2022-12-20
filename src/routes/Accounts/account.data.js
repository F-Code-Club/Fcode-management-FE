// list of dummy accounts

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
