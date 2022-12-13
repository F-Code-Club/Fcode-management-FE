import NoPhoto from '../../../../assets/no-photo.jpg';
import {
    ResourceCardContainer,
    ResourceImage,
    WrapperContent,
    TextTitle,
    Description,
} from '../styled';

import { EditOutlined } from '@ant-design/icons';

const ViewResourcesCard = ({ title, des, link, handleClick, item }) => {
    return (
        <ResourceCardContainer>
            <ResourceImage url={`${NoPhoto}`} />
            <WrapperContent>
                <TextTitle>
                    {title}
                    <EditOutlined
                        sx={{ marginLeft: '10px' }}
                        twoToneColor="#45CE7C"
                        onClick={() => handleClick('edit', item)}
                    />
                </TextTitle>
                <Description>{des}</Description>
                <a href={link}>{link}</a>
            </WrapperContent>
        </ResourceCardContainer>
    );
};

export default ViewResourcesCard;
