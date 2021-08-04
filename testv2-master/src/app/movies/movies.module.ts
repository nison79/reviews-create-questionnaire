import { NowPlayingComponent } from './now-playing/now-playing.component';
import { LatestMoviesComponent } from './latest-movies/latest-movies.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviesPageRoutingModule } from './movies-routing.module';

import { MoviesPage } from './movies.page';
import { TopRatedComponent } from './top-rated/top-rated.component';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MoviesPageRoutingModule],
  declarations: [MoviesPage, LatestMoviesComponent,TopRatedComponent,NowPlayingComponent],
  entryComponents: [LatestMoviesComponent],
})
export class MoviesPageModule {}
