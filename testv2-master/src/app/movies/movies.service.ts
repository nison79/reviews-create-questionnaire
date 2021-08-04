import * as LoadMoviesActions from '../movies/store/movies.action';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies: any;
  constructor(private http: HttpClient, private store: Store) {}

  getLatest() {
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=47083c07483bdc8ba2c1247c0b6c441d&language=en-US'
      )
      .pipe(
        tap((response) => {
          this.store.dispatch(
            new LoadMoviesActions.LoadMovies(response.results)
          );

          this.movies = response.results;
          return [...this.movies];
        })
      );
  }

  getLatestId(movieId) {
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=47083c07483bdc8ba2c1247c0b6c441d&language=en-US'
      )
      .pipe(
        tap((response) => {
          this.store.dispatch(
            new LoadMoviesActions.LoadMovies(response.results)
          );

          this.movies = response.results;
          return {
            ...this.movies.find((m) => m.id === movieId),
          };
        })
      );
  }

  getTopRated() {
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=47083c07483bdc8ba2c1247c0b6c441d&language=en-US'
      )
      .pipe(
        tap((response) => {
          this.store.dispatch(new LoadMoviesActions.TopRated(response.results));
          this.movies = response.results;
          return [...this.movies];
        })
      );
  }

  getNowPlaying() {
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=47083c07483bdc8ba2c1247c0b6c441d&language=en-US&page=1'
      )
      .pipe(
        tap((response) => {
          this.store.dispatch(
            new LoadMoviesActions.NowPlaying(response.results)
          );
          console.log(response);
        })
      );
  }
}
