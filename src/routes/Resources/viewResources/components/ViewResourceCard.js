import { useSelector } from 'react-redux';

import NoPhoto from '../../../../assets/no-photo.jpg';
import {
    ResourceCardContainer,
    ResourceImage,
    WrapperContent,
    TextTitle,
    Description,
} from '../styled';

import { selectUser } from '@/routes/Auth/slice/selector';
import { EditOutlined } from '@ant-design/icons';

const ViewResourcesCard = ({ title, des, link, handleClick, item }) => {
    const user = useSelector(selectUser);
    return (
        <ResourceCardContainer>
            <ResourceImage url={`${NoPhoto}`} />
            <WrapperContent>
                {user?.role === 'ADMIN' || user?.role === 'MANAGER' ? (
                    <TextTitle>
                        {title}
                        <EditOutlined
                            sx={{ marginLeft: '10px' }}
                            twoToneColor="#45CE7C"
                            onClick={() => handleClick('edit', item)}
                        />
                    </TextTitle>
                ) : (
                    <TextTitle>{title}</TextTitle>
                )}

                <Description>{des}</Description>
                <a href={link}>{link}</a>
            </WrapperContent>
        </ResourceCardContainer>
    );
};

export default ViewResourcesCard;
