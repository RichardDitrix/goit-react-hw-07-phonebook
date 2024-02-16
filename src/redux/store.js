import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { filterSlice } from './filterSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterSlice.reducer,
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
});
