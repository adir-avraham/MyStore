import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderFeedbackComponent } from '../order-feedback/order-feedback.component';
import { Router } from '@angular/router';
import moment from 'moment/src/moment';
import { AlertComponent } from '../alert/alert.component';
import { UserDetailsRes, NewOrder, NewOrderRes } from './order.interfaces';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})


export class OrderComponent implements OnInit {

  public orderForm: FormGroup;
  public isLoading = false;
  public deliveryCities = ["London","Birmingham", "Leicester", "Southampton", "Leeds", "Manchester", "Liverpool"];
  public minDate: Date;
  public unavailableDates = [];
  public requiredMsg = "Field is required."
  public orderSaved: boolean = false;

  constructor(private formBuilder: FormBuilder, private ordersService: OrdersService, 
    private dialog: MatDialog, private router: Router) { 
    this.orderForm = this.formBuilder.group({
      deliveryCity: [null, Validators.required],
      deliveryStreet: [null, Validators.required],
      deliveryDate: [null, Validators.required],
      creditCard: [null, [Validators.required, Validators.min(1000000000000000), Validators.max(9999999999999999)]]
    })
  };

  ngOnInit(): void {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.ordersService.getUnavailableDates().subscribe((unavailableDatesRes: any)=>{
      this.unavailableDates = unavailableDatesRes.unavailableDates;
    })
  };

  myFilter = (d: Date | null): boolean => {
   const time = moment(d).format('YYYY-MM-DD');
   if (!this.unavailableDates) return true;
   return !this.unavailableDates.find(date => {
    return moment(date._id.deliveryDate).format("YYYY-MM-DD") === time})    
  };

  getUserCity() {
    this.ordersService.getUserCity().subscribe((userDetailsRes: UserDetailsRes) => {
      const { city } = userDetailsRes.city;
      this.orderForm.get('deliveryCity').setValue(city); 
    }, error =>{
      console.log(error.message);
    })  
  };

  getUserStreet() {
    this.ordersService.getUserStreet().subscribe((userDetailsRes: UserDetailsRes) => {
      const { street } = userDetailsRes.street;
      this.orderForm.get('deliveryStreet').setValue(street); 
    }, error =>{
      console.log(error.message);
    })  
  };

  saveNewOrder() {
    const newOrder: NewOrder = {
      deliveryCity: this.orderForm.get('deliveryCity').value,
      deliveryStreet: this.orderForm.get('deliveryStreet').value,
      deliveryDate: moment(this.orderForm.get('deliveryDate').value).format("YYYY-MM-DD"),
      creditCard: this.orderForm.get('creditCard').value
    };

    this.ordersService.saveNewOrder(newOrder).subscribe((newOrderRes: NewOrderRes) => {
      const { message, status, savedOrderIds } = newOrderRes;
      if (!status) return this.failureResponse();
      const dialogRef = this.dialog.open(OrderFeedbackComponent, {
        data: {
          status: status,
          message: message,
          savedOrderIds: savedOrderIds
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.orderSaved = true;
          this.ordersService.isOrderSaved.next(true);
          this.router.navigate(['/home'])
        }
      })
    }, error => {
      console.log(error.message);
    })
  };

  failureResponse() {
    this.dialog.open(AlertComponent, {
      width: '450px',
      data: {
      message: "Please make sure you complete the form and your cart is not empty.",
      title: "Failure"
    }})
  };
  
  requiredValidation(field: string) {
    return this.orderForm.get(field).errors?.required;
  };

};