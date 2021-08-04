import { BrowserModule } from '@angular/platform-browser';
import { LatestMoviesRouting } from './latest-movies-routing';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestDetailsComponent } from './latest-details/latest-details.component';


@NgModule({
  declarations: [LatestDetailsComponent],
  imports: [CommonModule, IonicModule,LatestMoviesRouting],
})
export class LatestMoviesModule {}
