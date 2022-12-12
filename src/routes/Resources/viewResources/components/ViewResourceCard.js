import NoPhoto from '../../../../assets/no-photo.jpg';
import {
    ResourceCardContainer,
    ResourceImage,
    WrapperContent,
    TextTitle,
    Description,
} from '../styled';

import { EditOutlined } from '@ant-design/icons';

const ViewResourcesCard = ({ title, des, link }) => {
    //img.length != 0 ? img[0] :
    return (
        <ResourceCardContainer>
            <ResourceImage url={`${NoPhoto}`} />
            <WrapperContent>
                <TextTitle>
                    {title}
                    <EditOutlined sx={{ marginLeft: '10px' }} twoToneColor="#45CE7C" />
                </TextTitle>
                <Description>{des}</Description>
                <a href={link}>{link}</a>
            </WrapperContent>
        </ResourceCardContainer>
    );
};

export default ViewResourcesCard;
