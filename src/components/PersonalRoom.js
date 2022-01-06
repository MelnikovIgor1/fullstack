import React from 'react'; // { useState },

// import { Modal } from './Modal';
import Header from './Header';

import { useSelector, useDispatch } from 'react-redux';

import { ItemList } from './ItemList/ItemList';

import { CreatorButton } from './ProjectCreator';

import { fetchItems } from '../actions/projectItemsList';
import { ApiClientService } from '../services/ApiClientService';
// import { createSelector } from 'reselect';

import './style.css';

export default function LoginPage(props) {
  const { user } = props;
  const dispatch = useDispatch();

  console.log(user);

  // const modelOpen = useSelector((state) => state.modal.modalActive);

  React.useEffect(() => {
    dispatch(fetchItems());
  }, []);

  // const postList = useSelector((state) => state.projectItemsList.itemsList);
  const items = useSelector((state) => state.projectItemsList.items);
  console.log(items);
  let arr = [];
  for (let a in items) {
    if (items[a].user.id === user.id) {
      arr.push(items[a]);
    }
  }

  // console.log(postList, items, user);
  // const obj_list = items.map((el) => items[el]);
  // console.log('OUT', obj_list);
  // console.log('ARR', Object.assign({}, ...items.map((x) => x)));
  // for (var type in items) {
  //   console.log(items[type]);
  // }

  // const my_posts = postList.filter((el) => {
  //   console.log('el', el.user, user, el);
  //   el.user.id === user.id;
  // });

  // console.log('myposts:', items, ...items);

  // const user_name = Number(localStorage.getItem('user_id'));
  // console.log('LoginPage');

  const getStatusButton = (item) => {
    const user_name = Number(localStorage.getItem('user_id'));
    if (item.user == user_name) return <div className='status_proj'>Org</div>;
    const init_state = item.candidates.map((el) => el.id).includes(user_name);

    const [Applied, setApplied] = React.useState(init_state);

    if (Applied)
      return (
        <div
          className='status_proj_false'
          onClick={async () => {
            console.log('getStatusButton-Applied-start');
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
              if (postKey != 'image') {
                formData.append(postKey, JSON.stringify(item[postKey]));
              }
            }
            setApplied(item.candidates.map((el) => el.id).includes(user_name));
          }}
        >
          Applied
        </div>
      );
    else if (item.participants.includes(user_name))
      return <div className='status_proj_false'>Involved</div>;
    else if (item.participants.map((el) => el.id).includes(user_name))
      return <div className='status_proj_false'>Involved</div>;
    else
      return (
        <div
          className='status_proj'
          onClick={async () => {
            const user_name_ = localStorage.getItem('user');
            const answ = await ApiClientService('users/');

            const user_id = answ.results.find(
              (el) => el['username'] == user_name_
            )['user'];

            item.candidates.push(user_id);

            const formData = new FormData();
            for (let postKey in item) {
              if (postKey != 'image') {
                formData.append(postKey, JSON.stringify(item[postKey]));
              }
            }
            setApplied(item.candidates.map((el) => el.id).includes(user_name));
          }}
        >
          Apply
        </div>
      );
  };

  // console.log(
  //   <ItemList
  //     filterFunc={(el) =>
  //       el.participants.map((el) => el.id).includes(user_name) ||
  //       el.candidates.map((el) => el.id).includes(user_name)
  //     }
  //     statusButton={getStatusButton}
  //   />
  // );

  return (
    <div className='room_wrapper'>
      <Header user={user} name='Personal room' />
      <CreatorButton />
      <div className='room_wrapper'>
        <ItemList
          list={arr}
          user={user}
          statusButton={getStatusButton}
          //  filterFunc={(el) =>
          //    el.participants.map((el) => el.id).includes(user_name) ||
          //    el.candidates.map((el) => el.id).includes(user_name)
          //  }
          // statusButton={getStatusButton}
        />
      </div>
    </div>
    // <div className='room_wrapper'>
    //   <Header name='Personal room' />
    //   <CreatorButton />
    //   <div className='room_wrapper'>
    //     {/* <ItemList
    //       filterFunc={(el) =>
    //         el.participants.map((el) => el.id).includes(user_name) ||
    //         el.candidates.map((el) => el.id).includes(user_name)
    //       }
    //       statusButton={getStatusButton}
    //     /> */}
    //   </div>
    //   {/* {modelOpen && <Modal onClose={() => {}} />} */}
    // </div>
  );
}
