import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from './translate-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedLanguage: string;
  constructor( private translateConfigService: TranslateConfigService) {}

  ngOnInit(){
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
}
