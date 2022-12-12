// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ResourceImage from '../../../assets/Resource/resouces.jpg';
import {
    CardWrapper,
    BackgroundCard,
    TitleResource,
    ContentResource, // Description,
    ContentButton,
    ReverseContentButton,
    ButtonResourceCard,
} from '../styles';

// import NoPhoto from '../../../assets/no-photo.jpg';
// import { fetchResourceBySubjectId } from '../viewResources/slice';

const ResourceCard = ({ clickEvent, item }) => {
    // const dispatch = useDispatch();

    const navigate = useNavigate();

    //item.imgs.length != 0 ? item.imgs[0] :
    return (
        <ButtonResourceCard
            onClick={() => {
                console.log('running');
                // dispatch(fetchResourceBySubjectId(item.id));
                navigate(`${item.id}`);
            }}
        >
            <CardWrapper>
                <BackgroundCard url={`${ResourceImage}`}>
                    <TitleResource>kỳ Học: {item.semester}</TitleResource>
                    <ContentResource>{item.name}</ContentResource>

                    <div
                        style={{ display: 'flex', justifyContent: 'space-between', width: '130px' }}
                    >
                        <ContentButton onClick={() => clickEvent('create', null)}>
                            Tạo
                        </ContentButton>
                        <ReverseContentButton onClick={() => clickEvent('edit', item)}>
                            Sửa
                        </ReverseContentButton>
                    </div>
                </BackgroundCard>
            </CardWrapper>
        </ButtonResourceCard>
    );
};

export default ResourceCard;
