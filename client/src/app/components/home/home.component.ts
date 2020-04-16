import { Component, OnInit } from '@angular/core';
import { fade } from './home.animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fade]
})

export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

};