import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import { deleteContact } from 'redux/operations';
import { selectIsLoading } from 'redux/selectors';

import { Info, Item } from './ContactItem.styled';

const ContactItem = ({ id, name, phone }) => {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteContact(id));
    Notify.success('The contact was successfully deleted');
  };

  return (
    <Item>
      <Info>
        {name}: {phone}
      </Info>

      <button type="button" disabled={isLoading} onClick={onDelete}>
        Delete
      </button>
    </Item>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default ContactItem;
