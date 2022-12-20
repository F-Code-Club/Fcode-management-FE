import { useLocation, Navigate } from 'react-router-dom';

import Icon from '../../components/Icon';
import {
    Logo,
    LoginWrapper,
    LoginHeading,
    LoginDescription,
    LoginDivider,
    LoginButton,
    LoginCredit,
} from './style';

import { toastWarning } from '@/components/ToastNotification';
// import memberApi from '@/utils/apiComponents/memberApi';
import LocalStorageUtils from '@/utils/localStorageUtils';

const Auth = () => {
    const ApiUrl = process.env.REACT_APP_API_URL + '/login/member';
    // get token from the url after successful signed in
    let location = useLocation();
    const CheckToken = LocalStorageUtils.getToken();
    const UrlParams = new URLSearchParams(location.search);

    if (UrlParams.get('success') === 'true') {
        // save token to localStorage
        let response = {
            success: UrlParams.get('success'),
            token: UrlParams.get('token'),
        };
        LocalStorageUtils.setItem('token', response.token);
        return <Navigate to="/" replace />;
    } else if (UrlParams.get('success') === 'false') {
        toastWarning('your account is not in database');
    }
    if (CheckToken) {
        <Navigate to="/" replace />;
    }
    return (
        <LoginWrapper minHeight="100vh" width="100vw">
            <Logo size={160} />
            <LoginHeading>
                Chào mừng bạn đến với <strong>F-Code.</strong>
            </LoginHeading>
            <LoginDescription>Một nền tảng quản lý hoạt động của các thành viên.</LoginDescription>
            <LoginDivider width={120} />
            <LoginButton href={ApiUrl}>
                Sign in with Google account
                <Icon
                    style={{
                        marginLeft: '15px',
                        transform: 'translateY(0.5px)',
                    }}
                />
            </LoginButton>

            <LoginCredit>
                Designed by <strong>F-Code Team.</strong>
            </LoginCredit>
        </LoginWrapper>
    );
};

export default Auth;
