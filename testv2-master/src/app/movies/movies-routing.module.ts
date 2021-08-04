import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesPage } from './movies.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesPage,
    pathMatch: 'full',
  },
  {
    path: 'latest',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./latest-movies/latest-movies.module').then(
            (m) => m.LatestMoviesModule
          ),
      },
      {
        path: ':movieId',
        loadChildren: () =>
          import('./latest-movies/latest-details/latest-details.module').then(
            (m) => m.LatestDetailsModule
          ),
      },
    ],
  },
  {
    path: 'top-rated',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./top-rated/top-rated.module').then((m) => m.TopRatedModule),
      },
      {
        path: ':movieId',
        loadChildren: () =>
          import('./top-rated/top-details/top-details.module').then(
            (m) => m.TopDetailsModule
          ),
      },
    ],
  },
  {
    path: 'now-playing',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./now-playing/now-playing.module').then(
            (m) => m.NowPlayingModule
          ),
      },
      {
        path: ':movieId',
        loadChildren: () =>
          import(
            './now-playing/now-playing-details/now-playing-details.module'
          ).then((m) => m.NowPlayingDetailsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule {}
