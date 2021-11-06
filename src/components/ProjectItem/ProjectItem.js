import React from 'react';
import './projectItem.css';

import { useDispatch } from 'react-redux';

import { activateModal } from '../../actions/modal';

// class ItemClass {
//   constructor(description, organizer, pic_url) {
//     this.description = description;
//     this.organizer = organizer;
//     this.pic_url = pic_url;
//   }
// }

export function ProjectItem(props) {
  const StatusButton = props.statusButton;
  const main_text = ''.concat('Organizer: ', props.obj.user, '\n');
  const requirements_text = ''.concat('Requirements: ', props.obj.requirements);
  const dispatch = useDispatch();

  return (
    <div className='wrapper_proj'>
      <div
        className='title_block_proj'
        onClick={() => {
          if (localStorage.getItem('user') == props.obj.user)
            dispatch(activateModal(props.obj));
        }}
      >
        <p>{props.obj.title}</p>
      </div>
      <div className='description_proj'>
        <p>{main_text}</p>
        <p>{props.obj.description}</p>
        <p>
          <img src='./logo192.png' />
        </p>
      </div>
      <div className='description_proj'>
        <p>{requirements_text}</p>
      </div>
      {StatusButton(props.obj)}
    </div>
  );
}
