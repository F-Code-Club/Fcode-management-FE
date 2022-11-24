import {
    CardWrapper,
    BackgroundCard,
    TitleResource,
    ContentResource, // Description,
    ContentButton,
    ReverseContentButton,
} from '../styles';

const ResourceCard = ({ clickEvent, item }) => {
    // <Description>HTML, CSS, JavaScript, ...</Description>
    console.log(item.imgs[0]);
    return (
        <CardWrapper>
            <BackgroundCard url={item.imgs[0]}>
                <TitleResource>{item.title}</TitleResource>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <ContentResource>{item.description}</ContentResource>
                </div>

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
