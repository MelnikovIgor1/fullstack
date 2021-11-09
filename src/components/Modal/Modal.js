import React, { useState } from 'react';
import './modal.css';

import { useSelector, useDispatch } from 'react-redux';
import { deactivateModal } from '../../actions/modal';

import { CreatorForm } from '../ProjectCreator';

import { UserList } from '../CandidatesList';

export function Modal() {
  const modalData = useSelector((state) => state.modal.modalData);
  const dispatch = useDispatch();

  const flag = modalData != null;
  const item = modalData;

  const candidates = flag
    ? useSelector((state) => state.projectItemsList.items)[item.id].candidates
    : null;
  const participants = flag
    ? useSelector((state) => state.projectItemsList.items)[item.id].participants
    : null;

  const initLists = {
    candidates: candidates,
    participants: participants,
  };

  const [lists, setLists] = flag ? useState(initLists) : [null, null];

  const onClick1 = flag
    ? (user) => {
        setLists({
          candidates: lists.candidates.filter((el) => el != user),
          participants: lists.participants.concat([user]),
        });
      }
    : null;
  const onClick2 = flag
    ? (user) => {
        setLists({
          participants: lists.participants.filter((el) => el != user),
          candidates: lists.candidates.concat([user]),
        });
      }
    : null;

  return (
    <div
      className='modal_wrapper'
      onClick={() => {
        dispatch(deactivateModal());
      }}
    >
      {flag && (
        <div
          className='modal scroll'
          onClick={(event) => event.stopPropagation()}
        >
          <p>Participants list:</p>
          <UserList userList={lists.participants} onClick={onClick2} />
          {/* <div>
            <label>Title</label>
            <input name='title' type='text' value='hi' />
          </div>
          <button type='submit'>{'buttonTitle'}</button> */}
        </div>
      )}
      <div className='modal' onClick={(event) => event.stopPropagation()}>
        <CreatorForm flag={flag} item={item} userLists={lists} />
      </div>
      {flag && (
        <div
          className='modal scroll'
          onClick={(event) => event.stopPropagation()}
        >
          <p>Candidates list:</p>
          <UserList userList={lists.candidates} onClick={onClick1} />
        </div>
      )}
    </div>
  );
}
