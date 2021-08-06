import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { v4 as uuidv4 } from 'uuid';

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
    type: '',
    required: true,
    answers: [],
  };
  public answer;

  public uniqueId;

  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  addQuestion() {
    // assign the uuid to question.id
    this.uniqueId = uuidv4();
    this.question.id = this.uniqueId;
    console.log(this.uniqueId);

    // send the object this.question to the parent aka Home
    this.modalCtrl.dismiss(this.question);
    console.log(this.question);
  }

  addAnswers() {
    this.question.answers.push({ id: uuidv4(), text: this.answer });
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
