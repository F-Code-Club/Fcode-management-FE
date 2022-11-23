import { useState } from 'react';

import { Button } from 'antd';

import { ContainerPopup, ContentPopup, LayerPopup, Popup } from '../styles';

import { themes } from '@/theme/theme';
import { ExclamationCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const styleOnload = {
    background: themes.colors.primary400,
    color: 'white',
    border: themes.colors.primary400,
};
export const ConfirmAction = (props) => {
    const action = props.action;
    const [loading, setLoading] = useState(false);

    const handleClick = async (status) => {
        await setLoading(true);
        await action(status);
        await setLoading(false);
    };

    return (
        <ContainerPopup>
            <LayerPopup onClick={() => !loading && handleClick(false)} />
            <Popup>
                {props.icon == 'delete' ? (
                    <ExclamationCircleTwoTone
                        twoToneColor={themes.colors.calendulaGold}
                        className="icon-popup"
                    />
                ) : (
                    <CloseCircleTwoTone
                        twoToneColor={themes.colors.danger}
                        className="icon-popup"
                    />
                )}
                <ContentPopup>
                    <h3>{props.title}</h3>
                    <p>{props.content}</p>
                    <div>
                        <Button onClick={() => handleClick(false)} className="cancel-btn">
                            Hủy
                        </Button>
                        <Button
                            onClick={() => handleClick(true)}
                            loading={loading}
                            style={loading ? styleOnload : {}}
                            className="accept-btn"
                        >
                            {props.buttonValue}
                        </Button>
                    </div>
                </ContentPopup>
            </Popup>
        </ContainerPopup>
    );
};
