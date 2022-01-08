import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPosts, fetchMyPostsMore } from '../actions/posts';
import { ProjectItem } from './ProjectItem';
import { POST_KEY } from '../constants/keys';
import { Header } from './Header';
import { CreatorButton } from './ProjectCreator';
import { Modal } from './Modal';

export default function MainPage(props) {
  const { isLogin, user, setIsLogin } = props;

  const dispatch = useDispatch();
  const postList = useSelector(
    (state) => state.posts.postList[POST_KEY.my] || []
  );
  const isError = useSelector((state) => state.posts.isError);
  const count = useSelector((state) => state.posts.count);

  React.useEffect(() => {
    dispatch(fetchMyPosts());
  }, []);

  if (isError) {
    return (
      <div className='wrapper'>
        <h1>Произошла ошибка!</h1>
      </div>
    );
  }
  const modelOpen = useSelector((state) => state.modal.modalActive);

  return (
    <div className='room_wrapper'>
      <Header user={user} setIsLogin={setIsLogin} name='Personal room' />
      <div className='splitter'></div>
      <CreatorButton />
      <div className='splitter'></div>
      <div className='room_wrapper'>
        {postList.map((postId) => (
          <ProjectItem key={postId} user={user} id={postId} isLogin={isLogin} />
        ))}
      </div>
      <div>
        {postList.length < count && postList.length != 0 && (
          <button
            className='post-list_button'
            onClick={() => dispatch(fetchMyPostsMore())}
          >
            Show more
          </button>
        )}
      </div>
      <div>{modelOpen && <Modal user={user} onClose={() => {}} />}</div>

      {/* <div>{modelOpen && <Modal user={user} onClose={() => {}} />}</div> */}
    </div>
  );
}
