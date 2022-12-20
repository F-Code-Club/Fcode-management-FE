// list of dummy accounts
export const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiYW9uZHNlMTczMDI0QGZwdC5lZHUudm4iLCJleHAiOjE2NzE1MDc1ODIsImlhdCI6MTY3MTUwNTc4Mn0.NSezeEsSuCBFJPkAJ5w-oqpkgrSyDWBjPDn1pWk3uV01HVMaNXA_xwHnL1HMFlsmnBB8v4qTAnlSnHEb6SCEaQ';

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
