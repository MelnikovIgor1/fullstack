import React from 'react';
import './projectItem.css';

import { useDispatch } from 'react-redux';

import { activateModal } from '../../actions/modal';

export function ProjectItem(props) {
  const { statusButton, obj } = props;
  const main_text = ''.concat('Organizer: ', obj.user, '\n');
  const requirements_text = ''.concat('Requirements: ', obj.requirements);
  const dispatch = useDispatch();

  return (
    <div className='wrapper_proj'>
      <div
        className='title_block_proj'
        onClick={() => {
          if (localStorage.getItem('user') == obj.user)
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
              'margin-left': 'auto',
            }}
          />
        </p>
      </div>
      <div className='description_proj'>
        <p>{requirements_text}</p>
      </div>
      {statusButton(obj)}
    </div>
  );
}
