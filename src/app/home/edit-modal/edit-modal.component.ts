import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  @Input() questionData;
  @Input() itemId;

  public answerInEdit;

  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    console.log('questionData', this.questionData);
  }

  removeAnswer(i) {
    console.log(this.questionData.answers);
  }
  addAnswers() {
    this.questionData.answers.push({
      id: uuidv4(),
      text: this.answerInEdit,
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  clearInput() {
    this.answerInEdit = null;
  }

  saveEditedQuestion() {
    this.modalCtrl.dismiss(this.questionData);
  }
}
