import { injectReducer } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    id: 0,
    listOfEvents: [],
};

export const name = 'listOfEvents';
export const slice = createSlice({
    name,
    initialState,
    reducers: {
        addEvent: (state, action) => {
            let newEvent = { ...action.payload, id: state.id };
            state.id++;
            state.listOfEvents.push(newEvent);
        },
        editEvent: (state, action) => {
            console.log(action.payload);
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
    },
});

injectReducer(name, slice.reducer);

export const { addEvent, editEvent, removeEvent } = slice.actions;
