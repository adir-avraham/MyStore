import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchTextChanges = new Subject<string>();

  constructor() { }

  setSearchTextChanges(newValue: string) {
    this.searchTextChanges.next(newValue);
  };

}