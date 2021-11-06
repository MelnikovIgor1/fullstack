import { combineReducers } from 'redux';
import { modal } from './modal';
import { projectItemsList } from './projectItemsList';

export const reducers = combineReducers({ modal, projectItemsList });
