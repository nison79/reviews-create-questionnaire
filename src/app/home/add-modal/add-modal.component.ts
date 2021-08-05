import { Component, OnInit } from '@angular/core';

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
    numOfStars: '',
    type: '',
    required: true,
    answers: [],
  };
  public answer;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  addQuestion() {
    this.modalCtrl.dismiss(this.question);
    console.log(this.question);

  }

  addAnswers() {
    this.question.answers.push({ id: 'dd', text: this.answer });
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
