import { createSlice } from "@reduxjs/toolkit";
import { getWorkflow } from "./actions";

const initialState = {
  language: "ar",
  workflow: {
    data: {},
    loading: false,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: {
    [getWorkflow.pending]: (state, action) => {
      state.workflow.loading = true;
    },
    [getWorkflow.fulfilled]: (state, action) => {
      state.workflow.loading = false;
      state.workflow.data[action.payload?.name] = action.payload?.data;
    },
    [getWorkflow.rejected]: (state, action) => {
      state.workflow.loading = false;
    },
  },
});

export { getWorkflow };
export default appSlice.reducer;
