import {
    CardWrapper,
    BackgroundCard,
    TitleResource,
    ContentResource,
    Description,
    ContentButton,
    ReverseContentButton,
} from '../styles';

const ResourceCard = () => {
    return (
        <CardWrapper>
            <BackgroundCard>
                <TitleResource>Title resource</TitleResource>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <ContentResource>Content resource</ContentResource>
                    <Description>HTML, CSS, JavaScript, ...</Description>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '130px' }}>
                    <ContentButton>Tạo</ContentButton>
                    <ReverseContentButton>Sửa</ReverseContentButton>
                </div>
            </BackgroundCard>
        </CardWrapper>
    );
};

export default ResourceCard;
