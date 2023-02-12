import { toastError } from '@/components/ToastNotification';
import { injectReducer } from '@/store';
import attendApi from '@/utils/apiComponents/attendApi';
import { searchString } from '@/utils/stringHelper';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const initialState = {
    listAttends: [],
    searchedAttends: [],
};
export const filterAttends = createAsyncThunk('filterAttends', async (keyword, thunkApi) => {
    // search blog by keyword
    const attendSearch = thunkApi
        .getState()
        .attend.listAttends?.filter(
            (item) => searchString(item.lastName, keyword) || searchString(item.firstName, keyword)
        );

    return { attendSearch };
});
export const getAttendById = createAsyncThunk('getAttendById', async (eventId, thunkApi) => {
    const attends = await attendApi.getAttendByEventId(eventId);

    return attends;
});
export const name = 'attend';
const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAttendById.fulfilled, (state, action) => {
                console.log('line 36 :', action.payload);

                state.listAttends = action.payload;
                state.searchedAttends = state.listAttends;
            })
            .addCase(filterAttends.fulfilled, (state, action) => {
                console.log('line 38 :');
                state.searchedAttends = action.payload.attendSearch;
            });
    },
});

injectReducer(name, slice.reducer);

// export const {} = slice.actions;
export default slice;
