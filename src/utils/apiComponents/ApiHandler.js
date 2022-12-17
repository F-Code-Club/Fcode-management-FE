import { toastSuccess, toastError } from '../../components/ToastNotification/index';

import articleApi from '@/utils/apiComponents/articleApi';

export const handler = async (action, ...data) => {
    const [id, successContent, failContent] = data;

    return await articleApi[action](id)
        .then((res) => {
            if (res.data.code === 200) {
                if (successContent) toastSuccess(successContent);
                return res.data.data;
            }
            if (res.data.code === 400) {
                if (failContent) toastError('Phiên đăng nhập hết hạn');
                return null;
            }
            throw new Error(res.data.message);
        })
        .catch((err) => {
            if (failContent) toastError(failContent);
            return err;
        });
};
