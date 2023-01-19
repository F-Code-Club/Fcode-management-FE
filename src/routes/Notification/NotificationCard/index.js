import { Avatar } from 'antd';

import AvaImg from '../../../assets/avatar/Avatar.png';
import { NotificationStyled, FlexStyled } from './style';

import Flexbox from '@/components/Flexbox';

const NotificationCard = () => {
    return (
        <FlexStyled flexDirection="row" gap="10px" alignItems="center" read={false}>
            <Avatar src={AvaImg} alt="AvaNotification" />
            <NotificationStyled>
                <div className="notification_content">
                    {' '}
                    <span className="userAnnounce">Nguyễn Văn A</span> đã trả lời câu hỏi của bạn
                    trong bài viết nào đó
                </div>
                <span className="notification_liveTime"> 5 phút trước</span>
            </NotificationStyled>
        </FlexStyled>
    );
};

export default NotificationCard;
