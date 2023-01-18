import { useSelector } from 'react-redux';
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

import { selectUser } from '@/routes/Auth/slice/selector';

const ResourceCard = ({ clickEvent, item, heightStyle }) => {
    const userRole = useSelector(selectUser);

    const navigate = useNavigate();

    return (
        <CardWrapper height={heightStyle}>
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
                    {userRole.role === 'ADMIN' || userRole.role === 'MANAGER' ? (
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
                        <ContentButton onClick={() => navigate(`/manage-resource/${item.id}`)}>
                            Xem tài nguyên
                        </ContentButton>
                    )}
                </div>
            </BackgroundCard>
        </CardWrapper>
    );
};

export default ResourceCard;
