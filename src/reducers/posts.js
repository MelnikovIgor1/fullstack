export const SET_POST_LIST = 'SET_POST_LIST';
export const SET_POST = 'SET_POST';
export const SET_ERROR = 'SET_ERROR';
export const SET_POST_LIST_MORE = 'SET_POST_LIST_MORE';
export const SET_APPLICATION = 'SET_APPLICATION';
export const DELETE_APPLICATION = 'DELETE_APPLICATION';
export const UPDATE_APPLICATION = 'UPDATE_APPLICATION';
import { POST_KEY } from '../constants/keys';

const initialState = {
  postList: {},
  posts: {},
  isError: false,
  page: 0,
  count: 0,
};

export function posts(state = initialState, action) {
  switch (action.type) {
    case SET_POST_LIST: {
      return {
        ...state,
        count: action.payload.count,
        postList: {
          // ...state.postList, BE CAREFUL
          [action.payload.postKey]: action.payload.postList,
        },
        posts: action.payload.posts,
        isError: false,
        page: 1,
      };
    }

    case SET_POST_LIST_MORE: {
      return {
        ...state,
        postList: {
          ...state.postList,
          [action.payload.postKey]: [
            ...state.postList[action.payload.postKey],
            ...action.payload.postList,
          ],
        },
        posts: { ...state.posts, ...action.payload.posts },
        isError: false,
        page: state.page + 1,
      };
    }

    case SET_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }

    case SET_POST: {
      const post = action.payload;
      console.log('SET_POST', post);
      let postList = state.postList[POST_KEY.main] || [];
      let postListMy = state.postList[POST_KEY.my] || [];

      if (!postList.includes(post.id)) {
        postList.push(post.id);
      }

      if (!postListMy.includes(post.id)) {
        postListMy.push(post.id);
      }

      console.log('postList, postListMy', postList, postListMy);

      return {
        ...state,
        count: state.count + 1,
        postList: {
          [POST_KEY.main]: postList,
          [POST_KEY.my]: postListMy,
        },
        posts: {
          ...state.posts,
          [post.id]: post,
        },
        isError: false,
      };
    }

    case SET_APPLICATION: {
      if (!action.payload) {
        return state;
      }
      const post = state.posts[action.payload.post];

      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: {
            ...state.posts[post.id],
            application_set: [
              action.payload,
              ...state.posts[post.id].application_set,
            ],
          },
        },
      };
    }

    case DELETE_APPLICATION: {
      if (!action.payload) {
        return state;
      }
      const post = state.posts[action.payload.post];

      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: {
            ...state.posts[post.id],
            application_set: state.posts[post.id].application_set.filter(
              (el) => el.id != action.payload.application
            ),
          },
        },
      };
    }

    case UPDATE_APPLICATION: {
      const application = action.payload.application;
      const post_id = action.payload.post_id;
      return {
        ...state,
        posts: {
          ...state.posts,
          [post_id]: {
            ...state.posts[post_id],
            application_set: [
              ...state.posts[post_id].application_set.filter(
                (el) => el.id != application.id
              ),
              application,
            ],
            // application_set: state.posts[post_id].application_set.filter(
            //   (el) => el.id != action.payload.application
            // ),
          },
        },
      };
    }

    default: {
      return state;
    }
  }
}
