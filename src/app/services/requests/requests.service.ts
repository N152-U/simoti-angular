import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestsPendingService {
  @Output() getRequestsPending: EventEmitter<any> = new EventEmitter();
  constructor() {null}


  notify(countPendingRequests:number)
  {
    this.getRequestsPending.emit(countPendingRequests);
  }
}