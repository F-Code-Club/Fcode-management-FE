import { injectReducer } from '@/store';
import generateActions from '@/utils/generateActions';
import { faker } from '@faker-js/faker';
import { createSlice } from '@reduxjs/toolkit';

const fullName = faker.name.fullName().split(' ');

export const initialState = {
    fullName: fullName.join(' '),
    avatar: faker.image.cats(160, 160),
    heroImage: faker.image.city(920, 200),
    joinDate: faker.date.past(2).getTime(),
    role: 'Admin',
    position: 'Chủ nhiệm',
    genders: ['Nam', 'Nữ'],
    currentGender: (Math.random() <= 0.5) / 1,
    birthdate: faker.date.birthdate({ min: 18, max: 25, mode: 'age' }).getTime(),
    emailFPT: faker.internet.email(fullName[0], fullName[1], 'fpt.edu.vn'),
    personalEmail: faker.internet.email(fullName[0], fullName[1], 'gmail.com'),
    facebook: 'facebook.com/' + faker.internet.userName(fullName[0], fullName[1]),
    bio: '',
    tags: {
        organizer: 'geekblue',
        participant: 'green',
        developer: 'volcano',
    },
    activities: [
        {
            key: '0',
            semester: 'FA23',
            activity: 'Techaway',
            roles: ['participant', 'developer', 'organizer'],
        },
        {
            key: '1',
            semester: 'SU20',
            activity: 'Battle R.ODE',
            roles: ['organizer', 'participant'],
        },
        {
            key: '2',
            semester: 'SP22',
            activity: 'Recruitment',
            roles: ['organizer'],
        },
        {
            key: '4',
            semester: 'SP21',
            activity: 'Team building',
            roles: ['organizer', 'participant'],
        },
    ],
    modal: {
        confirm: false,
    },
};

export const name = 'editAccount';

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        ...generateActions(initialState),
        removeRole: (state, action) => {
            const { key, role } = action.payload;
            const activityIndex = state.activities.findIndex((activity) => activity.key == key);
            const roles = state.activities[activityIndex].roles;
            state.activities[activityIndex].roles = roles.filter((_role) => _role != role);
        },
        modal_confirm: (state, action) => {
            state.modal.confirm = action.payload;
        },
    },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
