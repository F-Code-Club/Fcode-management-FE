import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllBlogs } from '@/routes/Blog/slice';
import { handler } from '@/utils/apiComponents/ApiHandler';
import localStorageUtils from '@/utils/localStorageUtils';

const CustomLink = (props) => {
    const { to, content, successContent, action, id, failContent } = props;
    const dispatch = useDispatch();

    // get new blogs
    const fetchData = async () => {
        // call api to get active blogs
        const token = localStorageUtils.getToken();
        await dispatch(getAllBlogs(token));
    };
    const handleAction = async () => {
        // handle action
        await handler(action, id, successContent, failContent).then(async () => {
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
