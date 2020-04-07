import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  openSidebar = new BehaviorSubject<boolean>(true);

  constructor() { }
}
