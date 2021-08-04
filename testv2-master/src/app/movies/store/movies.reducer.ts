import * as LoadMoviesActions from './movies.action';

export interface State {
  movies: any;
}

const initialState: State = {
  movies: [],
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function loadMoviesReducer(
  state = initialState,
  action: LoadMoviesActions.LoadMoviesActions
) {
  switch (action.type) {
    case LoadMoviesActions.LOAD_MOVIES:
      console.log('action payload', action.type);
      return {
        ...state,
        movies: [...action.payload],
      };
    case LoadMoviesActions.TOP_RATED:
      console.log('action payload', action.type);
      return {
        ...state,
        movies: [...action.payload],
      };
    case LoadMoviesActions.NOW_PLAYING:
      console.log('action payload', action.type);
      return {
        ...state,
        movies: [...action.payload],
      };
  }
}
