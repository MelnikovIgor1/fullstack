import React from 'react'; // , { useState }
import './ProjectItem.css';

import { useSelector } from 'react-redux';

import { deleteApplication, createApplication } from '../../actions/posts';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export function ProjectItem(props) {
  const { id, user } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.posts.posts[id]);
  const id_p = post.user.id || post.user;
  const post_user = useSelector((state) => state.user[id_p]);
  // console.log(
  //   'post_user',
  //   useSelector((state) => state.user[post.user])
  // );

  const main_text = ''.concat('Organizer: ', post_user.username, '\n');
  const requirements_text = ''.concat('Requirements: ', post.requirements);

  const application_set = useSelector(
    (state) => state.posts.posts[id].application_set
  );

  const application = application_set.find((el) => {
    return el.user.id == user.id;
  });

  let title_class = 'title_block_proj';

  if (post.user == user.id) {
    title_class = title_class + ' active_part';
  }

  var statusButton =
    application !== undefined ? (
      <div
        className='status_proj_false'
        onClick={() => {
          dispatch(deleteApplication(post.id, application.id));
        }}
      >
        {'Applied'}
      </div>
    ) : (
      <div
        className='status_proj'
        onClick={() => {
          dispatch(
            createApplication({
              status: 'Applied',
              post: post.id,
            })
          );
        }}
      >
        {'Apply'}
      </div>
    );

  if (post.user == user.id) {
    statusButton = <div className='status_proj'>{'Leader'}</div>;
  }

  console.log('POST', post);
  return (
    <div className='wrapper_proj'>
      <div
        className={title_class}
        onClick={() => {
          console.log('post, user', post, user);
          if (user.id == post.user) {
            history.push(`/post/${post.id}`);
          }
        }}
      >
        <p>{post.title}</p>
      </div>
      <div className='description_proj'>
        <p className='org_text'>
          <img src={post.image} className='post_image' alt='No picture' />
          {main_text}
        </p>
        <p style={{ outerWidth: '100%' }}>{post.description}</p>
      </div>
      <div className='description_proj'>
        <p>{requirements_text}</p>
      </div>
      {statusButton}
    </div>
  );
}
