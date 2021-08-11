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
  public currentLanguageText = 'el';

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

  removeAnswer(id) {
    // const indexItem = _.findIndex(this.questionData.answers,{id: i});
    // this.questionData.answers.splice(indexItem
    //   ,1);

   this.questionData.answers =  _.reject(this.questionData.answers, (ans) => {
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
    this.modalCtrl.dismiss(this.questionData);
  }
}
