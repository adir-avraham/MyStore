import { Directive, Input, ViewContainerRef, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import * as jwtDecode from 'jwt-decode'; 
import { AuthService } from '../services/auth/auth.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appRole]'
})

export class RoleDirective implements OnInit, OnDestroy {

  @Input() appRole: string;
  private isVisible = false;
  unsubscribeUser: Subscription;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}

  
  ngOnInit() {

    this.unsubscribeUser = this.authService.user.pipe(take(1)).subscribe((user: any) => {
      if (!user) { 
        this.viewContainerRef.clear();
      }
      const decoded: any = jwtDecode(user.token);  
      const { role } = decoded._doc;
      if (role === this.appRole && !this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    });
  };

  ngOnDestroy() {
    this.unsubscribeUser.unsubscribe();
  }

}