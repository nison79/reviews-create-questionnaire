import { AddModalComponent } from './add-modal/add-modal.component';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public reviewsQuestionsArray = [];
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
  }

  deleteQuestion() {
    this.presentAlert();
    // this.reviewsQuestionsArray.pop();
  }

  //ALERT FUNCTION
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Προσοχή',
      // subHeader: 'Subtitle',
      message: 'Είστε σίγουρος/η οτι θέλετε να διαγράψετε την ερώτηση;',
      buttons: [
        {
          text: 'Ναι',
          role: 'confirm',
          cssClass: 'secondary',
          handler: () => {
            this.reviewsQuestionsArray.pop();
            console.log('Confirm Ναι');
          },
        },
        {
          text: 'Ακύρωση',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm cancel');
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    console.log('onDidDismiss resolved with role', role);
  }

  async openEditModal(q) {


    const modal = await this.modalCtrl.create({

      component: EditModalComponent,
      animated: true,
      componentProps: {
        questionData: this.reviewsQuestionsArray,
        itemId: q.id
      },
    });
    await modal.present();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddModalComponent,
      animated: true,
      componentProps: {},
    });
    modal.onDidDismiss().then((data: any) => {
      this.reviewsQuestionsArray.push(data.data);
      console.log(this.reviewsQuestionsArray);
    });
    await modal.present();
  }
}
