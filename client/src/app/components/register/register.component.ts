import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { passwordValidator, UniqueUsernameValidator } from './custom-validators';


interface Response {
  status?: boolean;
  message?: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  public registerForm1: FormGroup;
  public registerForm2: FormGroup;
  public isLinear: boolean = false;
  public requiredMsg: string = "Field is required.";
  public cities: Array<string> = ["London","Birmingham", "Leicester", "Southampton", "Leeds", "Manchester", "Liverpool"];
  public hintColor: string = '#ff0000';
  public uniqueUsernameValidator = new UniqueUsernameValidator(this.authService);
  
  get userName() { return this.registerForm1.get('userName').value};
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    this.registerForm1 = this.formBuilder.group({
      id: [null, [Validators.required, Validators.min(1000)]],
      userName: [null, [Validators.required, Validators.email], [this.uniqueUsernameValidator]],      
      password: [null, Validators.required],
      passwordConfirm: [null, Validators.required]
    }, { validator: passwordValidator })

    this.registerForm2 = this.formBuilder.group({
      city: [null, Validators.required],
      street: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required]
    }) 
  };
   
  ngOnInit(): void {
  }

  register() {
    const newUser = {
      id: this.registerForm1.get('id').value,
      userName: this.registerForm1.get('userName').value,
      password: this.registerForm1.get('password').value,
      passwordConfirm: this.registerForm1.get('passwordConfirm').value,
      city: this.registerForm2.get('city').value,
      street: this.registerForm2.get('street').value,
      firstName: this.registerForm2.get('firstName').value,
      lastName: this.registerForm2.get('lastName').value
    }

    this.authService.register(newUser).subscribe((response: Response) => {
      const { status } = response;
      if (status) {
        const { userName, password } = newUser;
        this.authService.login(userName, password).subscribe();
        this.router.navigate(['/home']);
      } 
    }, error => {
      console.log(error.message);
    })
  };


  requiredValidation1(field: string) {
    return this.registerForm1.get(field).errors?.required;
  };

  requiredValidation2(field: string) {
    return this.registerForm2.get(field).errors?.required;
  };

  
};