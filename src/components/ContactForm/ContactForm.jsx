import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix';
import { selectContacts, selectIsLoading } from 'redux/selectors';
import { addContact } from 'redux/operations';

import { Form, Label, Input } from './ContactForm.styled';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const onChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const onSubmit = async event => {
    event.preventDefault();

    try {
      const isContactExist = contacts.find(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      );

      if (isContactExist) throw new Error(`${name} is already in contacts`);

      const result = await dispatch(addContact({ name, phone }));

      if (result.error) throw new Error('Failed to add contact to database');

      Notify.success('Contact added successfully');
      setName('');
      setPhone('');
    } catch (error) {
      Notify.failure(error.message);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onChange}
        />
      </Label>

      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={onChange}
        />
      </Label>

      <button type="submit" disabled={isLoading}>
        Add contact
      </button>
    </Form>
  );
};

export default ContactForm;
