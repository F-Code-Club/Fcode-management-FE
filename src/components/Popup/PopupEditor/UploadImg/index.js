import { useEffect, useState } from 'react';

import { Button, Image, Input, Modal } from 'antd';

import { ContainerUploadImg, ImageUpload, UploadTwoUrl } from './style';

import { PlusOutlined } from '@ant-design/icons';

export const UploadImage = (props) => {
    const actions = props.onChange;
    const [loading, setLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState({ url1: '', url2: '' });
    const [newUrl, setNewUrl] = useState({ url1: '', url2: '' });

    useEffect(() => {
        if (props.type === 'edit' && props.imageUrl) {
            let dataUrl = props.imageUrl.split(';');
            switch (dataUrl.length) {
                case 1:
                    setImgUrl({ url1: dataUrl[0] });
                    setNewUrl({ url1: dataUrl[0] });
                    break;
                case 2:
                    setImgUrl({ url1: dataUrl[0], url2: dataUrl[1] });
                    setNewUrl({ url1: dataUrl[0], url2: dataUrl[1] });
                    break;
            }
        }
    }, []);

    const handleUpload = () => {
        let res = newUrl.url1.trim();
        if (newUrl.url1.trim() != '' && newUrl.url2.trim() != '') res = res + ';';
        res = res + newUrl.url2.trim();
        setImgUrl({ url1: newUrl.url1.trim(), url2: newUrl.url2.trim() });
        actions(res);
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
            {imgUrl.url1 && <Image src={imgUrl.url1.trim()} alt="announcement" height={100} />}
            {imgUrl.url2 && <Image src={imgUrl.url2.trim()} alt="announcement" height={100} />}

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
                    <h3>Hình 1:</h3>
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
                    <h3>Hình 2:</h3>
                    <Input
                        value={newUrl.url2}
                        onChange={(e) =>
                            setNewUrl({
                                ...newUrl,
                                url2: e.target.value,
                            })
                        }
                        placeholder="https://image"
                    />
                    <br />
                    {newUrl.url1 && (
                        <Image src={newUrl.url1.trim()} alt="announcement" height={100} />
                    )}
                    {newUrl.url2 && (
                        <Image src={newUrl.url2.trim()} alt="announcement" height={100} />
                    )}
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
