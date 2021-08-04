import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as _ from 'lodash';

@Component({
  selector: 'app-top-details',
  templateUrl: './top-details.component.html',
  styleUrls: ['./top-details.component.scss'],
})
export class TopDetailsComponent implements OnInit {
  @Input() selectedMovieId;
  loadedMovie: any;
  moviesFromState: any;
  permanentImgUrl = 'https://www.themoviedb.org/t/p/w1280';

  constructor(
    private modalCtrl: ModalController,

    // eslint-disable-next-line ngrx/no-typed-global-store
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    console.log(this.selectedMovieId);
    this.store.select('movies').subscribe((moviesState) => {
      if (moviesState && !_.isEqual(this.moviesFromState, moviesState)) {
        this.moviesFromState = _.cloneDeep(moviesState);
      }
      console.log(typeof this.moviesFromState);
    });
    this.loadedMovie = this.moviesFromState.movies.find(
      (element) => element.id === +this.selectedMovieId
    );
    console.log(this.loadedMovie);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
