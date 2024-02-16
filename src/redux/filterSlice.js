import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    updateFilter: (_, { payload }) => {
      return payload;
    },
  },
});

export const { updateFilter } = filterSlice.actions;

export const getFilter = state => state.filter;
