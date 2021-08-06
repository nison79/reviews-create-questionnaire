import { Component, Input, OnInit } from '@angular/core';
import { IonItemDivider, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  @Input()  questionData;
  @Input() itemId;


  public answerInEdit;

  constructor(private modalCtrl: ModalController, private translate: TranslateService) { }

  ngOnInit() {
    console.log(this.questionData);

  }

  addAnswers() {
    this.questionData.answers.push({ id: uuidv4(), text: this.answerInEdit });
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
  clearInput() {
    this.answerInEdit = null;
  }

}
