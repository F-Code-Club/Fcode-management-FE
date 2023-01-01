import { useEffect, useState } from 'react';

import { Button, Image, Input, Modal } from 'antd';

import { ContainerUploadImg, ImageUpload, UploadTwoUrl } from './styled';

import { PlusOutlined } from '@ant-design/icons';

export const UploadImage = () => {
    const [loading, setLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState('');
    const [newUrl, setNewUrl] = useState('');

    const handleUpload = () => {
        if (newUrl.url1.trim() != '') setImgUrl(newUrl.url1.trim());
        setLoading(false);
    };
    const handleCancel = () => {
        setLoading(false);
    };

    return (
        <ContainerUploadImg>
            <h3 className="title">
                Thêm hình :<div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>(Optional)</div>
            </h3>
            {imgUrl && <Image src={imgUrl.trim()} alt="announcement" height={100} />}

            <ImageUpload onClick={() => setLoading(true)}>
                <PlusOutlined />
                <p>Upload</p>
            </ImageUpload>

            <Modal
                open={loading}
                title="Nhập url của hình ảnh vào đây:"
                footer={false}
                onCancel={() => handleCancel()}
                closable={true}
                centered
            >
                <UploadTwoUrl>
                    <Input
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        placeholder="https://image"
                    />

                    <br />
                    {newUrl && <Image src={newUrl.trim()} alt="ava" height={100} />}

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
        </ContainerUploadImg>
    );
};
