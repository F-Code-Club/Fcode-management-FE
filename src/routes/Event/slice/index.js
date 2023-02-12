import { injectReducer } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    eventId: 0,
    mileId: 0,
    listOfEvents: [],
    listOfMilestones: [],
};

export const name = 'listOfEvents';
const slice = createSlice({
    name,
    initialState,
    reducers: {
        setEvent: (state, action) => {
            state.listOfEvents = action.payload;
        },
        addEvent: (state, action) => {
            let newEvent = {
                ...action.payload,
                id: state.listOfEvents[state.listOfEvents.length - 1].id + 1,
            };

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
            state.mileId++;
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

export const { setEvent, addEvent, editEvent, removeEvent } = slice.actions;
export default slice;
// .addCase(filterBlogs.fulfilled, (state, action) => {
//     state.searchedActive = action.payload.active?.sort((a, b) =>
//         a.id > b.id ? 1 : -1
//     );
//     state.searchedProcessing = action.payload.processing?.sort((a, b) =>
//         a.id > b.id ? 1 : -1
//     );
//     state.searchedInactive = action.payload.inactive?.sort((a, b) =>
//         a.id > b.id ? 1 : -1
//     );
// })
