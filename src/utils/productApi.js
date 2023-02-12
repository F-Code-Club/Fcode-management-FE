import { get, post, put, remove } from './ApiCaller';

const productApi = {
    getAllEvent: (token) => {
        const url = `/event/all`;
        return get(url, {}, { authorization: token });
    },

    postEvent: (event, token) => {
        const url = '/event/new';
        var postStartDate = new Date(event.startTime);
        var postEndDate = new Date(event.endTime);

        return post(
            url,
            {
                description: event.description,
                endTime: postEndDate.toISOString(),
                location: event.location,
                name: event.name,
                point: event.point,
                startTime: postStartDate.toISOString(),
                status: event.status,
            },
            {},
            { authorization: token }
        );
    },
    getPersonalAccount: (token) => {
        const url = `/member/own`;
        return get(url, {}, { authorization: token });
    },
    getAllAccount: (token) => {
        const url = `/member/all`;
        return get(url, {}, { authorization: token });
    },
    getAccountById: (id, token) => {
        const url = `/member/memberId/${id}`;
        return get(url, {}, { authorization: token });
    },
    updateOwnAccount: (info, token) => {
        const url = `/member/us`;
        return put(
            url,
            {
                avatarUrl: info.avatar,
                clubEntryDate: info.joinDate,
                crewId: info.crewId + 1,
                dateOfBirth: info.birthdate,
                description: info.bio,
                facebookUrl: info.facebook,
                firstName: info.firstName,
                lastName: info.lastName,
                major: info.major,
                personalMail: info.personalEmail,
                phone: info.phone,
                positionId: info.position + 1,
                role: info.role,
                schoolMail: info.emailFPT,
                studentId: info.studentId,
            },
            {},
            { authorization: token }
        );
    },
    updateOwnAccountPersonalEmail: (info, token, APIEmailFPT) => {
        const url = `/member/us`;
        return put(
            url,
            {
                avatarUrl: info.avatar,
                clubEntryDate: info.joinDate,
                crewId: info.crewId + 1,
                dateOfBirth: info.birthdate,
                description: info.bio,
                facebookUrl: info.facebook,
                firstName: info.firstName,
                lastName: info.lastName,
                major: info.major,
                personalMail: info.personalEmail,
                phone: info.phone,
                positionId: info.position + 1,
                role: info.role,
                studentId: info.studentId,
                // schoolMail: APIEmailFPT,
            },
            {},
            { authorization: token }
        );
    },
    updateOwnAccountFPTMail: (info, token, APIPersonalEmail) => {
        const url = `/member/us`;
        return put(
            url,
            {
                avatarUrl: info.avatar,
                clubEntryDate: info.joinDate,
                crewId: info.crewId + 1,
                dateOfBirth: info.birthdate,
                description: info.bio,
                facebookUrl: info.facebook,
                firstName: info.firstName,
                lastName: info.lastName,
                major: info.major,
                phone: info.phone,
                positionId: info.position + 1,
                role: info.role,
                schoolMail: info.emailFPT,
                studentId: info.studentId,
            },
            {},
            { authorization: token }
        );
    },
    editEvent: (event, token) => {
        const url = '/event';
        var postStartDate = new Date(event.startTime);
        var postEndDate = new Date(event.startTime);
        return put(
            url,
            {
                description: event.description,
                endTime: postEndDate.toISOString(),
                location: event.location,
                name: event.name,
                point: event.point,
                startTime: postStartDate.toISOString(),
                status: event.status,
                id: event.id,
            },
            {},
            { authorization: token }
        );
    },
    removeMember: (id, token) => {
        const url = `/member/id/${id}`;
        return remove(url, {}, {}, { authorization: token });
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
                endTime: event.startTime,
                startTime: event.endTime,
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
                status: event.status,
                startTime: event.startTime,
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
    getOwnAttendance: (token) => {
        const url = `/attendance`;
        return get(url, {}, { authorization: token });
    },
    getOwnArticle: (id, token) => {
        const url = `/article/author/${id}`;
        return get(url, {}, { authorization: token });
    },
    putAccountByAdmin: (info, token) => {
        const url = `/member/ad`;
        return put(
            url,
            {
                avatarUrl: info.avatar,
                clubEntryDate: info.joinDate,
                crewId: info.crewId + 1,
                dateOfBirth: info.birthdate,
                description: info.bio,
                facebookUrl: info.facebook,
                firstName: info.firstName,
                lastName: info.lastName,
                major: info.major,
                personalMail: info.personalEmail,
                phone: info.phone,
                positionId: info.position + 1,
                id: info.id,
                role: info.roles[info.role],
                schoolMail: info.emailFPT,
                studentId: info.studentId,
            },
            {},
            { authorization: token }
        );
    },
    putAccountByAdminWithChangingEmail: (info, token) => {
        const url = `/member/ad`;
        return put(
            url,
            {
                avatarUrl: info.avatar,
                clubEntryDate: info.joinDate,
                crewId: info.crewId + 1,
                dateOfBirth: info.birthdate,
                description: info.bio,
                facebookUrl: info.facebook,
                firstName: info.firstName,
                lastName: info.lastName,
                major: info.major,
                id: info.id,
                personalMail: info.personalEmail,
                phone: info.phone,
                positionId: info.position + 1,
                role: info.roles[info.role],
                // schoolMail: info.emailFPT,
                studentId: info.studentId,
            },
            {},
            { authorization: token }
        );
    },
};

export default productApi;
