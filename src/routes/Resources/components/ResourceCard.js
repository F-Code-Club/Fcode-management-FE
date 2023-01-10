import { useNavigate } from 'react-router-dom';

import ResourceImage from '../../../assets/Resource/resouces.jpg';
import {
    CardWrapper,
    BackgroundCard,
    TitleResource,
    ContentResource,
    ContentButton,
    ReverseContentButton,
} from '../styles';

import localStorageUtils from '@/utils/localStorageUtils';
import usePersistedState from '@/utils/usePersistedState';

const ResourceCard = ({ clickEvent, item }) => {
    const navigate = useNavigate();
    const roleInLocal = localStorageUtils.getItem('role');
    const role = usePersistedState('role', roleInLocal)[0];
    return (
        <CardWrapper>
            <BackgroundCard url={`${ResourceImage}`}>
                <TitleResource>Kỳ học: {item.semester}</TitleResource>
                <ContentResource>{item.name}</ContentResource>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        gap: '15px',
                        width: '100%',
                    }}
                >
                    {role === 'ADMIN' || role === 'MANAGER' ? (
                        <>
                            <ContentButton onClick={() => clickEvent('create', null)}>
                                Tạo
                            </ContentButton>
                            <ReverseContentButton onClick={() => clickEvent('edit', item)}>
                                Sửa
                            </ReverseContentButton>
                            <ContentButton onClick={() => navigate(`${item.id}`)}>
                                Xem tài nguyên
                            </ContentButton>
                        </>
                    ) : (
                        <ContentButton onClick={() => navigate(`${item.id}`)}>
                            Xem tài nguyên
                        </ContentButton>
                    )}
                </div>
            </BackgroundCard>
        </CardWrapper>
    );
};

export default ResourceCard;
