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
    default: {
      return state;
    }
  }
}
