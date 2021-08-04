

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopDetailsComponent } from './top-details.component';

const routes: Routes = [
  {
    path: '',
    component: TopDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopRatedDetailsRouting {}
