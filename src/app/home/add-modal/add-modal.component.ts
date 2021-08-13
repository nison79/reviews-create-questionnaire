/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
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
  public answer = { el: '', en: '' };
  public currentLanguageText = 'el';
  public currentLanguageAnswer = 'el';

  public uniqueId;
  public validationDoor = {
    questionText: true,
    answerText: true,
  };
  public isEdited: boolean;
  public currentEditedAnswer;

  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  validation() {
    this.validationDoor.questionText = true;
    this.validationDoor.answerText = true;

    if (_.isEmpty(this.question.text_translations.el)) {
      this.validationDoor.questionText = false;
    }

    if (this.question.type === 'radio' && _.isEmpty(this.question.answers)) {
      this.validationDoor.answerText = false;
    }
  }

  //FOR THE TEXT INPUT SETS THE LANGUAGE CODE
  setCurrentLanguageSelection(langCode) {
    this.currentLanguageText = langCode;
  }

  //FOR THE ANSWERS INPUT SETS THE LANGUAGE CODE
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
    if (
      this.validationDoor.questionText &&
      this.validationDoor.answerText &&
      this.question.text_translations.el
    ) {
      this.question.text = this.question.text_translations.el;
      console.log(this.question);

      //save with dismiss the object
      this.modalCtrl.dismiss(this.question);
    }
  }

  addAnswers() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    // let temp_text_translations;
    // if (this.currentLanguageAnswer === 'el') {
    //   temp_text_translations = { el: this.answer, en: '' };
    // }
    // if (this.currentLanguageAnswer === 'en') {
    //   temp_text_translations = { el: '', en: this.answer };
    // }
    this.question.answers.push({
      id: uuidv4(),
      text: _.cloneDeep(this.answer.el),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      text_translations: _.cloneDeep(this.answer),
    });
    this.validation();

    this.clearInput();
    console.log('from add answers', this.question);
  }

  editSavedAnswer(ID) {
    // eslint-disable-next-line arrow-body-style
    const editedAnswer = _.find(this.question.answers, { id: ID });
    console.log(editedAnswer);

    if (editedAnswer && editedAnswer.text_translations) {
      this.answer = _.cloneDeep(editedAnswer.text_translations);
      this.currentEditedAnswer = editedAnswer;
    }

    this.isEdited = true;
  }

  saveNewEditedAnswer() {
    const newIndex = _.findIndex(this.question.answers, {
      id: this.currentEditedAnswer.id,
    });
    this.question.answers[newIndex].text_translations = _.cloneDeep(
      this.answer
    );
    this.question.answers[newIndex].text = _.cloneDeep(this.answer.el);
    this.currentEditedAnswer = null;
    this.isEdited = false;
    console.log(newIndex);
    console.log(this.question.answers);
  }

  removeAnswer(id) {
    this.question.answers.splice(id, 1);
    this.isEdited = false;
  }

  clearInput() {
    this.answer = { el: '', en: '' };
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
