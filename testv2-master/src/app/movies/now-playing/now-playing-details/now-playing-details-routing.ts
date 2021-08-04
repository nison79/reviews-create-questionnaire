import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NowPlayingDetailsComponent } from './now-playing-details.component';

const routes: Routes = [
  {
    path: '',
    component: NowPlayingDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NowPlayingDetailsRouting {}
