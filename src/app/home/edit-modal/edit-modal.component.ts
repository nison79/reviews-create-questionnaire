/* eslint-disable @typescript-eslint/naming-convention */
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
  public validationDoor = {
    questionText: true,
    answerText: true,
  };
  public answer = { el: '', en: '' };
  public currentLanguageText = 'el';
  public currentLanguageAnswer = 'el';
  public isEdited: boolean;
  public currentEditedAnswer;

  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    console.log('questionData', this.questionData);
  }

  validation() {
    this.validationDoor.questionText = true;
    this.validationDoor.answerText = true;

    if (!this.questionData.text) {
      this.validationDoor.questionText = false;
    }

    if (_.isEmpty(this.questionData.text_translations.el)) {
      this.validationDoor.questionText = false;
    }

    if (
      this.questionData.type === 'radio' &&
      _.isEmpty(this.questionData.answers)
    ) {
      this.validationDoor.answerText = false;
    }
  }
  setCurrentLanguageSelection(langCode) {
    this.currentLanguageText = langCode;
  }

  setCurrentLanguageAnswersSelection(langCode) {
    this.currentLanguageAnswer = langCode;
  }

  createArray() {
    console.log(this.questionData.type);

    if (this.questionData.type === 'radio' && !this.questionData.answers) {
      console.log('inside if');
      this.questionData.answers = [];
    }
    if (
      (this.questionData.type === 'text' ||
        this.questionData.type === 'stars') &&
      this.questionData.answers
    ) {
      console.log('questionData', this.questionData);
      this.questionData = _.omit(this.questionData, ['answers']);
    }
    console.log('questionData', this.questionData);
  }

  removeAnswer(id) {
    // const indexItem = _.findIndex(this.questionData.answers,{id: i});
    // this.questionData.answers.splice(indexItem
    //   ,1);

    this.questionData.answers = _.reject(this.questionData.answers, (ans) => {
      if (id === ans.id) {
        return ans;
      }
    });
  }
  addAnswers() {
    this.questionData.answers.push({
      id: uuidv4(),
      text: _.cloneDeep(this.answer.el),
      text_translations: _.cloneDeep(this.answer),
    });

    this.validation();
    this.clearInput();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  editSavedAnswer(ID) {
    // eslint-disable-next-line arrow-body-style
    const editedAnswer = _.find(this.questionData.answers, { id: ID });
    console.log(editedAnswer);

    if (editedAnswer && editedAnswer.text_translations) {
      this.answer = _.cloneDeep(editedAnswer.text_translations);
      this.currentEditedAnswer = editedAnswer;
    }

    this.isEdited = true;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  clearInput() {
    this.answer = { el: '', en: '' };
  }

  saveNewEditedAnswer() {
    const newIndex = _.findIndex(this.questionData.answers, {
      id: this.currentEditedAnswer.id,
    });
    this.questionData.answers[newIndex].text_translations = _.cloneDeep(
      this.answer
    );
    this.questionData.answers[newIndex].text = _.cloneDeep(this.answer.el);
    this.currentEditedAnswer = null;
    this.isEdited = false;
    console.log(newIndex);
    console.log(this.questionData.answers);
  }

  saveEditedQuestion() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.questionData.text = this.questionData.text_translations.el;
    this.validation();
    this.modalCtrl.dismiss(this.questionData);
    console.log('FROM THE SAVED EDITED', this.questionData);
  }
}
