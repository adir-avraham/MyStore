import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  userConnected = null;
  private userSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user: User) => {
      if (user) {
        this.isAuthenticated = true;
        const { firstName } = user;
        this.userConnected = firstName;
      } else {
        this.isAuthenticated = false;
        this.userConnected = null;
      }
    })
  }

  logout() {
    this.authService.logout();
    this.userConnected = null;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
