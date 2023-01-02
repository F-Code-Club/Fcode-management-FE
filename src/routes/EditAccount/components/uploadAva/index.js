import { useState } from 'react';

import { Button, Image, Input, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../slice';
import selector from '../../slice/selectors';
import { UploadTwoUrl } from './styled';

export const UploadImage = ({ loading, setLoading }) => {
    const dispatch = useDispatch();
    const ava = useSelector(selector.avatar);
    const [newUrl, setNewUrl] = useState(ava || '');

    const handleUpload = () => {
        dispatch(actions.setAvatar(newUrl));
        dispatch(actions.getAccount());
        setLoading(false);
    };

    const handleCancel = () => {
        setLoading(false);
    };

    return (
        <Modal
            open={loading}
            title="Nhập url của Avatar vào đây:"
            footer={false}
            onCancel={() => handleCancel()}
            closable={true}
            centered
        >
            <UploadTwoUrl>
                {newUrl && <Image src={newUrl.trim()} alt="ava" height={300} />}
                <br />
                <Input
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://image"
                />
                <div className="two-button">
                    <Button onClick={() => handleCancel()} className="cancel-btn">
                        Hủy
                    </Button>
                    <Button onClick={() => handleUpload()} className="ok-btn">
                        Lưu
                    </Button>
                </div>
            </UploadTwoUrl>
        </Modal>
    );
};
