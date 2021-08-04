import { NowPlayingRouting } from './now-playing-routing';
import { IonicModule } from '@ionic/angular';
import { NowPlayingDetailsComponent } from './now-playing-details/now-playing-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [NowPlayingDetailsComponent],
  imports: [
    CommonModule,IonicModule,NowPlayingRouting
  ]
})
export class NowPlayingModule { }
