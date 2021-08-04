import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { MoviesService } from '../movies.service';
import { LatestDetailsComponent } from './latest-details/latest-details.component';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-latest-movies',
  templateUrl: './latest-movies.component.html',
  styleUrls: ['./latest-movies.component.scss'],
})
export class LatestMoviesComponent implements OnInit {
  permanentImgUrl = 'https://www.themoviedb.org/t/p/w1280';
  loadedLatest;
  public buttonText = 'Back';
  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,

    // eslint-disable-next-line ngrx/no-typed-global-store
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.onGetLatest();
    this.loadedLatest = this.store.select('movies').subscribe((data) => {
      this.loadedLatest = data;
      console.log(this.loadedLatest);
    });
  }

  onGetLatest() {
    this.moviesService.getLatest().subscribe((data) => {});
  }

  async openModal(movie) {
    const modal = await this.modalCtrl.create({
      component: LatestDetailsComponent,
      animated: true,
      componentProps: {
        selectedMovieId: movie,
      },
    });

    await modal.present();
  }
}
