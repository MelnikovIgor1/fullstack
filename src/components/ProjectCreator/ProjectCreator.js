import React from 'react';

import { useDispatch } from 'react-redux';

import { activateModal, deactivateModal } from '../../actions/modal';

import { fetchItems } from '../../actions/projectItemsList';

import './projectCreator.css';
import { Redirect } from 'react-router-dom';

export function CreatorButton() {
  const dispatch = useDispatch();
  let [redirect, setRedirect] = React.useState(false);
  if (redirect) {
    redirect = false;
    return <Redirect to='/projects/' />;
  }
  return (
    <div className='block_creator'>
      <div className='title_block_creator' onClick={() => setRedirect(true)}>
        My projects/All projects
      </div>
      <button
        className='button_creator'
        onClick={() => dispatch(activateModal())}
      >
        +
      </button>
    </div>
  );
}

export function CreatorForm(props) {
  console.log('CreatorForm', props);
  const { flag = false, item = null } = props;
  console.log('CreatorForm', props, flag, item);
  const dispatch = useDispatch();

  const buttonTitle = 'Submit';

  const defaultTitle = '';
  const defaultDescription = '';
  const defaultRequirements = '';
  const [title, setTitle] = React.useState(flag ? item.title : defaultTitle);
  const [description, setDescription] = React.useState(
    flag ? item.description : defaultDescription
  );

  const [requirements, setRequirements] = React.useState(
    flag ? item.requirements : defaultRequirements
  );

  const handleClickReplace = (post) => {
    const data = {
      title: post.title,
    };

    console.log('postItems', data);
    fetch(`http://localhost:3000/posts/${item.id}`, {
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(post),
      method: 'PUT',
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(fetchItems());
      });
  };
  const handleClickNew = (post) => {
    const data = {
      title: post.title,
    };

    console.log('postItems', data);
    fetch('http://localhost:3000/posts', {
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(post),
      method: 'POST',
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(fetchItems());
      });
  };

  const handleClick = flag ? handleClickReplace : handleClickNew;
  console.log('putter', handleClick, flag, handleClickReplace);

  return (
    <form>
      <div>
        <label>Title</label>
        <input
          name='title'
          type='text'
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          name='description'
          type='text'
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </div>
      <div>
        <label>Requirements</label>
        <input
          name='requirements'
          type='text'
          value={requirements}
          onChange={(event) => {
            setRequirements(event.target.value);
          }}
        />
      </div>
      <button
        type='submit'
        onClick={(event) => {
          const user = localStorage.getItem('user');
          const post = {
            title,
            description,
            user,
            requirements,
            participants: flag ? item.participants : [user],
            candidates: flag ? item.candidates : [],
          };
          event.preventDefault();
          event.stopPropagation();

          handleClick(post);
          dispatch(deactivateModal());
        }}
      >
        {buttonTitle}
      </button>
    </form>
  );
}
