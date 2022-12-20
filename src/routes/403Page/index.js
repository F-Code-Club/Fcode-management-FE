import { NavLink } from 'react-router-dom';

import Img403 from '../../assets/403/403NoBackground.png';
import StyledButton from '../../components/Button/index';
import { LoginDescription, LoginDivider } from '../Auth/style';
import { Wrapper } from './styles';

const Error403Page = () => {
    return (
        <Wrapper>
            <div className="container">
                <img src={Img403} alt="403 page" width={'20%'} />

                <LoginDescription>
                    Bạn không có quyền truy cập trang này. Làm thế nào bạn có ở đây là một bí ẩn.
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

export default Error403Page;
