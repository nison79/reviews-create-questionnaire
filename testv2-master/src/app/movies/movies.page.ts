import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit, AfterViewInit {
  anim: Animation;
  isPlaying = false;
  @ViewChild('square', { static: false }) square: ElementRef;
  constructor(private animationCtrl: AnimationController) {}

  ngAfterViewInit() {
    this.anim = this.animationCtrl.create('myanim');
    this.anim
      .addElement(this.square.nativeElement)
      .duration(3000)
      .easing('ease-out')
      .iterations(Infinity)
      .fromTo('transform', 'translateX(-150px)', 'translateX(500px)');
  }

  ngOnInit() {}

  toggleAnimation() {
    if (this.isPlaying) {
      this.anim.pause();
    } else {
      this.anim.play();
    }
    this.isPlaying = !this.isPlaying;
  }
}
