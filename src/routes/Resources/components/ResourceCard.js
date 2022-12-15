import { useNavigate } from 'react-router-dom';

import ResourceImage from '../../../assets/Resource/resouces.jpg';
import {
    CardWrapper,
    BackgroundCard,
    TitleResource,
    ContentResource, // Description,
    ContentButton,
    ReverseContentButton,
} from '../styles';

const ResourceCard = ({ clickEvent, item }) => {
    const navigate = useNavigate();

    return (
        <CardWrapper>
            <BackgroundCard url={`${ResourceImage}`}>
                <TitleResource>Kỳ học: {item.semester}</TitleResource>
                <ContentResource>{item.name}</ContentResource>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
                    <ContentButton onClick={() => clickEvent('create', null)}>Tạo</ContentButton>
                    <ReverseContentButton onClick={() => clickEvent('edit', item)}>
                        Sửa
                    </ReverseContentButton>
                    <ContentButton onClick={() => navigate(`${item.id}`)}>Xem</ContentButton>
                </div>
            </BackgroundCard>
        </CardWrapper>
    );
};

export default ResourceCard;
