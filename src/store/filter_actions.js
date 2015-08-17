export const FILTER_TEXT = 'FILTER_TEXT';
export const SHOW_NO_POSTER = 'SHOW_NO_POSTER';
export const CHANGE_DATE_RANGE = 'CHANGE_DATE_RANGE';

// action creators

function filterText(text) {
  return {
    type: FILTER_TEXT,
    text
  };
}

function changeDateRange(minYear, maxYear) {
  return {
    type: CHANGE_DATE_RANGE,
    minYear,
    maxYear
  };
}

function changeShowNoPoster(showNoPoster) {
  return {
    type: SHOW_NO_POSTER,
    showNoPoster
  };
}

// helpers

export function updateFilterText(text) {
  return (dispatch) => dispatch(filterText(text));
}

export function updateDateRange(minYear, maxYear) {
  return (dispatch) => dispatch(changeDateRange(minYear, maxYear));
}

export function updateShowNoPoster(showNoPoster) {
  return (dispatch) => dispatch(changeShowNoPoster(showNoPoster));
}

