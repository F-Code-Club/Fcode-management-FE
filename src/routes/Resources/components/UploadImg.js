import { useState } from 'react';

import { Button, Image, Input, Modal } from 'antd';

import { ContainerUploadImg, ImageUpload, UploadTwoUrl } from '../styles';

import { PlusOutlined } from '@ant-design/icons';

export const UploadImage = (props) => {
    const actions = props.onChange;
    const [imgList, setImgList] = useState(props.type === 'edit' ? props.imgs : []);
    const [loading, setLoading] = useState(false);
    const [newUrl, setNewUrl] = useState({
        url1: props.type === 'edit' ? props.imgs[0] : '',
    });

    const handleUpload = () => {
        actions([newUrl.url1]);
        setImgList([newUrl.url1]);
        setLoading(false);
    };

    return (
        <ContainerUploadImg>
            <h3 className="title">
                Upload <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>(Optional)</span> :
            </h3>

            {imgList.length > 0 &&
                imgList.map(
                    (item, key) =>
                        item && <Image key={key} alt="Not found" height={100} src={item} />
                )}

            <ImageUpload onClick={() => setLoading(true)}>
                <PlusOutlined />
                <p>Upload</p>
            </ImageUpload>

            <Modal
                open={loading}
                title="Nhập url của hình ảnh vào đây:"
                footer={false}
                onCancel={() => setLoading(false)}
                closable={true}
                centered
            >
                <UploadTwoUrl>
                    <h3>Hình:</h3>
                    <Input
                        value={newUrl.url1}
                        onChange={(e) =>
                            setNewUrl({
                                ...newUrl,
                                url1: e.target.value,
                            })
                        }
                        placeholder="https://image"
                    />

                    {newUrl.url1 && <Image src={newUrl.url1} alt="Not found" height={100} />}

                    <div className="two-button">
                        <Button onClick={() => setLoading(false)} className="cancel-btn">
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
