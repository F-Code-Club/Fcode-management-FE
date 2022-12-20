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
        key: 'deleteAccount',
        name: 'Xóa',
        type: 'danger',
        isLinked: false,
    },
];
