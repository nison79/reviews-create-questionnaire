/* eslint-disable @typescript-eslint/naming-convention */
import { AddModalComponent } from './add-modal/add-modal.component';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public insertObject: { text_translations: { el: string; en: string } };
  // public newReviewsQuestionsArray: [];
  public reviewsQuestionsArray = [
    {
      id: 'q_847130_0',
      text: 'ΧΡΟΝΟΣ ΕΤΟΙΜΑΣΙΑΣ/ΠΑΡΑΔΟΣΗΣ',
      text_translations: {
        el: 'xronos etoimasias/paradoshs',
        en: null,
      },
      stars: 0,
      type: 'stars',
      required: true,
    },
    {
      id: 'q_847130_1',
      text: 'ΧΡΟΝΟΣ ΕΤΟΙΜΑΣΙΑΣ/ΠΑΡΑΔΟΣΗΣ',

      stars: 0,
      type: 'stars',
      required: true,
    },
    {
      id: 'q_847130_2',
      text: 'ΧΡΟΝΟΣ ΕΤΟΙΜΑΣΙΑΣ/ΠΑΡΑΔΟΣΗΣ',

      stars: 0,
      type: 'stars',
      required: true,
    },
    {
      id: 'q_847130_3',
      text: 'ΧΡΟΝΟΣ ΕΤΟΙΜΑΣΙΑΣ/ΠΑΡΑΔΟΣΗΣ',

      stars: 0,
      type: 'radio',
      required: true,
      answers:[{text:'hello'}]
    },
  ];
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.translate.use('en');
    this.initialFunction();

    console.log(this.reviewsQuestionsArray);
  }

  deleteQuestion(i) {
    this.presentAlert(i);

    console.log('buttonworks');
  }

  // INITIAL FUNCTION FOR THE TRANS FLAG RENDERS ONINIT
  initialFunction() {
    if (!_.isEmpty(this.reviewsQuestionsArray)) {
      _.each(this.reviewsQuestionsArray, (question) => {
        question.text_translations = { el: question.text, en: null };
        if (question.type === 'radio' && question.answers) {
          _.each(question.answers, (answer) => {
            answer.text_translations = { el: answer.text, en: null };
          });
        }
      });
    }
  }

  //ALERT FUNCTION
  async presentAlert(i) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: this.translate.instant('reviews-create-questionnaire.alert'),
      // subHeader: 'Subtitle',
      message: this.translate.instant(
        'reviews-create-questionnaire.delete-question'
      ),
      buttons: [
        {
          text: this.translate.instant('reviews-create-questionnaire.cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm cancel');
          },
        },
        {
          text: this.translate.instant('reviews-create-questionnaire.yes'),
          role: 'confirm',
          cssClass: 'secondary',
          handler: () => {
            const indexItem = _.findIndex(this.reviewsQuestionsArray, {
              id: i,
            });
            this.reviewsQuestionsArray.splice(indexItem, 1);
            console.log('Confirm Ναι');
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
        questionData: q,
        itemId: q.id,
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
      if (data && data.data) {
        this.reviewsQuestionsArray.push(data.data);
        console.log('REVIEWSQUESTIONSARRAY', this.reviewsQuestionsArray);
      }
    });
    await modal.present();
  }
}
