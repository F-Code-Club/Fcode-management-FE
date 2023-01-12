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
                <Image
                    src={
                        newUrl.trim() ||
                        'https://s3-alpha-sig.figma.com/img/45c7/b834/5cbf35abd1e4216bda5c0e9e6bee66f4?Expires=1674432000&Signature=p2r50hSIU0V3hwLMIGXbtfIa~oVXxPzukpP-1CFgXRD0TA~hZB~Zlw0Q63Bm3UJXlMaYAEYxud-t16n-bvMyYta~jE30BWxJhzGP4xrDRuHSloUp7AAwhBJFQKX1AwwR8I5M4UutmTvhZAOVv41I6lOV6gX1m9EpiarvO7oDi7fELisSVcIOr2FNUxFmqokuUM-LWZKuvG~sY08nET7BcSYTv70zFVr1sKPaKRuzMAaepB2AqM2B-f1tG5jbRJVmdFB2yqD5V8nwMUAvYLKISL7osvUmZgyKGjGJawi-UoZ0PYmCeFfUnrdY5tPWEzvE0w~vzQP89LwjjKdXJ255VQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                    }
                    alt="ava"
                    height={300}
                />

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
