import {defaultStyles, defaultTitle} from '../constants';
import {clone} from '../core/utils';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON()
}

const normolize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export function normolizeInitialState(state) {
  return state ? normolize(state) : clone(defaultState)
}
