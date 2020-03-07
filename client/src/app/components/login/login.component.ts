import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';


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
  public loginStatus: boolean = true;
  

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {

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
    this.authService.login(userName, password).subscribe((loginRes: loginRes) => {
      const {message, status} = loginRes;
      if (message && !status) {
        this.errorMessage = message;
        this.loginStatus = status;
      } else {
        this.loginStatus = true;
      }
    }, error =>{
      console.log(error)
    })

  }


}
