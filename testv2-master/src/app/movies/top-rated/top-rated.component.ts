import { TopDetailsComponent } from './top-details/top-details.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoviesService } from '../movies.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss'],
})
export class TopRatedComponent implements OnInit {
  permanentImgUrl = 'https://www.themoviedb.org/t/p/w1280';
  loadedTopMovies: any;
  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    // eslint-disable-next-line ngrx/no-typed-global-store
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.onGetTopRated();
    this.loadedTopMovies = this.store.select('movies').subscribe((data) => {
      this.loadedTopMovies = data;
      console.log(this.loadedTopMovies);
    });
  }

  onGetTopRated() {
    this.moviesService.getTopRated().subscribe((data) => {});
  }

  async openModal(movie) {
    const modal = await this.modalCtrl.create({
      component: TopDetailsComponent,
      animated: true,
      componentProps: {
        selectedMovieId: movie,
      },
    });
    await modal.present();
  }
}
