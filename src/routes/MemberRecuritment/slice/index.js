import { injectReducer } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    eventId: 0,
    mileId: 0,
    listOfEvents: [],
    listOfMilestones: [],
};

export const name = 'listOfEvents';
export const slice = createSlice({
    name,
    initialState,
    reducers: {
        addEvent: (state, action) => {
            let newEvent = { ...action.payload, id: state.eventId };
            state.id++;
            state.listOfEvents.push(newEvent);
        },
        editEvent: (state, action) => {
            for (let i = 0; i < state.listOfEvents.length; i++) {
                if (state.listOfEvents[i].id == action.payload.id) {
                    state.listOfEvents.splice(i, 1);
                    state.listOfEvents.push(action.payload);
                } else {
                    console.log('false');
                }
            }
        },
        removeEvent: (state, action) => {
            for (let i = 0; i < state.listOfEvents.length; i++) {
                if (state.listOfEvents[i].id == action.payload.id) {
                    state.listOfEvents.splice(i, 1);
                } else {
                    console.log('false');
                }
            }
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

export const { addEvent, editEvent, removeEvent, removeMile, editMile, addMile } = slice.actions;
