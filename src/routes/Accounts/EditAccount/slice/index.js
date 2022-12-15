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
    isUpdate: 'hi',
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

        modal_confirm: (state, action) => {
            state.modal.confirm = action.payload;
        },
        setAccount: (state, action) => {
            console.log('redux');
            state.fullName = action.payload.firstName;
            (state.avatar =
                'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-9/318388454_560905159186930_4013435206853235624_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=X8_2wSY4oWYAX_d-cLd&_nc_ht=scontent.fsgn2-4.fna&oh=03_AdR_ySyMrHF83Repe7IxOHjGFgMY7Ub197Olezoig2pRTQ&oe=63C00F38'),
                (state.heroImage = faker.image.city(920, 200)),
                (state.joinDate = action.payload.clubEntryDate);
            (state.role = action.payload.role),
                (state.position = 'Chủ nhiệm'),
                (state.currentGender = (Math.random() <= 0.5) / 1),
                (state.birthdate = action.payload.dateOfBirth);
            state.emailFPT = action.payload.schoolMail;
            state.personalEmail = action.payload.personalMail;
            state.facebook = action.payload.facebookUrl;
            state.bio = action.description;
        },
    },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
