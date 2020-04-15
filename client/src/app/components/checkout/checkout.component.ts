import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from 'src/app/guards/order.guard';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmAlertComponent } from '../confirm-alert/confirm-alert.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit, CanComponentDeactivate {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  canDeactivate() {
    const dialogRef = this.dialog.open(ConfirmAlertComponent, {
      width: '450px',
      data: {
        message: "Are you sure?",
        title: "Confirmation"
    }})
    return dialogRef.afterClosed();
  }

}