import { Component, OnInit } from '@angular/core';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faPhoneAlt = faPhoneAlt;
  faEnvelope = faEnvelope;
  constructor() { }

  ngOnInit(): void {
  }

}
