import React from 'react'; // , { useState }
import './updater.css';

import { useDispatch } from 'react-redux';

import { ModificationForm } from '../ProjectCreator';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { APPLICATION_KEY } from '../../constants/keys';

import { updateApplication } from '../../actions/posts';

// import { UserList } from '../CandidatesList';

export function Updater(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = props;

  if (!user) {
    history.push('/');
    return <></>;
  }

  const params = useParams();

  const { postId } = params;

  const item = useSelector((state) => state.posts.posts[postId]);

  const applications = useSelector(
    (state) => state.posts.posts[postId].application_set
  );
  const candidates = applications.filter(
    (el) => el.status == APPLICATION_KEY.applied
  );

  const participants = applications.filter(
    (el) => el.status == APPLICATION_KEY.participant
  );

  // const candidates = children.filter((el) => el.status == 'Applied');
  console.log('PART', candidates, participants, item);
  // const dispatch = useDispatch();

  // const lists = [];

  return (
    <div
      className='modal_wrapper'
      onClick={() => {
        history.push('/');
      }}
    >
      <div
        className='blockor'
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <label className='list_label'>Participants</label>
        {participants.map((el) => {
          // console.log('elll', el);
          return (
            <div
              key={el.id}
              className='appl_object'
              onClick={() => {
                dispatch(
                  updateApplication(el, APPLICATION_KEY.applied, postId)
                );
              }}
            >
              <p className='text_obj'>{el.user.username}</p>
              {/* <p className='text_obj'>{el.user.email}</p> */}
            </div>
          );
        })}
      </div>
      <div
        className='modal updater_modal'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='blockor'>
          <ModificationForm user={user} item={item} className='blockor' />
        </div>
      </div>
      <div
        className='blockor'
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <label className='list_label'>Candidates</label>

        {candidates.map((el) => {
          return (
            <div
              key={el.id}
              className='appl_object'
              onClick={() => {
                dispatch(
                  updateApplication(el, APPLICATION_KEY.participant, postId)
                );
              }}
            >
              <p className='text_obj'>{el.user.username}</p>
              {/* <p className='text_obj'>{el.user.email}</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
