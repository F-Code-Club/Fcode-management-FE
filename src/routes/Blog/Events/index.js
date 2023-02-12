import { toastSuccess, toastError } from './../../../components/ToastNotification/index';

import articleApi from '@/utils/apiComponents/articleApi';

export const deleteArticle = async (id, successContent) => {
    await articleApi
        .deleteArticle(null)
        .then((res) => {
            if (res.data.code === 200) {
                toastSuccess(successContent);
            }
            throw new Error(res.data.message);
        })
        .catch((err) => {
            toastError('Xoá bài viết thất bại');
        });
};
