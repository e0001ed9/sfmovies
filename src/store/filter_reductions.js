import { FILTER_TEXT, CHANGE_DATE_RANGE, SHOW_NO_POSTER } from './filter_actions';

export const filterReductions = {
  [ FILTER_TEXT ]: (state, action) => {
    return Object.assign({}, state, { text: action.text });
  },
  [ CHANGE_DATE_RANGE ]: (state, action) => {
    return Object.assign({}, state, { minYear: action.minYear, maxYear: action.maxYear});
  },
  [ SHOW_NO_POSTER ]: (state, action) => {
    return Object.assign({}, state, { showNoPoster: action.showNoPoster });
  }
};

export const filterInitialState = { text: '', minYear: 1800, maxYear: 3000, showNoPoster: true };
