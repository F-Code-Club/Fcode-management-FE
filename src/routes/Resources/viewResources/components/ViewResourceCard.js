import NoPhoto from '../../../../assets/no-photo.jpg';
import {
    ResourceCardContainer,
    ResourceImage,
    WrapperContent,
    TextTitle,
    Description,
} from '../styled';

import localStorageUtils from '@/utils/localStorageUtils';
import usePersistedState from '@/utils/usePersistedState';
import { EditOutlined } from '@ant-design/icons';

const ViewResourcesCard = ({ title, des, link, handleClick, item }) => {
    const roleInLocal = localStorageUtils.getItem('role');
    const role = usePersistedState('role', roleInLocal)[0];
    return (
        <ResourceCardContainer>
            <ResourceImage url={`${NoPhoto}`} />
            <WrapperContent>
                {role === 'ADMIN' || role === 'MANAGER' ? (
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
