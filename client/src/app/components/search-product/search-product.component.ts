import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/services/products/products.service';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})


export class SearchProductComponent implements OnInit, OnDestroy {

  public searchText: string;
  public searchFormControl: FormControl;
  public unsubscribeSearchTextChanges: Subscription;

  constructor(private productsService: ProductsService) {
    this.searchFormControl = new FormControl();
  };

  ngOnInit(): void {
    this.unsubscribeSearchTextChanges = this.searchFormControl.valueChanges.pipe(debounceTime(400))
    .subscribe((newValue: string) => {
      this.productsService.setSearchTextChanges(newValue);
      this.searchText = newValue;
    });
  };

  ngOnDestroy() {
    this.unsubscribeSearchTextChanges.unsubscribe();
  };

};