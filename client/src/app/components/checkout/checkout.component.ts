import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from 'src/app/guards/order.guard';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmAlertComponent } from '../confirm-alert/confirm-alert.component';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit, CanComponentDeactivate {

  public isOrderSaved: boolean = false;
  constructor(private dialog: MatDialog, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersService.isOrderSaved.subscribe(isOrderSaved => {
      this.isOrderSaved = isOrderSaved;
    })
  }
  
  canDeactivate() {
    if (this.isOrderSaved) return true;
    const dialogRef = this.dialog.open(ConfirmAlertComponent, {
      width: '450px',
      data: {
        message: "Are you sure you want to leave this page?",
        title: "Confirmation"
    }})
    return dialogRef.afterClosed();
  };

};