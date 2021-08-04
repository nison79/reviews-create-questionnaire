import { Component, OnInit, Output } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  @Output() newQuestionEvent = new EventEmitter();

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  addNewQuestion(value: any) {
    this.newQuestionEvent.emit(value);
    console.log(value);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
