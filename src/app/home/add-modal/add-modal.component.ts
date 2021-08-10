import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  public question = {
    id: '',
    text: '',
    type: 'text',
    required: true,
    answers: [],
  };
  public answer;

  public uniqueId;
  public validationDoor = {
    questionText: true,
    answerText: true,
  };

  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  validation() {
    this.validationDoor.questionText = true;
    this.validationDoor.answerText = true;
    if (!this.question.text) {
      this.validationDoor.questionText = false;
      return false;
    } else if (
      this.question.type === 'radio' &&
      _.isEmpty(this.question.answers)
    ) {
      this.validationDoor.answerText = false;
      return false;
    } else {
      return true;
    }
    console.log('validation');
  }

  addQuestion() {
    // assign the uuid to question.id
    this.uniqueId = uuidv4();
    this.question.id = this.uniqueId;

    const isValid = this.validation();
    if (isValid) {
      this.modalCtrl.dismiss(this.question);
      console.log(this.question);
    }
  }

  addAnswers() {
    this.validation();
    this.question.answers.push({ id: uuidv4(), text: this.answer });
    this.clearInput();
  }

  removeAnswer() {
    this.question.answers.pop();
  }

  clearInput() {
    this.answer = null;
  }

  closeModal() {
    this.modalCtrl.dismiss();
    console.log(this.question);
  }
}
