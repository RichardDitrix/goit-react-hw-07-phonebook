import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getContacts } from 'redux/operations';
import {
  selectError,
  selectIsLoading,
  selectVisibleContacts,
} from 'redux/selectors';
import ContactItem from 'components/ContactItem';
import { ContactListStyled } from './ContactList.styled';

const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Failed to load contacts</p>;

  if (contacts?.length === 0) return <p>No contacts</p>;

  return (
    <ContactListStyled>
      {contacts?.map(contact => (
        <ContactItem key={contact.id} {...contact} />
      ))}
    </ContactListStyled>
  );
};

export default ContactList;
