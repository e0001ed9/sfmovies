import { combineReducers } from 'redux';
import { filterReductions, filterInitialState } from './filter_reductions';
import { movieReductions, movieInitialState } from './movie_reductions';

function createReducer(reductions, initialState = {}) {
  return function(state = initialState, action) {
    let reduction = reductions[action.type];

    if (reduction === undefined) {
      return state;
    }

    return reduction(state, action);
  };
}

export default combineReducers({
  filters: createReducer(filterReductions, filterInitialState),
  moviesState: createReducer(movieReductions, movieInitialState)
});
