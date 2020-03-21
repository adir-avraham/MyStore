import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from 'src/app/services/order/order.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderFeedbackComponent } from '../order-feedback/order-feedback.component';
import { Router } from '@angular/router';


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

  constructor(private formBuilder: FormBuilder, private orderService: OrderService, 
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
    this.orderService.getUnavailableDates().subscribe((unavailableDatesRes: any)=>{
      this.unavailableDates = unavailableDatesRes.unavailableDates
      console.log(this.unavailableDates);
    })
  }

  myFilter = (d: Date | null): boolean => {
   const time = d.getTime();
   return !this.unavailableDates.find(date => {
    return new Date (date._id.deliveryDate).getTime() === time})    
  }

  getUserCity() {
    this.orderService.getUserCity().subscribe((userDetailsRes: UserDetailsRes) => {
      const { city } = userDetailsRes.city;
      console.log(city)
      this.orderForm.get('deliveryCity').setValue(city); 
    }, error =>{
      console.log(error.message);
    })  
  };

  getUserStreet() {
    this.orderService.getUserStreet().subscribe((userDetailsRes: UserDetailsRes) => {
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
      deliveryDate: this.orderForm.get('deliveryDate').value,
      creditCard: this.orderForm.get('creditCard').value
    }
    this.orderService.saveNewOrder(newOrder).subscribe((newOrderRes: NewOrderRes) => {
      const { message, status } = newOrderRes;
      
     
        const dialogRef = this.dialog.open(OrderFeedbackComponent, {
          data: {
            status: status,
            message: message
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(result)
          if (result) {
            this.router.navigate(['/home'])
          }
        })

      
      console.log(newOrderRes)
    })
  }

}
