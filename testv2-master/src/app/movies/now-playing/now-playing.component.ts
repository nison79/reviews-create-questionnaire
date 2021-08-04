import { NowPlayingDetailsComponent } from './now-playing-details/now-playing-details.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { MoviesService } from '../movies.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss'],
})
export class NowPlayingComponent implements OnInit {
  permanentImgUrl = 'https://www.themoviedb.org/t/p/w1280';
  nowPlayingMovies: any;
  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    // eslint-disable-next-line ngrx/no-typed-global-store
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.onGetNowPlaying();
    this.nowPlayingMovies = this.store.select('movies').subscribe((data) => {
      this.nowPlayingMovies = data;
      console.log(this.nowPlayingMovies);
    });
  }

  onGetNowPlaying() {
    this.moviesService.getNowPlaying().subscribe((data) => {});
  }

  async openModal(movie) {
    const modal = await this.modalCtrl.create({
      component: NowPlayingDetailsComponent,
      animated: true,
      componentProps: {
        selectedMovieId: movie,
      },
    });
    await modal.present();
  }
}
