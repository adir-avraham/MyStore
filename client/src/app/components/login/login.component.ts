import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';


interface loginRes {
  message: string;
  status: boolean;  
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public errorMessage: string = null;
  public loginStatus = true;
  public isLoading = false;
  public isAuthenticated = false;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

    this.loginForm = this.formBuilder.group({
      userName: null, 
      password: null 
    })

  
  }

  ngOnInit(): void {
  }

  login() {
    const userName = this.loginForm.get('userName').value
    const password = this.loginForm.get('password').value
    
    this.isLoading = true;
    
    this.authService.login(userName, password).subscribe((loginRes: any) => {
      const {message, status } = loginRes;
      if (status) {

        this.isLoading = false;
        this.isAuthenticated = true;
        this.loginStatus = true;
        alert("login success!!")
      }
      console.log(loginRes)
      if (message && !status) {
        this.errorMessage = message;
        this.loginStatus = status;
        this.isLoading = false;
      }
    }, error =>{
      console.log(error)
      this.errorMessage = "Somethins went wrong..";
      this.isLoading = false;
    })

  }

  goToShoppingPage() {
    this.router.navigate(['/shopping-page']);
  }


}
