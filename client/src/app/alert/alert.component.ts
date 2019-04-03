import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../services/alert/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
   message : any;
   private subscription : Subscription;

  constructor(
    private alertService : AlertService
  ) { 
  
    this.subscription=    this.alertService.getMessage().subscribe(msg => {console.log(msg);this.message = msg});
  }

  ngOnInit() {
   

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
