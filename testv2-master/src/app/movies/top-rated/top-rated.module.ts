import { TopRatedRouting } from './top-rated-routing';
import { TopDetailsComponent } from './top-details/top-details.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TopDetailsComponent],
  imports: [CommonModule, IonicModule,TopRatedRouting],
})
export class TopRatedModule {}
