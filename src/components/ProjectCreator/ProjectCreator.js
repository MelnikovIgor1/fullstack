/* eslint-disable no-unused-vars */
import React from 'react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { activateModal, deactivateModal } from '../../actions/modal';
import { setPost } from '../../actions/posts';

// import { fetchItems } from '../../actions/projectItemsList';
import { ApiClientService } from '../../services/ApiClientService';

import './projectCreator.css';
// import { Redirect } from 'react-router-dom';

export function CreatorButton() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className='block_creator'>
      <div
        className='title_block_creator'
        onClick={() => {
          history.push('/');
        }}
      >
        My projects/All projects
      </div>
      {/* <img
        className='button_creator'
        src={'/public/plus.png'}
        onClick={() => dispatch(activateModal())}
      ></img> */}
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
  const { user } = props;
  const dispatch = useDispatch();

  const buttonTitle = 'Submit';

  const defaultTitle = '';
  const defaultDescription = '';
  const defaultRequirements = '';
  const [title, setTitle] = React.useState(defaultTitle);
  const [description, setDescription] = React.useState(defaultDescription);
  const [requirements, setRequirements] = React.useState(defaultRequirements);
  const fileRef = React.useRef();

  const [error, setError] = React.useState('');

  const handleClick = async (post) => {
    const formData = new FormData();
    for (let postKey in post) {
      formData.append(postKey, post[postKey]);
    }

    const response = await ApiClientService('posts/', {
      body: formData,
      method: 'POST',
    });

    dispatch(setPost(response));
  };

  return (
    <form>
      <div className='form_item_block'>
        <label>Title: </label>
        <input
          name='title'
          type='text'
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError('');
          }}
        />
      </div>
      <div className='form_item_block'>
        <label>Description: </label>
        <textarea
          className='text_area_form'
          name='description'
          type='text'
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            setError('');
          }}
        />
      </div>
      <div className='form_item_block'>
        <label>Requirements: </label>
        <textarea
          className='text_area_form'
          name='requirements'
          type='text'
          value={requirements}
          onChange={(event) => {
            setRequirements(event.target.value);
            setError('');
          }}
        />
      </div>
      <div className='form_item_block'>
        <label>Image: </label>
        <input type='file' ref={fileRef}></input>
      </div>
      <div className='div_button'>
        <button
          className='submit_button'
          type='submit'
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();

            if (!title) {
              setError('Enter title');

              return;
            } else if (!description) {
              setError('Enter description');

              return;
            } else if (!user) {
              setError('Enter user');

              return;
            } else if (!requirements) {
              setError('Enter requirements');

              return;
            } else {
              const post = {
                title,
                description,
                user,
                requirements,
                image: fileRef.current.files[0],
              };
              event.preventDefault();
              event.stopPropagation();

              handleClick(post);

              dispatch(deactivateModal());
            }
          }}
        >
          {buttonTitle}
        </button>
      </div>
      {error && <p className='text_error'>{error}</p>}
    </form>
  );
}

export function ModificationForm(props) {
  const { user, item } = props;
  const dispatch = useDispatch();

  const buttonTitle = 'Submit';

  const [title, setTitle] = React.useState(item.title);
  const [description, setDescription] = React.useState(item.description);
  const [requirements, setRequirements] = React.useState(item.requirements);

  const [error, setError] = React.useState('');

  const handleClick = async (post) => {
    const formData = new FormData();
    for (let postKey in post) {
      formData.append(postKey, post[postKey]);
    }

    const response = await ApiClientService(`posts/${item.id}/`, {
      body: formData,
      method: 'PUT',
    });
    console.log('post_new', response);
    dispatch(setPost(response));
  };

  return (
    <form>
      <div className='form_item_block'>
        <label>Title: </label>
        <input
          name='title'
          type='text'
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError('');
          }}
        />
      </div>
      <div className='form_item_block'>
        <label>Description: </label>
        <textarea
          className='text_area_form'
          name='description'
          type='text'
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            setError('');
          }}
        />
      </div>
      <div className='form_item_block'>
        <label>Requirements: </label>
        <textarea
          className='text_area_form'
          name='requirements'
          type='text'
          value={requirements}
          onChange={(event) => {
            setRequirements(event.target.value);
            setError('');
          }}
        />
      </div>
      <div className='div_button'>
        <button
          className='submit_button'
          type='submit'
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();

            if (!title) {
              setError('Enter title');

              return;
            } else if (!description) {
              setError('Enter description');

              return;
            } else if (!user) {
              setError('Enter user');

              return;
            } else if (!requirements) {
              setError('Enter requirements');

              return;
            } else {
              const post = {
                title,
                description,
                user,
                requirements,
              };

              handleClick(post);

              dispatch(deactivateModal());
            }
          }}
        >
          {buttonTitle}
        </button>
      </div>
      {error && <p className='text_error'>{error}</p>}
    </form>
  );
}
