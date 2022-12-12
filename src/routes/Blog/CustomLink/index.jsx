import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { handler } from './../../../components/Button/helper/ApiHandler';

import { getAllBlogs } from '@/routes/Blog/slice';

const CustomLink = (props) => {
    const { to, content, successContent, action, id } = props;
    const dispatch = useDispatch();

    // get new blogs
    const fetchData = async () => {
        // call api to get active blogs
        await dispatch(getAllBlogs());
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
