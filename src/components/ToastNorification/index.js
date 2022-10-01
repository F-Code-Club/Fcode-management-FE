import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export const toastSuccess = (messages) => {
    toast.success(`${messages}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
};
export const toastWarning = (messages) => {
    toast.warn(`${messages}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
};
export const toastError = (messages) => {
    toast.error(`${messages}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
};
function Toast() {
    return (
        <Container>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Container>
    );
}

export default Toast;
const Container = styled.div`
    .Toastify__toast-body > div:last-child {
        flex: 0, im !important;
    }
`;
