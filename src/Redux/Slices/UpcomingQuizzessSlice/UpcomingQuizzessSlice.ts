import { createSlice } from "@reduxjs/toolkit";

interface UpcomingQuizzesState {
  upcomingQuizzes: object[] | null;
}

const initialState: UpcomingQuizzesState = {
  upcomingQuizzes: null,
};

const upcomingQuizzesSlice = createSlice({
  name: "upcomingQuizzes",
  initialState,
  reducers: {
    setUpcomingQuizzes: (state, action) => {
      state.upcomingQuizzes = action.payload;
    },
  },
});

export const { setUpcomingQuizzes } = upcomingQuizzesSlice.actions;
export default upcomingQuizzesSlice.reducer;
