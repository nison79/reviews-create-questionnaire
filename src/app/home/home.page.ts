import { AddModalComponent } from './add-modal/add-modal.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public reviewsQuestionsArray = [];
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openEditModal() {
    const modal = await this.modalCtrl.create({
      component: EditModalComponent,
      animated: true,
      componentProps: {},
    });
    await modal.present();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddModalComponent,
      animated: true,
      componentProps: {},
    });
    await modal.present();
  }
}
