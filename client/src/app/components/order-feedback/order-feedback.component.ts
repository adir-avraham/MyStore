
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders/orders.service';
import saveAs from 'file-saver';
import { OrderResult } from './order.interface';


@Component({
  selector: 'app-order-feedback',
  templateUrl: './order-feedback.component.html',
  styleUrls: ['./order-feedback.component.css']
})

export class OrderFeedbackComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: OrderResult, 
  private orderService: OrdersService, 
  public dialogRef: MatDialogRef<OrderFeedbackComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  downloadReceipt(savedOrderIds: any) {
    this.orderService.downloadReceipt(savedOrderIds).subscribe((receipt: any) => {
      const blob = new Blob ([receipt],{type:"text/plain;charset=utf-8"});
      saveAs(blob, "MyStore Receipt");
    }, error => {
      console.log(error.message);
    })
  };

  
};