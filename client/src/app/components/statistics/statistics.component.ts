import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { OrdersService } from 'src/app/services/orders/orders.service';

interface StatisticsRes {
  numOfProducts?: number;
  numOfOrders?: number;
  status: boolean;
}


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  numOfProducts: number;
  numOfOrders: number;
  
  constructor(private productsService: ProductsService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    
    this.productsService.getNumOfProducts().subscribe((statistics: StatisticsRes) => {
      const { numOfProducts } = statistics;
      this.numOfProducts = numOfProducts;
      }, error => {
      console.log(error.message);
    });

    this.ordersService.getNumOfOrders().subscribe((statistics: StatisticsRes) => {
      const { numOfOrders } = statistics;
      this.numOfOrders = numOfOrders;
    }, error => {
      console.log(error.message);
    });


  };

};