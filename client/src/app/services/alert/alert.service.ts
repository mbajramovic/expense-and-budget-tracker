import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
   subject = new Subject<any>();

  constructor(
    private router : Router
  ) { 
    router.events.subscribe(event => {
      if (event instanceof NavigationStart)
        this.subject.next();
    });
  }

  success(text : String) {
  
    this.subject.next({type : 'success', text : text});
  }

  error(text : String) {
    this.subject.next({type : 'error', text : text});
  }

  getMessage() : Observable<any> {
    return this.subject.asObservable();
  }

}
