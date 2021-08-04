import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
