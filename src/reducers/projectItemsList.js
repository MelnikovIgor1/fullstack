// import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';

const initialState = {
  itemsList: [],
  items: {},
  flag_error: false,
};

export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ITEMS = 'ADD_ITEMS';
export const SET_ITEMS = 'SET_ITEMS';

export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SET_ERROR = 'SET_ERROR';
export const DO_NOTHING = 'DO_NOTHING';
export const SET_APPLICATION = 'SET_APPLICATION';
export const DELETE_APPLICATION = 'DELETE_APPLICATION';

export function projectItemsList(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const item = action.item;
      const id =
        state.itemsList.length > 0 ? Math.max(...state.itemsList) + 1 : 1;

      item.id = id;

      if (!state.itemsList.includes(item.id)) {
        state.itemsList.push(item.id);
      }

      return {
        ...state,
        itemsList: state.itemsList,
        items: {
          ...state.items,
          [item.id]: item,
        },
        flag_error: state.flag_error,
      };
    }
    case ADD_ITEMS: {
      return {
        ...state,
        itemsList: [...state.itemsList, ...action.itemList],
        items: [...state.items, ...action.itemList],
        flag_error: state.flag_error || action.flag_error,
      };
    }
    case DO_NOTHING: {
      return state;
    }
    case SET_ITEMS: {
      return {
        ...state,
        itemsList: action.itemsList,
        items: action.items,
        flag_error: action.flag_error,
      };
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        itemsList: state.itemList.filter((el) => el !== action.itemId),
        items: state.items.filter((el) => el.id !== action.itemId),
        flag_error: state.flag_error,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        itemsList: state.itemList,
        flag_error: true,
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
              ...state.posts[post.id].comment_set,
              action.payload,
            ],
          },
        },
      };
    }
    case DELETE_APPLICATION: {
      if (!action.payload) {
        return state;
      }
      // const post = state.posts[action.post_id];
      const post_id = action.post_id;
      const application_id = action.application_id;

      return {
        ...state,
        posts: {
          ...state.posts,
          [post_id]: {
            ...state.posts[post_id],
            application_set: [
              ...state.posts[post_id].comment_set.filter(
                (el) => el.id !== application_id
              ),
              action.payload,
            ],
          },
        },
      };
    }

    default: {
      return state;
    }
  }
}
