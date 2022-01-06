import React from 'react';

import { Modal } from './Modal';
import Header from './Header';

import { useSelector, useDispatch } from 'react-redux';

import { ItemList } from './ItemList/ItemList';

import { fetchItems } from '../actions/projectItemsList';
import { ApiClientService } from '../services/ApiClientService';

import './style.css';
import { Redirect } from 'react-router-dom';

export default function LoginPage(props) {
  const { user } = props;
  const dispatch = useDispatch();

  const modelOpen = useSelector((state) => state.modal.modalActive);
  React.useEffect(() => {
    dispatch(fetchItems());
  }, []);

  const getApplyButton = (item) => {
    const user_name = Number(localStorage.getItem('user_id'));
    if (item.user == user_name) return <div className='status_proj'>Org</div>;
    const init_state = item.candidates.map((el) => el.id).includes(user_name);

    const [Applied, setApplied] = React.useState(init_state);

    if (Applied)
      return (
        <div
          className='status_proj_false'
          onClick={async () => {
            const user_name_ = localStorage.getItem('user');
            const answ = await ApiClientService('users/');

            const user_id = answ.results.find(
              (el) => el['username'] == user_name_
            )['user'];
            const index = item.candidates
              .map((el) => el.id)
              .indexOf(user_id.id);

            if (index > -1) {
              item.candidates.splice(index, 1);
            }

            const formData = new FormData();
            for (let postKey in item) {
              if (postKey != 'image' && postKey != 'participants') {
                formData.append(postKey, JSON.stringify(item[postKey]));
              }
              if (postKey == 'participants') {
                for (let a of item[postKey]) {
                  console.log('ITEM', postKey + '[]', JSON.stringify(a));
                  formData.append(postKey + '[]', JSON.stringify(a));
                }
              }
            }
            setApplied(item.candidates.map((el) => el.id).includes(user_name));

            console.log('ApiClientService-run-1');

            await ApiClientService(`posts/${item.id}/`, {
              method: 'PUT',
              body: formData,
            });
          }}
        >
          Applied
        </div>
      );
    if (item.participants.map((el) => el.id).includes(user_name))
      return <div className='status_proj_false'>Involved</div>;
    else
      return (
        <div
          className='status_proj'
          onClick={async () => {
            const user_name_ = localStorage.getItem('user');
            const answ = await ApiClientService('users/');
            console.log('getApplyButton-response', answ);

            const user_id = answ.results.find(
              (el) => el['username'] == user_name_
            )['user'];

            item.candidates.push(user_id);

            const formData = new FormData();
            for (let postKey in item) {
              if (postKey != 'image' && postKey != 'participants') {
                console.log(postKey, JSON.stringify(item[postKey]));
                formData.append(postKey, JSON.stringify(item[postKey]));
              }
              if (postKey == 'participants') {
                for (let a of item[postKey]) {
                  console.log('ITEM', postKey + '[]', JSON.stringify(a));
                  formData.append(postKey + '[]', JSON.stringify(a));
                }
              }
            }
            setApplied(item.candidates.map((el) => el.id).includes(user_name));
            console.log('formData', formData);

            console.log('ApiClientService-run-2');
            await ApiClientService(`posts/${item.id}/`, {
              method: 'PUT',
              body: formData,
            });
          }}
        >
          Apply
        </div>
      );
  };

  let [redirect, setRedirect] = React.useState(false);
  if (redirect) {
    redirect = false;
    return <Redirect to='/room/' />;
  }

  return (
    <div className='room_wrapper'>
      <Header user={user} name='Personal room' />
      <div className='block_creator'>
        <div
          className='title_block_creator'
          onClick={() => {
            setRedirect(true);
          }}
        >
          All projects/My projects
        </div>
      </div>
      <div className='room_wrapper'>
        <ItemList statusButton={getApplyButton} />
      </div>
      {modelOpen && <Modal onClose={() => {}} />}
    </div>
  );
}
