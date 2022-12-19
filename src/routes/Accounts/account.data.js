// list of dummy accounts
export const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiYW9uZHNlMTczMDI0QGZwdC5lZHUudm4iLCJleHAiOjE2NzE0Njg4MDMsImlhdCI6MTY3MTQ2NzAwM30.CH6xGP2Gw7I_nRH3mlGdUCav1BulbxuG5Gzon4pgFhfxC27kfluzJlAJ59mtpn0u05JNHcCyz0Zl9LJOipZJYw';

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
