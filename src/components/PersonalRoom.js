import React from 'react';

import { Modal } from './Modal';
import Header from './Header';

import { useSelector, useDispatch } from 'react-redux';

import { ItemList } from './ItemList/ItemList';

import { CreatorButton } from './ProjectCreator';

import { fetchItems } from '../actions/projectItemsList';

import './style.css';

export default function LoginPage() {
  const dispatch = useDispatch();

  const modelOpen = useSelector((state) => state.modal.modalActive);
  React.useEffect(() => {
    dispatch(fetchItems());
  }, []);

  const user_name = localStorage.getItem('user');

  const getStatusButton = (item) => {
    const user_name = localStorage.getItem('user');
    if (item.user == user_name) return <div className='status_proj'>Org</div>;
    if (item.candidates.includes(user_name))
      return (
        <div
          className='status_proj_false'
          onClick={() => {
            const user_name = localStorage.getItem('user');
            var index = item.candidates.indexOf(user_name);
            if (index > -1) {
              item.candidates.splice(index, 1);
            }

            fetch(`http://localhost:3000/posts/${item.id}`, {
              headers: {
                'Content-Type': 'Application/json',
              },
              body: JSON.stringify(item),
              method: 'PUT',
            })
              .then((response) => response.json())
              .then(() => {
                dispatch(fetchItems());
              });
          }}
        >
          Applied
        </div>
      );
    if (item.participants.includes(user_name))
      return <div className='status_proj_false'>Involved</div>;
    else
      return (
        <div
          className='status_proj'
          onClick={() => {
            const user_name = localStorage.getItem('user');
            item.candidates.push(user_name);

            fetch(`http://localhost:3000/posts/${item.id}`, {
              headers: {
                'Content-Type': 'Application/json',
              },
              body: JSON.stringify(item),
              method: 'PUT',
            })
              .then((response) => response.json())
              .then(() => {
                dispatch(fetchItems());
              });
          }}
        >
          Apply
        </div>
      );
  };

  return (
    <div className='room_wrapper'>
      <Header name='Personal room' />
      <CreatorButton />
      <div className='room_wrapper'>
        <ItemList
          filterFunc={(el) =>
            el.participants.includes(user_name) ||
            el.candidates.includes(user_name)
          }
          statusButton={getStatusButton}
        />
      </div>
      {modelOpen && <Modal onClose={() => {}} />}
    </div>
  );
}
