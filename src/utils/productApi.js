import { get, post } from './ApiCaller';

const productApi = {
    getAllEvent: (token) => {
        const url = `/event/all`;
        return get(url, {}, { authorization: token });
    },
    getAllChallenge: (token) => {
        const url = `/challenge/all`;
        return get(url, {}, { authorization: token });
    },
    postEvent: (event, token) => {
        const url = '/challenge/new';
        return post(
            url,
            {
                description: event.description,
                endTime: event.endTime,
                location: event.location,
                name: event.name,
                point: event.point,
                startTime: event.startTime,
                status: event.status,
            },
            {},
            { authorization: token }
        );
    },
};

export default productApi;
