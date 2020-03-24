import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from '../cart/cart.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

interface Result {
  cart: Array<CartItem>;
  status: boolean;
}



@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  displayedColumns: string[] = ['image', 'item', 'quantity', 'price'];
  dataSource = new MatTableDataSource<CartItem>();

  cartItemsSub: Subscription;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((result: Result) => {
      const { cart } = result;
      this.dataSource.data = cart;
    }, error =>{
      console.log(error.message);
    });
  
  }


  getTotalCost() {
    return this.dataSource.data.map(item => item.price).reduce((acc, value) => acc + value, 0);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();   
  }


  

}
