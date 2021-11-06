import React from 'react';
import './modal.css';

import { useSelector, useDispatch } from 'react-redux';
import { deactivateModal } from '../../actions/modal';

import { CreatorForm } from '../ProjectCreator';

import { CandidatesList, ParticipantsList } from '../CandidatesList';

export function Modal() {
  const modalData = useSelector((state) => state.modal.modalData);
  const dispatch = useDispatch();

  const flag = modalData != null;
  const item = modalData;

  console.log('Modal', modalData, flag, item);

  return (
    <div
      className='modal_wrapper'
      onClick={(ev) => {
        console.log('event', ev);
        dispatch(deactivateModal());
      }}
    >
      {flag && (
        <div
          className='modal scroll'
          onClick={(event) => event.stopPropagation()}
        >
          <p>Participants list:</p>
          <ParticipantsList item={item} dispatch={dispatch} />
        </div>
      )}
      <div className='modal' onClick={(event) => event.stopPropagation()}>
        <CreatorForm flag={flag} item={item} />
        {/* {modalData} */}
      </div>
      {flag && (
        <div
          className='modal scroll'
          onClick={(event) => event.stopPropagation()}
        >
          <p>Candidates list:</p>
          <CandidatesList item={item} dispatch={dispatch} />
        </div>
      )}
    </div>
  );
}
