// list of dummy accounts
export const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiYW9uZHNlMTczMDI0QGZwdC5lZHUudm4iLCJleHAiOjE2NzE1MTAyMTYsImlhdCI6MTY3MTUwODQxNn0.MCJYVcyHUBWX1TgjqNqf-CAI2ItCG51rg2nhw09-e58NEU0Iqd4yMJ35YwXGUFu7LtXBC0xuvZda0GkrL4UcWQ';
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
