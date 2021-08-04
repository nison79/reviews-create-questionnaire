import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LatestDetailsComponent } from './latest-details.component';

const routes: Routes = [
  {
    path: '',
    component: LatestDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LatestDetailsRouting {}
