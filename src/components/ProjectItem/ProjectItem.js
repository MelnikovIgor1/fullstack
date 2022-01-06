import React from 'react';
import './projectItem.css';

import { useDispatch } from 'react-redux';

import { activateModal } from '../../actions/modal';
import {
  deleteApplication,
  createApplication,
} from '../../actions/projectItemsList';

export function ProjectItem(props) {
  const {
    // statusButton,
    user,
    obj,
  } = props;
  const main_text = ''.concat('Organizer: ', obj.user.username, '\n');
  const requirements_text = ''.concat('Requirements: ', obj.requirements);
  const dispatch = useDispatch();
  const appl = obj.application_set.find((el) => {
    console.log(el.user.id, user.id);
    return el.user.id == user.id;
  });
  const active = appl !== undefined;
  console.log('appl', appl);
  if (active) {
    console.log('appl_id', appl.id);
  }
  // obj.application_set.find((el) => {
  //   el.user.id === user.id;
  // });

  // const onClickStatus =
  const statusButton = active ? (
    <div
      onClick={() => {
        console.log('DELETE');
        dispatch(deleteApplication(appl.id));
      }}
    >
      {'Applied'}
    </div>
  ) : (
    <div
      onClick={() => {
        console.log('APPLIED');
        dispatch(
          createApplication({
            motivation: 'hello',
            post: obj,
            status: 'Applied',
          })
        );
      }}
    >
      {'Apply'}
    </div>
  );

  return (
    <div className='wrapper_proj'>
      <div
        className='title_block_proj'
        onClick={() => {
          if (localStorage.getItem('user') == obj.user.username)
            dispatch(activateModal(obj));
        }}
      >
        <p>{obj.title}</p>
      </div>
      <div className='description_proj'>
        <p>{main_text}</p>
        {/* <p>{obj.description}</p> */}
        <p style={{ outerWidth: '100%' }}>
          {obj.description}
          <img
            src='/logo512.png'
            style={{
              height: '100px',
              width: '100px',
              display: 'block',
              marginLeft: 'auto',
            }}
          />
        </p>
      </div>
      <div className='description_proj'>
        <p>{requirements_text}</p>
      </div>
      {statusButton}
      {/* {statusButton(obj)} */}
    </div>
  );
}
