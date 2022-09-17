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
    currentGender: 0,
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
            roles: ['participant', 'developer'],
        },
        {
            key: '1',
            semester: 'SU22',
            activity: 'Battle R.ODE',
            roles: ['organizer', 'participant'],
        },
        {
            key: '2',
            semester: 'SP21',
            activity: 'Recruitment',
            roles: ['organizer'],
        },
    ],
};

export const name = 'editAccount';

console.log(generateActions(initialState));

export const slice = createSlice({
    name,
    initialState,
    reducers: generateActions(initialState),
});

console.log(slice.actions);

injectReducer(name, slice.reducer);

export const { actions } = slice;
