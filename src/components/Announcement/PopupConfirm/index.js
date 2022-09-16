import { useState } from 'react';

import { Button } from 'antd';

import { ContainerPopup, ContentPopup, LayerPopup, Popup } from './style';

import { ExclamationCircleTwoTone } from '@ant-design/icons';

export const ConfirmDelete = (props) => {
    const action = props.action;
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const styleOnload = {
        background: 'rgba(69, 206, 124, 1)',
        color: 'white',
        border: '1px solid rgba(69, 206, 124, 1)',
    };

    const handleDelete = async (todo) => {
        await setLoading(true);
        todo == 1 && (await action());
        await setActive(false);
        await setLoading(false);
    };

    return (
        <div>
            <Button
                onClick={() => setActive(true)}
                type="primary"
                style={{ padding: '0 30px', borderRadius: '5px' }}
                danger
            >
                Xóa
            </Button>
            {active && (
                <ContainerPopup>
                    <LayerPopup onClick={() => !loading && handleDelete(0)} />
                    <Popup>
                        <ExclamationCircleTwoTone twoToneColor="#FFC53D" className="icon-popup" />
                        <ContentPopup>
                            <h3>{props.title}</h3>
                            <p>{props.content}</p>
                            <div>
                                <Button
                                    onClick={() => handleDelete(1)}
                                    loading={loading}
                                    style={loading ? styleOnload : {}}
                                >
                                    {props.buttonValue}
                                </Button>
                            </div>
                        </ContentPopup>
                    </Popup>
                </ContainerPopup>
            )}
        </div>
    );
};
