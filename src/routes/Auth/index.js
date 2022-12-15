import { useDispatch } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

import Icon from '../../components/Icon';
import { setUser } from './slice';
import {
    Logo,
    LoginWrapper,
    LoginHeading,
    LoginDescription,
    LoginDivider,
    LoginButton,
    LoginCredit,
} from './style';

// import memberApi from '@/utils/apiComponents/memberApi';
import LocalStorageUtils from '@/utils/localStorageUtils';

const Auth = () => {
    const dispatch = useDispatch();

    const ApiUrl = process.env.REACT_APP_API_URL + '/login/member';
    // get token from the url after successful signed in
    let location = useLocation();

    const UrlParams = new URLSearchParams(location.search);

    if (UrlParams.get('success') === 'true') {
        // save token to localStorage
        let response = {
            success: UrlParams.get('success'),
            token: UrlParams.get('token'),
        };
        LocalStorageUtils.setItem('token', response.token);
        return <Navigate to="/" replace />;
    }

    const getUser = async () => {
        console.log('run');
        await LocalStorageUtils.getUser().then((user) => {
            if (user.code === 200) {
                const { data } = user;
                const formatUser = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: data.role,
                };
                console.log('line 48', formatUser);
                dispatch(setUser(formatUser));
            }
        });
        return null;
        // const result = await memberApi.getMemberByStudentId(id);
    };
    //0 : student
    //1 : member
    //2 : manager
    //3 : admin
    return (
        // <div>
        //   <LoginButton href={ApiUrl + 'google'}>Sign in</LoginButton>
        // </div>
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
            <button onClick={getUser}>click me but need but token </button>
            <LoginCredit>
                Designed by <strong>F-Code Team.</strong>
            </LoginCredit>
        </LoginWrapper>
    );
};

export default Auth;
