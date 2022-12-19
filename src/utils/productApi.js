import { get, put } from './ApiCaller';

const productApi = {
    getAllAccount: (token) => {
        const url = '/member/all';
        return get(url, {}, { authorization: token });
    },
    getAccountById: (id, token) => {
        const url = `/member/memberId/${id}`;
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
                id: info.id,
                personalMail: info.personalEmail,
                phone: info.phone,
                positionId: info.position + 1,
                role: info.roles[info.role],
                schoolMail: info.emailFPT,
                studentId: info.studentId,
            },
            {},
            { authorization: token }
        );
    },
    getPersonalAccount: (token) => {
        const url = `/member/own`;
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
};

export default productApi;
