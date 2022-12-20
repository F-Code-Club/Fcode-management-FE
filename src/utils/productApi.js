import { get, post, put, remove } from './ApiCaller';

const productApi = {
    getAllEvent: (token) => {
        const url = `/event/all`;
        return get(url, {}, { authorization: token });
    },

    postEvent: (event, token) => {
        const url = '/event/new';
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
    editEvent: (event, token) => {
        const url = '/event';
        return put(
            url,
            {
                description: event.description,
                endTime: event.endTime,
                location: event.location,
                name: event.name,
                point: event.point,
                startTime: event.startTime,
                status: event.status,
                id: event.id,
            },
            {},
            { authorization: token }
        );
    },
    removeEvent: (id, token) => {
        const url = `/event/${id}`;
        return remove(url, {}, {}, { authorization: token });
    },
    getAllChallenge: (token) => {
        const url = `/challenge/all`;
        return get(url, {}, { authorization: token });
    },
    postChallange: (event, token) => {
        const url = '/challenge/new';
        return post(
            url,
            {
                description: event.description,
                endTime: event.endTime,
                startTime: event.startTime,
                status: event.status,
                title: event.title,
            },
            {},
            { authorization: token }
        );
    },
    editChallenge: (event, token) => {
        const url = '/challenge';
        return put(
            url,
            {
                description: event.description,
                endTime: event.endTime,
                title: event.title,
                startTime: event.startTime,
                status: event.status,
                id: event.id,
            },
            {},
            { authorization: token }
        );
    },
    removeChallenge: (id, token) => {
        const url = `/challenge/${id}`;
        return remove(url, {}, {}, { authorization: token });
    },
};

export default productApi;
