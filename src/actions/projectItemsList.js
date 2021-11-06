// import { schema, normalize } from 'normalizr';
import {
  ADD_ITEM,
  REMOVE_ITEM,
  SET_ERROR,
  ADD_ITEMS,
  SET_ITEMS,
  UNAPPLY,
  DO_NOTHING,
} from '../reducers/projectItemsList';

// const userSchema = new schema.Entity('user');
// const commentsSchema = new schema.Entity('comments', { user: userSchema });
// const postSchema = new schema.Entity('post', {
//   user: userSchema,
//   comments: [commentsSchema],
// });

export function addProjectItem(item) {
  console.log('addProjectItem');
  return {
    type: ADD_ITEM,
    item,
  };
}
export function setItems(items) {
  const posts = Object.assign({}, ...items.map((x) => ({ [x.id]: x })));
  console.log('items', posts, items);
  return {
    type: SET_ITEMS,
    itemsList: items.map((el) => el.id),
    items: posts,
    flag_error: false,
  };
}
export function removeItem(itemId) {
  console.log('removeItem');
  return {
    type: REMOVE_ITEM,
    itemId,
  };
}

export function setError() {
  console.log('setError');

  return {
    type: SET_ERROR,
  };
}

export function addItems() {
  console.log('addItems');

  return {
    type: ADD_ITEMS,
  };
}

export function unapply(item) {
  return {
    type: UNAPPLY,
    item,
  };
}

export function doNothing() {
  return {
    type: DO_NOTHING,
  };
}

export function fetchItems() {
  console.log('fetching');
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/posts');
      const data = await response.json();
      dispatch(setItems(data));
    } catch {
      console.log('Error happened');
      // dispatch(setError());
    }
  };
}
