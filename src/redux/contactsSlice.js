import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { getContacts, addContact, deleteContact } from './operations';

const getActions = type =>
  isAnyOf(getContacts[type], addContact[type], deleteContact[type]);

const initialState = { items: [], isLoading: false, error: null };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(contact => contact.id !== payload.id);
      })
      .addMatcher(getActions('pending'), state => {
        state.isLoading = true; // Установка прапора isLoading true
      })
      .addMatcher(getActions('rejected'), (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addMatcher(getActions('fulfilled'), state => {
        state.isLoading = false;
        state.error = null;
      }),
});

export const { addContact: createContact, deleteContact: removeContact } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
