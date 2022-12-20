import { NavLink } from 'react-router-dom';

import Img404 from '../../assets/404/404NoBackground.png';
import StyledButton from '../../components/Button/index';
import { LoginDescription, LoginDivider } from '../Auth/style';
import { Wrapper } from './styles';

const Error404Page = () => {
    return (
        <Wrapper>
            <div className="container">
                <img src={Img404} alt="404 page" width={'32%'} />

                <LoginDescription>
                    Trang bạn đang tìm kiếm không tồn tại. Làm thế nào bạn có ở đây là một bí ẩn.
                    Nhưng bạn có thể nhấp vào nút bên dưới để quay lại trang chủ
                </LoginDescription>
                <LoginDivider width={400} />
                <NavLink to="/">
                    <StyledButton>Go Back to Home</StyledButton>
                </NavLink>
            </div>
        </Wrapper>
    );
};

export default Error404Page;
