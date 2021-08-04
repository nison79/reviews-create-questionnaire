import { Action } from '@ngrx/store';

export const LOAD_MOVIES = 'LOAD_MOVIES';
export const NOW_PLAYING = 'NOW_PLAYING';
export const TOP_RATED = 'TOP_RATED';

export class LoadMovies implements Action {
  readonly type = LOAD_MOVIES;
  constructor(public payload: any) {}
}

export class NowPlaying implements Action {
  readonly type = NOW_PLAYING;
  constructor(public payload: any) {}
}

export class TopRated implements Action {
  readonly type = TOP_RATED;
  constructor(public payload: any) {}
}

export type LoadMoviesActions = LoadMovies | NowPlaying | TopRated;
