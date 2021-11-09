// import { schema, normalize } from 'normalizr';
import {
  ADD_ITEM,
  REMOVE_ITEM,
  SET_ERROR,
  ADD_ITEMS,
  SET_ITEMS,
  DO_NOTHING,
} from '../reducers/projectItemsList';

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
      const response = await fetch('http://localhost:3000/posts');
      const data = await response.json();
      dispatch(setItems(data));
    } catch {
      dispatch(setError());
    }
  };
}
