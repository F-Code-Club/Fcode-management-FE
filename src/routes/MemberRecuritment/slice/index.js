import { injectReducer } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    eventId: 0,
    mileId: 0,
    listOfMilestones: [],
};

export const name = 'listOfMilestones';
export const slice = createSlice({
    name,
    initialState,
    reducers: {
        setMile: (state, action) => {
            state.listOfMilestones = action.payload;
        },
        addMile: (state, action) => {
            let newEvent = { ...action.payload, id: state.mileId };
            state.id++;
            state.listOfMilestones.push(newEvent);
        },
        editMile: (state, action) => {
            for (let i = 0; i < state.listOfMilestones.length; i++) {
                if (state.listOfMilestones[i].id == action.payload.id) {
                    state.listOfMilestones.splice(i, 1);
                    state.listOfMilestones.push(action.payload);
                } else {
                    console.log('false');
                }
            }
        },
        removeMile: (state, action) => {
            for (let i = 0; i < state.listOfMilestones.length; i++) {
                if (state.listOfMilestones[i].id == action.payload.id) {
                    state.listOfMilestones.splice(i, 1);
                } else {
                    console.log('false');
                }
            }
        },
    },
});

injectReducer(name, slice.reducer);

export const { setMile, removeMile, editMile, addMile } = slice.actions;
