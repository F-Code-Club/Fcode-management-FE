import { Link } from 'react-router-dom';

const navItem = () => {
    return (
        <div>
            <Link to="home">
                <span>Trang chu</span>
            </Link>
        </div>
    );
};

export default navItem;
