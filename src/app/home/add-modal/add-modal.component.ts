import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  public question = { id: '', text: '', numOfStars: '', type: '', required: true };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  addQuestion() {
    console.log();
  }

  onSubmit(f: NgForm) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
