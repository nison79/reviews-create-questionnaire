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
    if (
      this.questionData.type === 'radio' &&
      _.isEmpty(this.questionData.answers)
    ) {
      this.validationDoor.answerText = false;
    }
  }
  setCurrentLanguageSelection(langCode) {
    this.currentLanguageText = langCode;
    console.log(this.currentLanguageText);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this, (this.questionData.text_translations.el = this.questionData.text);
    this.modalCtrl.dismiss(this.questionData);
    console.log(this.questionData);
  }
}
