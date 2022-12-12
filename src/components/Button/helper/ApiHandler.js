import { toastSuccess, toastError } from './../../ToastNotification/index';

import articleApi from '@/utils/apiComponents/articleApi';

export const handler = async (action, ...data) => {
    const [id, successContent] = data;
    return await articleApi[action](id)
        .then((res) => {
            if (res.data.code === 200) {
                toastSuccess(successContent);
                return res.data;
            }
            if (res.data.code === 400) {
                toastError('Phiên đăng nhập hết hạn');
                return null;
            }
            throw new Error(res.data.message);
        })
        .catch((err) => {
            console.log(err);
            toastError('Xoá bài viết thất bại');
            return null;
        });
};
