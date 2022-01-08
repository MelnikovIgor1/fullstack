import React from 'react'; // , { useState }
import './modal.css';

import { useDispatch } from 'react-redux';
import { deactivateModal } from '../../actions/modal';

import { CreatorForm } from '../ProjectCreator';

// import { UserList } from '../CandidatesList';

export function Modal(props) {
  const { user } = props;
  const dispatch = useDispatch();

  const lists = [];

  return (
    <div
      className='modal_wrapper'
      onClick={() => {
        dispatch(deactivateModal());
      }}
    >
      <div className='modal' onClick={(event) => event.stopPropagation()}>
        <CreatorForm user={user} userLists={lists} />
      </div>
    </div>
  );
}
