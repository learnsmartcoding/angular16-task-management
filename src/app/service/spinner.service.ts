import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerCounter = 0;
  spinnerCounter$ = new BehaviorSubject<number>(0);

  constructor() { }

  show() {
    this.spinnerCounter++;
    this.spinnerCounter$.next(this.spinnerCounter);
  }

  hide() {
    if (this.spinnerCounter > 0) {
      this.spinnerCounter--;
    }
    this.spinnerCounter$.next(this.spinnerCounter);
  }
}
