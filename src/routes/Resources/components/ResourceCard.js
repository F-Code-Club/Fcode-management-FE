import NoPhoto from '../../../assets/no-photo.jpg';
import {
    CardWrapper,
    BackgroundCard,
    TitleResource,
    ContentResource, // Description,
    ContentButton,
    ReverseContentButton,
} from '../styles';

const ResourceCard = ({ clickEvent, item }) => {
    return (
        <CardWrapper>
            <BackgroundCard url={item.imgs.length != 0 ? item.imgs[0] : `${NoPhoto}`}>
                <TitleResource>{item.title}</TitleResource>
                <ContentResource>{item.description}</ContentResource>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '130px' }}>
                    <ContentButton onClick={() => clickEvent('create', null)}>Tạo</ContentButton>
                    <ReverseContentButton onClick={() => clickEvent('edit', item)}>
                        Sửa
                    </ReverseContentButton>
                </div>
            </BackgroundCard>
        </CardWrapper>
    );
};

export default ResourceCard;
