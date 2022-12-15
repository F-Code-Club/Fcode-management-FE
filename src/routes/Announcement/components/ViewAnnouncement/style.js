import styled from 'styled-components';

export const ContainerAnnounce = styled.div`
    min-height: calc(100vh - 140px);
    padding: 0 5rem;
    .rdw-editor-toolbar {
        display: none;
    }
`;
export const ContentAnnounce = styled.div`
    background: white;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 2rem 5rem;
    .title {
        font-size: 36px;
        text-align: center;
    }
    .public-DraftEditor-content div {
        text-align: justify;
    }
`;
