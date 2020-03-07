import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  public isFirstStepValid = false;


  constructor(private formBuilder: FormBuilder, private authService: AuthService) { 
    this.registerForm1 = this.formBuilder.group({
      id: [null, [Validators.required, Validators.min(1000)]],
      userName: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      passwordConfirm: [null, Validators.required]
    })

    this.registerForm2 = this.formBuilder.group({
      city: null,
      street: null,
      firstName: null,
      lastName: null
    }) 
    
  
  }

  validation(param: string) {
    if (!this.registerForm1.get(param).valid && this.registerForm1.get(param).touched ) {
      return true;
    } 
  }

   
  ngOnInit(): void {
  }

  registerFirstStep() {
    console.log(this.registerForm1.get('userName'))
    const newUser = {
      id: this.registerForm1.get('id').value,
      userName: this.registerForm1.get('userName').value,
      password: this.registerForm1.get('password').value,
      passwordConfirm: this.registerForm1.get('passwordConfirm').value

    }
    console.log("new user first stem=>", newUser)
    this.authService.resiterFirstStep(newUser).subscribe((response: Response)  => {
      console.log("result from first step=>", response )
      const { status } = response;
      if (status) {
        this.isFirstStepValid = true;
      } else {
        this.isFirstStepValid = false;
      }

    }, error =>{
      console.log(error)
    })
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
    console.log("new user second stem=>", newUser)
    this.authService.register(newUser).subscribe((response: Response)=>{
      console.log({response})
      const { status, message } = response;
      if (status) {
        alert(message);
        this.registerForm1.reset();
        this.registerForm2.reset();
        this.isFirstStepValid = false; 
      } 

    }, error => {
      console.log(error)
    })
  }

};