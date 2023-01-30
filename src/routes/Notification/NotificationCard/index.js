import { Avatar } from 'antd';
import moment from 'moment';

import AvaImg from '../../../assets/avatar/Avatar.png';
import { NotificationStyled, FlexStyled } from './style';

import Flexbox from '@/components/Flexbox';

const NotificationCard = ({ announce }) => {
    const calculateLiveTime = (createdTime) => {
        const currentTime = moment();
        const diff = moment.duration(currentTime.diff(createdTime));
        if (diff.asHours() >= 24) {
            return '1 day';
        }
        return diff.humanize();
    };

    return (
        <FlexStyled flexDirection="row" gap="10px" alignItems="center" read={false}>
            <Avatar src={AvaImg} alt="AvaNotification" />
            <NotificationStyled>
                <div className="notification_content">
                    {' '}
                    <span className="userAnnounce">{announce.title}</span> <br />
                    Location: {announce.location}
                </div>
                <span className="notification_liveTime">
                    {calculateLiveTime(announce.createdTime) + ' trước'}
                </span>
            </NotificationStyled>
        </FlexStyled>
    );
};

export default NotificationCard;
