import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { changeActiveBlogs, changeInactiveBlogs, changeProcessingBlogs } from '../slice';
import { handler } from './../../../components/Button/helper/ApiHandler';

import { toastError } from '@/components/ToastNotification';
import articleApi from '@/utils/apiComponents/articleApi';

const CustomLink = (props) => {
    const { to, content, successContent, action, id } = props;
    const dispatch = useDispatch();

    // get new blogs
    const fetchData = async () => {
        // call api to get active blogs
        await articleApi
            .getActiveArticle()
            .then(async (activeBlogs) => {
                dispatch(changeActiveBlogs(activeBlogs.data.data));
                // call api to get processing blogs
                return await articleApi.getProcessingArticle();
            })
            .then(async (processingBlogs) => {
                // call api to get inactive blogs
                dispatch(changeProcessingBlogs(processingBlogs.data.data));
                return await articleApi.getInactiveArticle();
            })
            .then(async (inactiveBlogs) => {
                dispatch(changeInactiveBlogs(inactiveBlogs.data.data));
            })
            .catch((err) => {
                console.log(err);
                toastError('Lỗi khi lấy dữ liệu');
            });
    };
    const handleAction = async () => {
        // handle action
        await handler(action, id, successContent).then(async () => {
            await fetchData();
        });
    };

    return (
        <Link to={to} onClick={handleAction}>
            {content}
        </Link>
    );
};

export default CustomLink;
