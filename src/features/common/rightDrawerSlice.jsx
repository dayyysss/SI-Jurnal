// rightDrawerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    header: '',
    bodyType: null,
    extraObject: null,
};

const rightDrawerSlice = createSlice({
    name: 'rightDrawer',
    initialState,
    reducers: {
        openRightDrawer: (state, action) => {
            state.isOpen = true;
            state.header = action.payload.header;
            state.bodyType = action.payload.bodyType;
            state.extraObject = action.payload.extraObject;
        },
        closeRightDrawer: (state) => {
            state.isOpen = false;
            state.header = '';
            state.bodyType = null;
            state.extraObject = null;
        },
    },
});

export const { openRightDrawer, closeRightDrawer } = rightDrawerSlice.actions;
export default rightDrawerSlice.reducer;
