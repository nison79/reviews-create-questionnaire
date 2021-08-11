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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    text_translations: { el: '', en: '' },
    required: true,
    answers: [],
  };
  public answer;
  public currentLanguageText = 'el';
  public currentLanguageAnswer = 'el';

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
    if (
      !this.question.text_translations.el &&
      !this.question.text_translations.en
    ) {
      this.validationDoor.questionText = false;
    }
    if (this.question.type === 'radio' && _.isEmpty(this.question.answers)) {
      this.validationDoor.answerText = false;
    }
  }
  //FOR THE TEXT INPUT
  setCurrentLanguageSelection(langCode) {
    this.currentLanguageText = langCode;
  }

  //FOR THE ANSWERS INPUT
  setCurrentLanguageAnswerSelection(langCode) {
    this.currentLanguageAnswer = langCode;
  }

  createArray() {
    console.log(this.question.type);

    if (this.question.type === 'radio' && !this.question.answers) {
      console.log('inside if');
      this.question.answers = [];
    }
    if (
      (this.question.type === 'text' || this.question.type === 'stars') &&
      this.question.answers
    ) {
      console.log('questionData', this.question);
      this.question = _.omit(this.question, ['answers']);
    }
    console.log('questionData', this.question);
  }

  addQuestion() {
    // assign the uuid to question
    this.uniqueId = uuidv4();
    this.question.id = this.uniqueId;
    //validate
    this.validation();
    if (this.validationDoor.questionText && this.validationDoor.answerText) {
      this.question.text = this.question.text_translations.el;
      console.log(this.question);

      //save with dismiss the object
      this.modalCtrl.dismiss(this.question);
      console.log(this.question);
    }
  }

  addAnswers() {
    this.question.answers.push({ id: uuidv4(), text: this.answer , text_translations:{el: this.answer , en:''});
    this.validation();

    this.clearInput();
  }

  removeAnswer(id) {
    this.question.answers.splice(id, 1);
  }

  clearInput() {
    this.answer = null;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
