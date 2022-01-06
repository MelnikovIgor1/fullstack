// import { schema, normalize } from 'normalizr';
import {
  ADD_ITEM,
  REMOVE_ITEM,
  SET_ERROR,
  ADD_ITEMS,
  SET_ITEMS,
  DO_NOTHING,
  SET_APPLICATION,
  DELETE_APPLICATION,
} from '../reducers/projectItemsList';

import { ApiClientService } from '../services/ApiClientService';

function setIsError() {
  return {
    type: SET_ERROR,
  };
}

// const userSchema = new schema.Entity('user');
// const commentsSchema = new schema.Entity('comments', { user: userSchema });
// const postSchema = new schema.Entity('post', {
//   user: userSchema,
//   comments: [commentsSchema],
// });

export function addProjectItem(item) {
  return {
    type: ADD_ITEM,
    item,
  };
}
export function setItems(items) {
  const posts = Object.assign({}, ...items.map((x) => ({ [x.id]: x })));
  console.log('setItems', posts);
  return {
    type: SET_ITEMS,
    itemsList: items.map((el) => el.id),
    items: posts,
    flag_error: false,
  };
}
export function removeItem(itemId) {
  return {
    type: REMOVE_ITEM,
    itemId,
  };
}

export function setError() {
  return {
    type: SET_ERROR,
  };
}

export function addItems() {
  return {
    type: ADD_ITEMS,
  };
}

export function doNothing() {
  return {
    type: DO_NOTHING,
  };
}

export function fetchItems() {
  return async (dispatch) => {
    try {
      // const response = await fetch('http://localhost:3000/posts');
      // const response = await fetch('http://localhost:3001/api/posts');
      console.log('ApiClientService-run-3');
      const data = await ApiClientService('posts/');
      console.log('fetchItems-request', data);
      // console.log(data);
      // const users = await ApiClientService('users/');
      // console.log(data.results, users.results);
      // for (const post of data.results) {
      //   // console.log(post);
      //   // post['user'] = users.results.find((el) => el['user'] == post['user'])[
      //   //   'username'
      //   // ];
      //   // post['user'] = users.results.find((el) => {
      //   //   el.id == post['user'];
      //   // });
      // }

      // const data = await response.json();
      // console.log('POSTS data', data.results);
      // var dataArray = Object.keys(data).map(function (k) {
      //   console.log(data[k], k);
      //   return data[k];
      // });
      console.log('item-list-raw', data);
      dispatch(setItems(data));
    } catch {
      dispatch(setError());
    }
  };
}

export function createApplication(motivation, post, status) {
  return async (dispatch) => {
    try {
      const comment = await ApiClientService('applications/', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          motivation,
          post,
          status,
        }),
      });

      dispatch({
        type: SET_APPLICATION,
        payload: comment,
      });
    } catch {
      dispatch(setIsError());
    }
  };
}

export function deleteApplication(id, post_id) {
  return async (dispatch) => {
    console.log('DELETE id', id);
    try {
      const comment = await ApiClientService(`applications/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
        },
      });
      console.log('DELETE', comment);

      dispatch({
        type: DELETE_APPLICATION,
        // payload: comment,
        post_id: post_id,
        application_id: id,
      });
    } catch {
      dispatch(setIsError());
    }
  };
}
