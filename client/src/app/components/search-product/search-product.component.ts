import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search/search.service';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})


export class SearchProductComponent implements OnInit, OnDestroy {

  public searchText: string;
  public searchFormControl: FormControl;
  public unsubscribeSearchTextChanges: Subscription;

  constructor(private searchService: SearchService) {
    this.searchFormControl = new FormControl();
  };

  ngOnInit(): void {
    this.unsubscribeSearchTextChanges = this.searchFormControl.valueChanges.pipe(debounceTime(400))
    .subscribe((newValue: string) => {
      this.searchService.setSearchTextChanges(newValue);
      this.searchText = newValue;
    });
  };

  ngOnDestroy() {
    this.unsubscribeSearchTextChanges.unsubscribe();
  };

};