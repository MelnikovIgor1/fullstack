import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchPostsMore } from '../actions/posts';
import { ProjectItem } from './ProjectItem';
import { POST_KEY } from '../constants/keys';
import { Header } from './Header';
import { useHistory } from 'react-router-dom';

import './mainPage.css';

export default function MainPage(props) {
  const { isLogin, user, setIsLogin } = props;
  const history = useHistory();

  const dispatch = useDispatch();
  const postList = useSelector(
    (state) => state.posts.postList[POST_KEY.main] || []
  );
  const isError = useSelector((state) => state.posts.isError);
  const count = useSelector((state) => state.posts.count);

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (isError) {
    return (
      <div className='wrapper'>
        <h1>Произошла ошибка!</h1>
      </div>
    );
  }

  // console.log('postList POST_KEY.main', postList, POST_KEY.main);

  return (
    <div className='room_wrapper'>
      <Header user={user} setIsLogin={setIsLogin} name='Personal room' />
      <div className='splitter'></div>
      <div className='block_creator'>
        <div
          className='title_block_creator'
          onClick={() => {
            history.push('/projects');
          }}
        >
          All projects/My projects
        </div>
      </div>
      <div className='splitter'></div>
      <div className='room_wrapper'>
        {postList.map((postId) => (
          <ProjectItem key={postId} id={postId} isLogin={isLogin} user={user} />
        ))}
      </div>
      <div>
        {postList.length < count && postList.length != 0 && (
          <button
            className='post-list_button'
            onClick={() => dispatch(fetchPostsMore())}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
