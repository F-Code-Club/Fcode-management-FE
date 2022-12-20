import { injectReducer } from '@/store';
import generateActions from '@/utils/generateActions';
import { faker } from '@faker-js/faker';
import { createSlice } from '@reduxjs/toolkit';

const fullName = faker.name.fullName().split(' ');
export const initialState = {
    allAccount: [],
    fullName: fullName.join(' '),
    avatar: faker.image.cats(160, 160),
    heroImage: faker.image.nightlife(920, 200),
    joinDate: faker.date.past(2).getTime(),
    role: 0,
    crewId: 0,
    major: '',
    studentId: '',
    position: 0,
    roles: ['MEMBER', 'MANAGER', 'ADMIN'],
    crews: ['FE', 'BE', 'AI', 'IA'],
    positions: ['Admin', 'Student'],
    birthdate: faker.date.birthdate({ min: 18, max: 25, mode: 'age' }).getTime(),
    emailFPT: faker.internet.email(fullName[0], fullName[1], 'fpt.edu.vn'),
    personalEmail: faker.internet.email(fullName[0], fullName[1], 'gmail.com'),
    facebook: 'facebook.com/' + faker.internet.userName(fullName[0], fullName[1]),
    phone: '',
    bio: '',
    id: 0,
    firstName: '',
    lastName: '',
    modal: {
        confirm: false,
    },
    info: {},
};

export const name = 'editAccounts';

export const slice = createSlice({
    name,
    initialState,
    reducers: {
        ...generateActions(initialState),

        modal_confirm: (state, action) => {
            state.modal.confirm = action.payload;
        },
        setAccount: (state, action) => {
            state.fullName = action.payload.lastName + ' ' + action.payload.firstName;
            state.avatar = action.payload.avatarUrl;
            state.heroImage =
                'https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/320350910_541602290953750_2748185547163871846_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=SYkHXc9xbbAAX_JqEoM&tn=1HBnLczPW52L_h4j&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfCBJF6UJZTTxCLMsSKf1uI5dywu5IY7SDFL7amvHapTVA&oe=63A276FF ';
            state.joinDate = action.payload.clubEntryDate;
            switch (action.payload.role) {
                case 'ADMIN':
                    state.role = 3;
                    break;
                case 'MANAGER':
                    state.role = 2;
                    break;
            }
            state.role--;
            state.position = action.payload.positionId - 1;
            state.currentGender = (Math.random() <= 0.5) / 1;
            state.birthdate = action.payload.dateOfBirth;
            state.emailFPT = action.payload.schoolMail;
            state.personalEmail = action.payload.personalMail;
            state.facebook = action.payload.facebookUrl;
            state.bio = action.payload.description;
            state.id = action.payload.id;

            state.crewId = action.payload.crewId - 1;
            state.major = action.payload.major;
            state.studentId = action.payload.studentId;
            state.phone = action.payload.phone;
            state.firstName = state.fullName.split(' ').slice(-1).join(' ');
            state.lastName = state.fullName.split(' ').slice(0, -1).join(' ');
        },
        getAccount: (state) => {
            state.info = {
                fullName: state.fullName,
                avatar: state.avatar,
                joinDate: state.joinDate,
                role: state.role,
                crewId: state.crewId,
                major: state.major,
                studentId: state.studentId,
                position: state.position,
                birthdate: state.birthdate,
                emailFPT: state.emailFPT,
                personalEmail: state.personalEmail,
                facebook: state.facebook,
                bio: state.bio,
                id: state.id,
                roles: state.roles,
                phone: state.phone,
                firstName: state.fullName.split(' ').slice(-1).join(' '),
                lastName: state.fullName.split(' ').slice(0, -1).join(' '),
            };
        },
        getAllAccount: (state, action) => {
            state.allAccount = action.payload;
        },
    },
});

injectReducer(name, slice.reducer);

export const { actions } = slice;
