import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderFeedbackComponent } from '../order-feedback/order-feedback.component';
import { Router } from '@angular/router';
import moment from 'moment/src/moment';


interface UserDetailsRes {
  street?: Street;
  city?: City;
  status: boolean;
}

interface Street {
  street: string;
}
interface City {
  city: string;
}

interface NewOrder {
  deliveryCity: string,
  deliveryStreet: string,
  deliveryDate: Date,
  creditCard: number
}

interface NewOrderRes {
  message: string;
  status: false;
  savedOrderIds: SavedOrderIds;
}

export interface SavedOrderIds {
  cartId: string;
  orderId: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;
  isLoading = false;
  deliveryCities = ["London","Birmingham", "Leicester", "Southampton"];
  minDate: Date;
  unavailableDates = [];

  constructor(private formBuilder: FormBuilder, private ordersService: OrdersService, 
    private dialog: MatDialog, private router: Router) { 
    this.orderForm = this.formBuilder.group({
      deliveryCity: null,
      deliveryStreet: null,
      deliveryDate: null,
      creditCard: null
    })
  }

  ngOnInit(): void {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.ordersService.getUnavailableDates().subscribe((unavailableDatesRes: any)=>{
      this.unavailableDates = unavailableDatesRes.unavailableDates;
      console.log(this.unavailableDates);
    })
  }

  myFilter = (d: Date | null): boolean => {
   const time = moment(d).format('YYYY-MM-DD');
   if (!this.unavailableDates) return true;
   return !this.unavailableDates.find(date => {
    return moment(date._id.deliveryDate).format("YYYY-MM-DD") === time})    
  }

  getUserCity() {
    this.ordersService.getUserCity().subscribe((userDetailsRes: UserDetailsRes) => {
      const { city } = userDetailsRes.city;
      console.log(city)
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
    }

    this.ordersService.saveNewOrder(newOrder).subscribe((newOrderRes: NewOrderRes) => {
      const { message, status, savedOrderIds } = newOrderRes;
      
     
        const dialogRef = this.dialog.open(OrderFeedbackComponent, {
          data: {
            status: status,
            message: message,
            savedOrderIds: savedOrderIds
          }
        });

        dialogRef.afterClosed().subscribe(result => {

          if (result) {
            this.router.navigate(['/home'])
          }
        })

      
    })
  }

}